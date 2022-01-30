import { Box, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Editor, Transforms } from 'slate';
import {
  useContext,
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { nanoid } from 'nanoid';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';

import Leaf from './Leaf';
import Toolbar from './Toolbar';
import Element from './Element';
import ToolTip from './ToolTip';
import Buttons from './Buttons.jsx';
import EditorModal from './EditorModal';
import HoverToolbar from './HoverToolbar';
import apiRequest from '../../../../services/apiRequest';
import { AuthContext } from '../../../../contexts/AuthContext';
import Spinner from '../../../Mixed/Spinner';

const BlogEditor = ({ handleActiveComp, handleIsLoading }) => {
  const { user } = useContext(AuthContext);
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  const navigate = useNavigate();
  const [title, setTitle] = useState(
    JSON.parse(localStorage.getItem('editor_preview'))?.title || null
  );
  const [coverImage, setCoverImage] = useState(
    JSON.parse(localStorage.getItem('editor_preview'))?.cover_image || null
  );
  const paperRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [reqError, setReqError] = useState(null);
  const tagState = localStorage.getItem('tags')
    ? JSON.parse(localStorage.getItem('tags'))
    : [];
  const [tags, setTags] = useState(tagState);
  const [count, setCount] = useState({ words: 0, chars: 0 });
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const initialEditorState = [
    { type: 'paragraph', children: [{ text: 'Get started on a blog post.' }] },
  ];
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem('editor')) || initialEditorState
  );
  const [loading, setLoading] = useState(false);
  const screenStyles = {
    cursor: 'pointer',
    height: '24px',
    color: '#FFF',
    width: '24px',
  };

  const handleAddTag = (value) => {
    if (!value.trim().length) return;
    setTags((prevState) => [...prevState, { id: nanoid(), value }]);
  };

  const handleRemoveTag = (oldTag) => {
    const filtered = [...tags].filter(({ id }) => id !== oldTag);
    setTags(filtered);
  };

  const handleSaveEditor = (value) => {
    setValue(value);
    saveTags();
  };

  const saveTags = () => {
    localStorage.setItem('tags', JSON.stringify(tags));
  };

  const handleReqError = ({ data, status }) => {
    setLoading(false);
    if (Array.isArray(data.detail)) {
      setReqError(data.detail[0]);
    } else {
      setReqError(data.detail);
    }
  };

  const handleTagError = (errorDetail) => {
    setLoading(false);
    if (Array.isArray(errorDetail)) {
      setReqError(errorDetail[0].msg);
    } else {
      setReqError(errorDetail.msg);
    }
  };

  const getReadTime = () => {
    const { words } = { ...count };
    const wpm = 240;
    let msg = '';

    const avgTime = Math.ceil(words / wpm);
    if (avgTime <= 1) {
      msg = `Reading time: ${avgTime} min`;
    } else {
      msg =
        avgTime > 1 && avgTime < 60
          ? `Reading time: ${avgTime} mins`
          : `Reading time: about 1 hour`;
    }
    return msg;
  };

  const handleSuccess = () => {
    setLoading(false);
    localStorage.removeItem('editor');
    localStorage.removeItem('editor_preview');
    localStorage.removeItem('tags');
    if (!loading) {
      handleActiveComp('MainView');
      navigate(`/admin/${user.userId}/dashboard`);
    }
  };

  const wrapFormData = () => {
    const readTime = getReadTime();
    const formData = new FormData();

    if (coverImage instanceof File) {
      formData.append('file', coverImage);
    }
    formData.append('post', JSON.stringify(value));
    formData.append('title', JSON.stringify(title));
    formData.append('contentType', JSON.stringify(coverImage.type));
    formData.append('filename', JSON.stringify(coverImage?.name ?? coverImage));
    formData.append('readtime', JSON.stringify(readTime));
    formData.append('authorid', JSON.stringify(user.userId));
    return formData;
  };

  const createPostWithTag = async (formData) => {
    try {
      formData.append('tags', JSON.stringify(tags));
      const postResponse = await apiRequest(
        '/api/v1/posts/admin/',
        formData,
        'POST',
        handleReqError,
        { 'content-type': 'multipart/form-data' }
      );
      if (!postResponse) {
        setEditorModalOpen(false);
      }

      if (postResponse?.status === 200) {
        handleSuccess();
      }
    } catch (e) {
      setLoading(false);
      handleTagError(e.response.data.detail);
    }
  };

  const updatePost = async (formData, postId) => {
    try {
      const updateResponse = await apiRequest(
        `/api/v1/posts/${postId}/admin/`,
        formData,
        'PUT',
        handleReqError,
        { 'content-type': 'multipart/form-data' }
      );

      const tagsResponse = await axios({
        url: `/api/v1/tags/${updateResponse.data.result.tag_id}/admin`,
        data: { tags, post_id: postId },
        method: 'PUT',
      });

      if (!tagsResponse) {
        setEditorModalOpen(false);
      }

      if (updateResponse?.status === 200 && tagsResponse?.status === 200) {
        handleSuccess();
      }
    } catch (e) {
      setLoading(false);
      handleTagError(e.response.data.detail);
    }
  };

  const handleSubmit = async (e) => {
    localStorage.removeItem('editor_cover_image');
    try {
      setReqError(null);
      if (!title) {
        handleReqError({
          data: { detail: 'Please provide a title for your blog post.' },
          status: null,
        });
        return;
      }

      if (!tags.length) {
        handleReqError({
          data: {
            detail: 'Please make sure to add at least one tag',
            status: null,
          },
        });
        return;
      }

      if (!coverImage) {
        handleReqError({
          data: { detail: 'Please provide a cover image for your blog post.' },
          status: null,
        });
        return;
      }
      setLoading(true);

      const formData = wrapFormData();
      const preview = JSON.parse(localStorage.getItem('editor_preview'));

      if (preview?.action === 'edit') {
        await updatePost(formData, preview.post_to_update);
        setLoading(false);
      } else {
        await createPostWithTag(formData);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const handleCountText = (editor, e) => {
    const curCount = { words: 0, chars: 0 };
    const { children } = editor;

    children.forEach((child) => {
      const counts = child.children.reduce(
        (acc, cur) => {
          let text =
            child.type.includes('-list') || cur.type?.includes('link')
              ? cur.children[0].text
              : cur.text;
          acc.words += text.split(' ').filter((word) => word !== '').length;
          acc.chars += text.replace(' ', '').trim().length;
          return acc;
        },
        { words: 0, chars: 0 }
      );
      curCount.words += counts.words;
      curCount.chars += counts.chars;
      setCount({
        ...count,
        ...{ words: curCount.words, chars: curCount.chars },
      });
    });
  };

  const enterFullScreen = () => {
    setFullScreen(true);
  };

  const exitFullScreen = () => {
    setFullScreen(false);
  };

  const handleSetCoverImage = (image) => {
    setCoverImage(image);
  };

  const handleLSInsert = (key, value) => {
    const editorPreview = JSON.parse(localStorage.getItem('editor_preview'));
    if (editorPreview) {
      editorPreview[key] = value;
      localStorage.setItem('editor_preview', JSON.stringify(editorPreview));
    } else {
      const obj =
        key === 'title'
          ? { title: value, cover_image: null }
          : { title: null, cover_image: value };
      localStorage.setItem('editor_preview', JSON.stringify(obj));
    }
  };

  const handleSetTitle = (updatedTitle) => {
    setTitle(updatedTitle);
    handleLSInsert('title', updatedTitle);
  };

  useEffect(() => {
    const prevEditor = localStorage.getItem('editor');
    if (!prevEditor) {
      return;
    }
    if (reqError) {
      return;
    }
    setEditorModalOpen(true);
  }, [setEditorModalOpen, reqError]);

  const handleClickContinue = () => {
    setEditorModalOpen(false);
  };

  const handleClickReset = () => {
    setEditorModalOpen(false);
    localStorage.removeItem('editor');
    localStorage.removeItem('tags');
    localStorage.removeItem('editor_preview');
    setCoverImage(null);
    setTitle(null);
    setTags([]);
    setValue(initialEditorState);
    Transforms.delete(editor, {
      at: {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      },
    });
  };

  return (
    <>
      {' '}
      {loading ? (
        <Spinner
          display="flex"
          size={100}
          values={{ top: '50%', right: '50%' }}
          position="absolute"
          isLoading={loading}
        />
      ) : (
        <Box
          mt={fullScreen || editorModalOpen ? 0 : 20}
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          position="relative"
        >
          {editorModalOpen && (
            <EditorModal
              handleClickContinue={handleClickContinue}
              handleClickReset={handleClickReset}
              editorModalOpen={editorModalOpen}
            />
          )}
          <Box
            backgroundColor="#FFF"
            transition="all 0.5s ease-in-out"
            transform={fullScreen ? 'scale(1)' : 'scale(1)'}
            mb={3}
            minHeight={fullScreen ? '100vh' : '400px'}
            width={fullScreen ? '100%' : ['90%', '90%', '90%', '750px']}
            minWidth={['90%', '90%', '90%', '750px']}
            borderLeft={fullScreen ? '1px solid #e4e6eb' : 'none'}
            borderRadius={5}
          >
            <Slate
              editor={editor}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            >
              <ToolTip
                top={'-45px'}
                right={0}
                label={fullScreen ? 'Minimize' : 'Fullscreen'}
              >
                <Box
                  width="100%"
                  borderTopLeftRadius={5}
                  borderTopRightRadius={5}
                  display="flex"
                  p={2}
                  justifyContent="flex-end"
                  alignItems="center"
                  backgroundColor="blue.secondary"
                  height="40px"
                >
                  {fullScreen ? (
                    <Icon
                      onClick={exitFullScreen}
                      style={screenStyles}
                      as={BiExitFullscreen}
                    ></Icon>
                  ) : (
                    <Icon
                      onClick={enterFullScreen}
                      style={screenStyles}
                      as={BiFullscreen}
                    ></Icon>
                  )}
                </Box>
              </ToolTip>
              <Toolbar
                tags={tags}
                title={title}
                editorValue={value}
                submitError={reqError}
                handleAddTag={handleAddTag}
                handleSubmit={handleSubmit}
                coverImage={coverImage?.name ?? coverImage}
                handleSetTitle={handleSetTitle}
                handleLSInsert={handleLSInsert}
                handleCountText={handleCountText}
                handleRemoveTag={handleRemoveTag}
                handleSaveEditor={handleSaveEditor}
                handleSetCoverImage={handleSetCoverImage}
              >
                <Buttons handleCountText={handleCountText} count={count} />
              </Toolbar>
              <Box
                height="2px"
                width="100%"
                backgroundColor="gray.outline"
                mb={3}
              ></Box>
              <Box
                position="relative"
                ref={paperRef}
                maxHeight="600px"
                overflowY="auto"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '10px',
                    backgroundColor: '#BBBABD',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#05b4da',
                    borderRadius: '24px',
                  },
                }}
                p={3}
              >
                {fullScreen && <HoverToolbar paperRef={paperRef} />}
                <Editable
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                />
              </Box>
            </Slate>
          </Box>
        </Box>
      )}
    </>
  );
};

export default BlogEditor;

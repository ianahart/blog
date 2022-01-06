
import {Box, Icon } from '@chakra-ui/react';
import { FaParagraph } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Slate, Editable, withReact} from 'slate-react';
import { createEditor, Editor, Transforms } from 'slate';
import { useContext, useMemo, useCallback, useState, useEffect } from 'react';
import { BiFullscreen, BiExitFullscreen, BiCodeAlt, BiFontColor } from 'react-icons/bi';
import { AiOutlineOrderedList, AiOutlinePicture, AiOutlineLink, AiOutlineUnorderedList, AiOutlineBold,AiOutlineUnderline,AiOutlineItalic,AiOutlineFileText} from 'react-icons/ai';

import Leaf from './Leaf';
import Toolbar from './Toolbar';
import Element from './Element';
import ToolTip from './ToolTip';
import MarkButton from './MarkButton';
import BlockButton from './BlockButton';
import EditorModal from './EditorModal';
import ImageButton from './ImageButton';
import InlineButton from './InlineButton';
import WordCountButton from './WordCountButton';
import apiRequest from '../../../../services/apiRequest';
import { AuthContext } from '../../../../contexts/AuthContext';

 const BlogEditor = ({ handleActiveComp }) => {
  const { user } = useContext(AuthContext);
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(props => <Element {...props}/>,[]);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const navigate = useNavigate();
  const [title, setTitle] = useState(JSON.parse(localStorage.getItem('editor_preview'))?.title || null);
  const [coverImage, setCoverImage] = useState(JSON.parse(localStorage.getItem('editor_preview'))?.cover_image || null);
  const [fullScreen, setFullScreen] = useState(false);
  const [submitError ,setSubmitError] = useState(null);
  const [count, setCount] = useState({ words: 0, chars: 0 });
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const initialEditorState = [{ type: 'paragraph', children: [{ text: ' ' }] }];
  const [value, setValue] = useState(JSON.parse(localStorage.getItem('editor')) || initialEditorState);

  const btnStyles = {
    active: { backgroundColor: '#048BA8', color: '#FFF' },
    default: { backgroundColor: '#EDF2F7', color: '#686D76' }
  };

  const screenStyles = {
        cursor:'pointer',
        height:'24px',
        color:'#FFF',
        width:'24px'
  }

  const handleSaveEditor = (value) => {
    setValue(value);
  }

  const handleSubmitError = ({ data, status }) => {
    setSubmitError(data.detail)
  }

  const getReadTime = () => {
    const { words } = {...count}
    const wpm = 240;
    let msg = '';

    const avgTime = Math.ceil(words / wpm);
    if (avgTime <= 1) {
      msg = `Reading time: ${avgTime} min`
    } else {
      msg = avgTime > 1 && avgTime < 60 ? `Reading time: ${avgTime} mins` : `Reading time: about 1 hour`;
    }
    return msg;
  }

  const handlePostSuccess = () => {
    localStorage.removeItem('editor');
    localStorage.removeItem('editor_preview');
    handleActiveComp('MainView');
    navigate(`/admin/${user.userId}/dashboard`);
  };

  const handleSubmit = async (e) => {
     localStorage.removeItem('editor_cover_image');
    try {
      setSubmitError(null)
      if (!title) {
        handleSubmitError({ data: { detail:'Please provide a title for your blog post.' }, status: null });
        return;
      }
      if (!coverImage) {
        handleSubmitError({ data: { detail:'Please provide a cover image for your blog post.' }, status: null });
        return;
      }

      const readTime = getReadTime();
      const formData = new FormData();

      formData.append('file', coverImage);
      formData.append('post', JSON.stringify(value));
      formData.append('title', JSON.stringify(title));
      formData.append('contentType', JSON.stringify(coverImage.type));
      formData.append('filename', JSON.stringify(coverImage.name));
      formData.append('readtime', JSON.stringify(readTime));
      formData.append('authorid', JSON.stringify(user.userId));

      const response =  await apiRequest('/api/v1/posts/',   formData , 'POST', handleSubmitError, { 'content-type': 'multipart/form-data' });
      if (response?.status === 200) {
          handlePostSuccess();
      }
    } catch(e) {
      console.log(e);
    }
  }

    const handleCountText = (editor, e) => {
    const curCount = {words: 0, chars: 0};
    const { children } = editor;

    children.forEach((child) => {
        const counts = child.children.reduce((acc, cur)=> {
        let text = child.type.includes('-list') || cur.type?.includes('link') ? cur.children[0].text : cur.text;
        acc.words += text.split(' ').filter((word) => word !== '').length;
        acc.chars += text.replace(' ', '').trim().length;
        return acc;
        }, { words: 0, chars: 0 });
      curCount.words += counts.words
      curCount.chars += counts.chars
      setCount({...count, ...{ words: curCount.words, chars: curCount.chars }});
    });
  }

  const enterFullScreen = () => {
    setFullScreen(true);
  };

  const exitFullScreen = () => {
    setFullScreen(false);
  }

  const handleSetCoverImage = (image) => {
    setCoverImage(image);
  }

  const handleLSInsert = (key, value) => {
    const editorPreview = JSON.parse(localStorage.getItem('editor_preview'));
      if (editorPreview) {
        editorPreview[key] = value
        localStorage.setItem('editor_preview', JSON.stringify(editorPreview));
      } else {
        const obj = key === 'title' ? { title: value, cover_image: null } : { title: null, cover_image: value };
        localStorage.setItem('editor_preview', JSON.stringify(obj));
      }
  }

  const handleSetTitle = (updatedTitle) => {
    setTitle(updatedTitle);
    handleLSInsert('title', updatedTitle);
  }

  useEffect(() => {
    const prevEditor = localStorage.getItem('editor');
    if (!prevEditor) {
      return;
    }
    setEditorModalOpen(true);
  }, [setEditorModalOpen]);

  const handleClickContinue = () => {
    setEditorModalOpen(false);
  };

  const handleClickReset = () => {
    setEditorModalOpen(false)
    localStorage.removeItem('editor');
    setValue(initialEditorState);
    Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
    });
  };

  return (
    <Box
      mt={fullScreen || editorModalOpen ? 0 : 20}
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      position="relative"
    >
    {editorModalOpen &&
      <EditorModal
         handleClickContinue={handleClickContinue}
         handleClickReset={handleClickReset}
         editorModalOpen={editorModalOpen}
      />
    }
      <Box
        backgroundColor="#FFF"
        transition="all 0.5s ease-in-out"
        transform={ fullScreen ? 'scale(1)': 'scale(1)'}
        mb={3}
        minHeight={fullScreen ? '100vh' : '400px'}
        width={fullScreen ? '100%' : ['90%', '90%', '90%', '750px']}
        minWidth={['90%', '90%', '90%', '750px']}
        borderLeft={ fullScreen ? '1px solid #e4e6eb': 'none'}
        borderRadius={5}
      >
         <Slate
           editor={editor}
           value={value}
           onChange={newValue => setValue(newValue)}
         >
         <ToolTip top={'-45px'} right={0} label={fullScreen ? 'Minimize' : 'Fullscreen'}>
           <Box
            width="100%"
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            display="flex"
            p={2}
            justifyContent="flex-end"
            alignItems="center"
            backgroundColor="blue.secondary"
            height="40px">
            {fullScreen ? (   <Icon
              onClick={exitFullScreen}
              style={screenStyles}
              as={BiExitFullscreen}>
           </Icon>) : (   <Icon
              onClick={enterFullScreen}
              style={screenStyles}
              as={BiFullscreen}>
           </Icon>)}
          </Box>
         </ToolTip>
          <Toolbar
            title={title}
            editorValue={value}
            submitError={submitError}
            handleSubmit={handleSubmit}
            coverImage={coverImage?.name}
            handleSetTitle={handleSetTitle}
            handleLSInsert={handleLSInsert}
            handleCountText={handleCountText}
            handleSaveEditor={handleSaveEditor}
            handleSetCoverImage={handleSetCoverImage}>
            <BlockButton btnStyles={btnStyles} format="heading-one"   label="h1" toolTip="3XL"/>
            <BlockButton btnStyles={btnStyles} format="heading-two"   label="h2" toolTip="2XL"/>
            <BlockButton btnStyles={btnStyles} format="heading-three" label="h3" toolTip="XL"/>
            <BlockButton btnStyles={btnStyles} format="heading-four"  label="h4" toolTip="LG"/>
            <BlockButton btnStyles={btnStyles} format="heading-five"  label="h5" toolTip="MD"/>
            <BlockButton btnStyles={btnStyles} format="heading-six"   label="h6" toolTip="SM"/>
            <BlockButton btnStyles={btnStyles} format="numbered-list" icon={AiOutlineOrderedList} toolTip="Numbered List" />
            <BlockButton btnStyles={btnStyles} format="bulleted-list" icon={AiOutlineUnorderedList} toolTip="Bulleted List"/>
            <BlockButton btnStyles={btnStyles} format="paragraph"     icon={FaParagraph}  toolTip="Paragraph"/>
            <MarkButton  btnStyles={btnStyles} format="bold"          icon={AiOutlineBold} toolTip="Bold Text"/>
            <MarkButton  btnStyles={btnStyles} format="italic"        icon={AiOutlineItalic} toolTip="Italic Text"/>
            <MarkButton  btnStyles={btnStyles} format="underline"     icon={AiOutlineUnderline} toolTip="Underline Text"/>
            <MarkButton  btnStyles={btnStyles} format="color"       icon={BiFontColor} toolTip="Font Color"/>
            <MarkButton  btnStyles={btnStyles} format="code"        icon={BiCodeAlt} toolTip="Code Block"/>
            <InlineButton format="link" icon={AiOutlineLink} toolTip="Link"></InlineButton>
            <ImageButton btnStyles={btnStyles} format="image" icon={AiOutlinePicture} toolTip="Image"></ImageButton>
            <WordCountButton count={count} handleCountText={handleCountText} icon={AiOutlineFileText} toolTip="Word Count" />
          </Toolbar>
          <Box
            height="2px"
            width="100%"
            backgroundColor="gray.outline"
            mb={3}
          >
          </Box>
          <Box p={3}>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
            />
          </Box>
         </Slate>
      </Box>
    </Box>
  );
}

export default BlogEditor;


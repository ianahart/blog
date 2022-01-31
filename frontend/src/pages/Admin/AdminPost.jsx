import { Box, Text, Icon } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackLink from '../../components/Mixed/BackLink.jsx';
import Contents from '../../components/Posts/Contents.jsx';
import PostSidebar from '../../components/Posts/PostSidebar.jsx';
import Meta from '../../components/Admin/Dashboard/Posts/Meta.jsx';
import Controls from '../../components/Admin/Dashboard/Posts/Controls.jsx';
import { AuthContext } from '../../contexts/AuthContext';
import Modal from '../../components/Mixed/Modal.jsx';
import InnerModal from '../../components/Mixed/InnerModal.jsx';
import { DashboardContext } from '../../contexts/DashboardContext.js';
import { v4 as uuidv4 } from 'uuid';
import { BiErrorCircle } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';

const AdminPost = () => {
  const { user } = useContext(AuthContext);
  const { handleActiveComp } = useContext(DashboardContext);
  const params = useParams();
  const navigate = useNavigate();
  const [editorValue, setEditorValue] = useState([]);
  const [post, setPost] = useState(null);
  const [action, setAction] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editMsg, setEditMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const openModal = (isOpen, action) => {
    checkForEdit(action);
    setAction(action);
    setIsOpen(isOpen);
  };

  const checkForEdit = (action) => {
    if (
      action === 'edit' &&
      ![null, undefined].includes(JSON.parse(localStorage.getItem('editor')))
    ) {
      setEditMsg('You have an existing post that will need to be cleared.');
    }
  };

  const handleEditorChange = (newValue) => setEditorValue(newValue);

  const populateEditor = () => {
    localStorage.setItem(
      'editor_preview',
      JSON.stringify({
        title: post.title,
        cover_image: post.cover_image_path,
        cover_filename: post.cover_image_filename,
        action: 'edit',
        post_to_update: post.id,
      })
    );
    const tags = [...post.tags].map((tag) => {
      return { id: uuidv4(), value: tag };
    });

    localStorage.setItem('tags', JSON.stringify(tags));
    localStorage.setItem('editor', JSON.stringify(editorValue));
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `/api/v1/posts/${postId}/admin/`,
      });

      if (response.status === 200) {
        setLoading(false);
      }

      if (!loading) {
        navigate(`/admin/${user.userId}/your-posts`);
      }
    } catch (e) {
      setLoading(false);
      setIsOpen(false);
      setError(e.response.data.detail);
    }
  };

  const closeModal = async (isOpen, action) => {
    if (editMsg) {
      setEditMsg(null);
    }
    setAction(action);
    if (!action) {
      return;
    }
    if (action.toLowerCase() === 'delete') {
      setLoading(true);
      await deletePost(post.id);
    } else if (action.toLowerCase() === 'edit') {
      populateEditor();
      handleActiveComp('BlogEditor');
      navigate(`/admin/${user.userId}/editor?edit=true`);
    } else {
      localStorage.removeItem('tags');
      localStorage.removeItem('editor');
      localStorage.removeItem('editor_preview');
      setIsOpen(isOpen);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `/api/v1/posts/${params.slug}/`,
        });
        if (response.status === 200) {
          const { content: value, ...post } = response.data.retrieved_post;
          setEditorValue(value.post);
          setPost(post);
        }
      } catch (e) {
        console.log(e.response);
        setError(e.response.data.detail);
      }
    };
    fetchPost();
  }, [params]);

  return (
    <Box minHeight="100vh" height="100%" backgroundColor="light.primary">
      {error && (
        <Box
          margin="0 1.5rem 1.5rem 1.5rem"
          textAlign="center"
          backgroundColor="#FFF"
          borderRadius={8}
          boxShadow="sm"
          padding="3rem"
        >
          <Box
            display="flex"
            alignItems="center"
            width="300px"
            borderRadius={8}
            p={3}
            backgroundColor="#f3ebeb"
            margin="0 auto"
          >
            <Icon
              as={BiErrorCircle}
              height="24px"
              width="24px"
              color="#950606"
            />
            <Text width="100%" textAlign="center" color="dark.secondary">
              {error}
            </Text>
          </Box>
        </Box>
      )}
      <Box position="relative">
        <Modal isOpen={isOpen}>
          <InnerModal
            closeModal={closeModal}
            secondaryText={editMsg}
            text={`Are you sure you want to ${action} this post?`}
            buttonOne={action}
            buttonTwo="Cancel"
          />
        </Modal>
        <Box onClick={() => handleActiveComp('AdminPreviews')}>
          <BackLink
            text="Back to Dashboard"
            icon={FiHome}
            path={`/admin/${user.userId}/your-posts`}
          />
        </Box>
        <Box
          display="flex"
          height="100%"
          margin="0 auto"
          maxWidth="1280px"
          width={['100%', '100%', '90%', '90%']}
          minHeight="100vh"
          pb={5}
        >
          {!error?.length ? (
            <>
              <PostSidebar
                bgColor="transparent"
                border="none"
                maxHeight="100%"
                size="25%"
              >
                <Controls openModal={openModal} />
              </PostSidebar>
              <Contents
                handleEditorChange={handleEditorChange}
                post={post}
                value={editorValue}
              />
              <PostSidebar
                bgColor="#FFF"
                boxShadow="md"
                border="1px solid #e5e5e7"
                maxHeight="600px"
                margin="0 0 0 1rem"
                size="35%"
              >
                <Meta />
              </PostSidebar>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPost;

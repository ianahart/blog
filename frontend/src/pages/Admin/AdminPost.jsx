import { Box, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackLink from '../../components/Mixed/BackLink.jsx';
import Contents from '../../components/Posts/Contents.jsx';
import AdminPostSidebar from '../../components/Admin/Dashboard/Posts/AdminPostSidebar.jsx';
import Meta from '../../components/Admin/Dashboard/Posts/Meta.jsx';
import Controls from '../../components/Admin/Dashboard/Posts/Controls.jsx';
import { AuthContext } from '../../contexts/AuthContext';
import Modal from '../../components/Mixed/Modal.jsx';
import InnerModal from '../../components/Mixed/InnerModal.jsx';
import { DashboardContext } from '../../contexts/DashboardContext.js';
import { v4 as uuidv4 } from 'uuid';
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

  const deletePost = () => {
    console.log('deleting this post');
  };

  const closeModal = (isOpen, action) => {
    if (editMsg) {
      setEditMsg(null);
    }
    setAction(action);
    if (!action) {
      return;
    }
    if (action.toLowerCase() === 'delete') {
      deletePost();
    } else if (action.toLowerCase() === 'edit') {
      populateEditor();
      handleActiveComp('BlogEditor');
      navigate(`/admin/${user.userId}/editor?edit=true`);
    } else {
      localStorage.removeItem('tags');
      localStorage.removeItem('editor');
      localStorage.removeItem('editor_preview');
    }
    setIsOpen(isOpen);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `/api/v1/posts/${params.postId}/`,
        });
        if (response.status === 200) {
          const { content: value, ...post } = response.data.retrieved_post;
          setEditorValue(value.post);
          setPost(post);
        }
      } catch (e) {
        setError(e.response.data.error);
      }
    };
    fetchPost();
  }, [params]);

  return (
    <Box minHeight="100vh" height="100%" backgroundColor="light.primary">
      {error && <Text>{error}</Text>}
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
          <BackLink path={`/admin/${user.userId}/your-posts`} />
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
          <AdminPostSidebar
            bgColor="transparent"
            border="none"
            maxHeight="100%"
            size="25%"
          >
            <Controls openModal={openModal} />
          </AdminPostSidebar>
          <Contents
            handleEditorChange={handleEditorChange}
            post={post}
            value={editorValue}
          />
          <AdminPostSidebar
            bgColor="#FFF"
            boxShadow="md"
            border="1px solid #e5e5e7"
            maxHeight="600px"
            margin="0 0 0 1rem"
            size="35%"
          >
            <Meta />
          </AdminPostSidebar>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPost;

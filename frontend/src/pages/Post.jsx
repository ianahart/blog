import { Box, Button, Icon, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import axios from 'axios';
import BackLink from '../components/Mixed/BackLink.jsx';
import Contents from '../components/Posts/Contents.jsx';
import PostSidebar from '../components/Posts/PostSidebar.jsx';
import PrimaryReaderActions from '../components/Posts/PrimaryReaderActions.jsx';
import SecondaryReaderActions from '../components/Posts/SecondaryReaderActions.jsx';

const Post = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [likeError, setLikeError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editorValue, setEditorValue] = useState([]);
  const handleEditorChange = (newValue) => setEditorValue(newValue);

  const handleUpdate = (user_has_liked, action) => {
    setPost((prevState) => {
      const like_count =
        action === 'increment'
          ? prevState.like_count + 1
          : prevState.like_count - 1;
      return {
        ...prevState,
        like_count,
        user_has_liked,
      };
    });
  };

  const updateLikeCount = (action) => {
    if (action === 'like') {
      handleUpdate(true, 'increment');
      return;
    }
    handleUpdate(false, 'decrement');
  };

  const likePost = async (action) => {
    try {
      setLoading(true);
      const response = await axios({
        method: 'POST',
        url: '/api/v1/likes/',
        data: { post_id: post.id },
      });

      if (response.status === 201) {
        const { like_id } = response.data.data;
        setPost((prevState) => {
          return {
            ...prevState,
            like_id,
          };
        });
        updateLikeCount(action);
      }
    } catch (e) {
      setLikeError(e.response.data.detail);
    }
  };

  const unLikePost = async (action) => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `/api/v1/likes/${post.like_id}/`,
      });
      if (response.status === 200) {
        updateLikeCount(action);
      }
    } catch (e) {
      setLikeError(e.response.data.detail);
    }
  };

  const reactToPost = async (action) => {
    try {
      setLoading(true);
      if (action === 'like') {
        await likePost(action);
      } else if (action === 'unlike') {
        await unLikePost(action);
      }
    } catch (e) {
      setLoading(false);
      setLikeError(e.response.data.detail);
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
        <BackLink
          icon={AiOutlineArrowLeft}
          text="Back to Posts"
          path="/posts"
        />
        {likeError?.length ? (
          <Box
            margin="1.5rem auto"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text color="dark.secondary">{likeError}</Text>
            <Button
              mt={1.5}
              backgroundColor="green.primary"
              boxShadow="sm"
              onClick={() => setLikeError(null)}
            >
              Okay
            </Button>
          </Box>
        ) : (
          <></>
        )}
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
              {post && (
                <PrimaryReaderActions
                  userHasLiked={post.user_has_liked}
                  likeCount={post.like_count}
                  loading={loading}
                  reactToPost={reactToPost}
                />
              )}
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
              {post && (
                <SecondaryReaderActions firstName={post.author.first_name} />
              )}
            </PostSidebar>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Post;

import Contents from '../components/Posts/Contents.jsx';
import PostSidebar from '../components/Posts/PostSidebar.jsx';
import { Box, Text } from '@chakra-ui/react';

const Post = () => {
  return (
    <Box>
      <Text>Regular User Post</Text>
      <PostSidebar />
      <Contents />
    </Box>
  );
};

export default Post;

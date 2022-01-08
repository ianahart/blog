import {Box, Button, Heading, Text } from '@chakra-ui/react';
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../../../services/apiRequest';
import BackLink from '../BackLink';
import { AuthContext } from '../../../../contexts/AuthContext';

const YourPosts = () => {
  // This component will fetch post title, images, and readtimes
  // when clicking on a post it will send the user to /admin/:userId/post/:postId
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  //admin/posts

  const handleClick = async (e) => {
      try {
      const response = await apiRequest('/api/v1/posts/', {}, 'GET');
      console.log(response);
      } catch(e) {
        console.log(e)
      }
   }

   const goToSinglePost = () => {
     navigate(`/admin/${user.userId}/post/1`);
   }

  return (
      <Box>
        <BackLink to={`/admin/${user.userId}/your-posts`} />
        <Heading>Your Posts</Heading>
        <Text>If you are reading this you must be authenticated.</Text>
        <Text>Where preview a blurb of post, you can delete, and click on editor icon to bring you to editor page</Text>
        <Button onClick={handleClick}>Load Your Posts</Button>
        <Button onClick={goToSinglePost}>Go to a post</Button>
      </Box>
    );
  }

export default YourPosts;

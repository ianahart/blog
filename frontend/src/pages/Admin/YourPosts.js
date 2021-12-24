import {Box, Button, Heading, Text } from '@chakra-ui/react';
import apiRequest from '../../services/apiRequest';
import BackLink from '../../components/Admin/Dashboard/BackLink';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const YourPosts = () => {
  const { user } = useContext(AuthContext);

  const handleClick = async (e) => {
    try {
    const response = await apiRequest('/api/v1/posts/', {}, 'GET');
    console.log(response);
    } catch(e) {
      console.log(e)
    }

  }


  return (
    <Box>
      <BackLink to={`/admin/${user.userId}/your-posts`} />
      <Heading>Your Posts</Heading>
      <Text>If you are reading this you must be authenticated.</Text>
      <Text>Where preview a blurb of post, you can delete, and click on editor icon to bring you to editor page</Text>
      <Button onClick={handleClick}>Load Your Posts</Button>
    </Box>
  );
}
export default YourPosts;



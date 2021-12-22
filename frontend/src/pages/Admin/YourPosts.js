import {Box, Button, Heading, Text } from '@chakra-ui/react';
import apiRequest from '../../services/apiRequest';

const YourPosts = () => {

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
      <Heading>Your Posts</Heading>
      <Text>If you are reading this you must be authenticated.</Text>
      <Text>Where preview a blurb of post, you can delete, and click on editor icon to bring you to editor page</Text>
      <Button onClick={handleClick}>Load Your Posts</Button>
    </Box>
  );
}
export default YourPosts;
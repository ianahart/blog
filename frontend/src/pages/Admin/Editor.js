import {Box, Heading, Text } from '@chakra-ui/react';
import BackLink from '../../components/Admin/Dashboard/BackLink';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
const Editor = () => {
    const { user } = useContext(AuthContext);

  return (
    <Box>
      <BackLink to={`/admin/${user.userId}/`} />
      <Heading>Editor</Heading>
      <Text>If you are reading this you must be authenticated.</Text>
      <Text>Where you can update and create a blog post</Text>
    </Box>
  );
}
export default Editor;
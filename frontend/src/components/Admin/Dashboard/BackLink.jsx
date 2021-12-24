import { Link as RouterLink } from 'react-router-dom';
import { Box, Icon, Link } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
const BackLink = () => {
   const { user } = useContext(AuthContext);
  return (
    <Box
      pl={5}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Icon mr={5} color="gray.secondary" as={FiHome}></Icon>
      <Link
        as={RouterLink}
        to={`/admin/${user.userId}/dashboard`}
        _hover={{ textDecoration: 'none' }}
      >
      Back to Dashboard
      </Link>
    </Box>
  )
}
export default BackLink;
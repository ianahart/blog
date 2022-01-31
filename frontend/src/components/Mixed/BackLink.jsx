import { Link as RouterLink } from 'react-router-dom';
import { Box, Icon, Link } from '@chakra-ui/react';
const BackLink = ({ path, icon, text }) => {
  return (
    <Box
      py={3}
      pl={5}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Icon mr={5} color="gray.secondary" as={icon}></Icon>
      <Link as={RouterLink} to={path} _hover={{ textDecoration: 'none' }}>
        {text}
      </Link>
    </Box>
  );
};
export default BackLink;

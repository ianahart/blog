import { Link as RouterLink } from 'react-router-dom';
import { Box, Icon, Link } from '@chakra-ui/react';

const DashLink = ({ to, label, icon }) => {
  return (
    <Box
      py={3}
      px={7}
      _hover={{ backgroundColor: 'light.primary' }}
      cursor="pointer"
      display="flex"
      justifyContent="flex-start"
      margin="auto"
      alignItems="center">
      <Link
        _active={{color: 'blue'}}
        width="70%"
        textAlign="left"
        color="dark.secondary"
        as={RouterLink}
        _hover={{ textDecoration: 'none' }}
        fontWeight="400"
        to={to}>
        { label }
      </Link>
      <Icon width="30%" color="gray.secondary" as={icon}></Icon>
    </Box>
  );
}
export default DashLink;
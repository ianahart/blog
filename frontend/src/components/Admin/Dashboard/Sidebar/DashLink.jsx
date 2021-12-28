import { Link as RouterLink } from 'react-router-dom';
import { Box, Icon, Link } from '@chakra-ui/react';

const DashLink = ({ link, activeComp, handleActiveComp }) => {
  const dynamicStyles = activeComp === link.comp ? { color: '#16DB93', fontWeight: 'bold', fontSize: '1rem' } : { color: '#686D76', fontWeight: '400', fontSize: '0.9rem' };
  return (
    <Box
      py={3}
      px={7}
      _hover={{  backgroundColor: 'rgba(22, 219, 147, 0.1)' }}
      cursor="pointer"
      display="flex"
      justifyContent="flex-start"
      margin="auto"
      alignItems="center">
      <Link
        style={dynamicStyles}
        onClick={() => handleActiveComp(link.comp)}
        width="70%"
        textAlign="left"
        as={RouterLink}
        _hover={{ textDecoration: 'none' }}
        to={link.to}>
        { link.label }
      </Link>
      <Icon style={dynamicStyles} width="30%" as={link.icon}></Icon>
    </Box>
  );
}
export default DashLink;
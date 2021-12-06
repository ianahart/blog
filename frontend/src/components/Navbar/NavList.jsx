import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem, Link } from '@chakra-ui/react';

const NavList = ({ links }) => {

  return (
       <List
        h="100%"
        display='flex'
        justifyContent="center"
        alignItems="center"
        flexDirection={['column', 'column','row']}>
        { links.map((link) => {
          return (
            <ListItem key={link.id} py={1.5}>
              <Link
                fontWeight="700"
                fontSize="lg"
                _hover={{ textDecoration: 'none' }}
                color="light.primary"
                px={10} as={RouterLink}
                to={link.path}>{ link.label }
              </Link>
            </ListItem>
          );
        })}
      </List>
  );
}

export default NavList;
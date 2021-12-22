import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem, Link } from '@chakra-ui/react';
import { useContext } from 'react';
import { NavContext } from '../../contexts/NavContext';

const NavList = ({ links, isMobileMenuOpen }) => {
 const { dispatch } = useContext(NavContext);

 const handleClick = () => {
   if (isMobileMenuOpen) {
      dispatch({ type: 'MOBILE_MENU_CLOSE', isOpen: false })
   }
 }

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
                onClick={handleClick}
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
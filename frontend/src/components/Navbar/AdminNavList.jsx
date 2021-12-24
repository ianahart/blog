import { Link as RouterLink } from 'react-router-dom';
import {  List, ListItem, Link } from '@chakra-ui/react';
import { useContext } from 'react';
import { nanoid } from 'nanoid';

import { NavContext } from '../../contexts/NavContext';
import { AuthContext } from '../../contexts/AuthContext';
import AdminLogout from './AdminLogout';

const AdminNavList = ({ isMobileMenuOpen }) => {
  const { dispatch } = useContext(NavContext);
  const { user } = useContext(AuthContext)

  const handleClick = () => {
    if (isMobileMenuOpen) {
       dispatch({ type: 'MOBILE_MENU_CLOSE', isOpen: false })
    }
  }

  const links = [
    { label: 'Dashboard', path: `/admin/${user.userId}/dashboard`, id: nanoid() },
  ];
  return (
       <List
        h="100%"
        mt={4}
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
                px={4} as={RouterLink}
                to={link.path}>{ link.label }
              </Link>
            </ListItem>
          );
        })}
        <AdminLogout />
      </List>
  );
}

export default AdminNavList;
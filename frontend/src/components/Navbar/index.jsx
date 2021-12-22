import { useEffect, useContext, Fragment } from 'react';
import { Box, Heading } from '@chakra-ui/react'
import { nanoid } from 'nanoid';
import { BiMenu, BiX } from 'react-icons/bi';
import { NavContext } from '../../contexts/NavContext';
import { AuthContext } from '../../contexts/AuthContext';
import NavList from './NavList';
import AdminNavList from './AdminNavList';
import Logo from '../Navbar/Logo';

const Navbar = () => {
  const { user } = useContext(AuthContext)
  const {
          isMobileView,
          handleResize,
          isMobileMenuOpen,
          dispatch } = useContext(NavContext);

  useEffect(() => {
    handleResize(window.innerWidth);

  }, [handleResize]);
  useEffect(() => {
    const resize = () => {
       handleResize(window.innerWidth);
    }
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [handleResize]);

  const shouldShowMobileMenu = () => {
    return isMobileMenuOpen && isMobileView;
  }

  const showAdminLinks = () => {
    return (
        <Fragment>
          <NavList isMobileMenuOpen={isMobileMenuOpen} links={navLinks(links)} />
          <AdminNavList isMobileMenuOpen={isMobileMenuOpen} />
        </Fragment>
    );
  }

  const links = [{ label: 'Home', path: '/', id: nanoid() },
    { label: 'Posts', path: '/posts', id: nanoid() },
    { label: 'Categories', path: '/categories', id: nanoid() },
    { label: 'About', path: '/about', id: nanoid() },
    { label: 'Admin', path: '/admin/login', id: nanoid() }];

  const navLinks = (links) => {
    return user.authenticated ? links.filter((link) => link.label.toLowerCase() !== 'admin') : links;
  }
  const mobileView = () => {
    return (
      <Box>
        <Logo />
        <Box
          as="div"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="row">
          {isMobileMenuOpen ? (<Box
            onClick={() => dispatch({ type: 'MOBILE_MENU_CLOSE', isOpen: false }) }
            color="orange.secondary"
            as={BiX} cursor="pointer"
            fontSize="5xl"
           />):
           (<Box
            onClick={() => dispatch({ type: 'MOBILE_MENU_OPEN', isOpen: true }) }
            color="orange.secondary" as={BiMenu}
            cursor="pointer"
            boxShadow="md"
            fontSize="5xl"
           />)
          }
          <Heading color="light.primary">Menu</Heading>
        </Box>
      </Box>
    )
  }

  const handleMobileMenu = () => {
    if (shouldShowMobileMenu() && user.authenticated) {
      return (
        <Fragment>
          <NavList isMobileMenuOpen={isMobileMenuOpen} links={navLinks(links)}/>
          <AdminNavList isMobileMenuOpen={isMobileMenuOpen} />
        </Fragment>
      );
    } else if(shouldShowMobileMenu() && !user.authenticated) {
      return (
        <NavList isMobileMenuOpen={isMobileMenuOpen} links={navLinks(links)} />
      )
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      py={3}
      pb={0}
      minHeight="200px"
      h={['100%']}
      bg="blue.primary" as="nav">
      { isMobileView ? ( mobileView() ) : (
        <Box>
          <Logo />
           { user.authenticated && showAdminLinks() ? (showAdminLinks()) :
              (
                <NavList isMobileMenuOpen={isMobileMenuOpen} links={navLinks(links)}/>
              )
           }
          </Box> )
      }
      {handleMobileMenu()}
      <Box bg="gray.primary" mt="auto" w="100%" h="5px"></Box>
    </Box>
  );
}
export default Navbar;
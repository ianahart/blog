import { useEffect, useContext } from 'react';
import { Box, Heading } from '@chakra-ui/react'
import { BiMenu, BiX } from 'react-icons/bi';
import { NavContext } from '../../contexts/NavContext';
import NavList from './NavList';
import Logo from '../Navbar/Logo';
import { getNavLinks } from '../../misc/data';

const Navbar = () => {
  const navLinks = getNavLinks();
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
          <NavList links={navLinks}  />
        </Box>  )
      }
      { shouldShowMobileMenu() &&
          <NavList links={navLinks}  />
      }
      <Box bg="gray.primary" mt="auto" w="100%" h="5px"></Box>
    </Box>
  );
}
export default Navbar;
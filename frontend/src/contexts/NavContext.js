import { createContext, useReducer, useState } from "react";
import { navReducer } from "../reducers/navReducer";
import { nanoid } from 'nanoid';

export const NavContext = createContext();


const NavContextProvider = (props) => {

  const [navLinks, setNavLinks] = useState([
    { label: 'Home', path: '/', id: nanoid() },
    { label: 'Posts', path: '/posts', id: nanoid() },
    { label: 'Categories', path: '/categories', id: nanoid() },
    { label: 'About', path: '/about', id: nanoid() },
    { label: 'Admin', path: '/admin/login', id: nanoid() }]);

  let [isMobileView, setIsMobileView] = useState(false);
  let [isMobileMenuOpen, dispatch] = useReducer(navReducer, false);

  const handleResize = (screenWidth) => {
    const view =  screenWidth <= 768 ? true : false;
    setIsMobileView(view);;

    if (!isMobileView && isMobileMenuOpen) {
      dispatch({ type: 'MOBILE_MENU_CLOSE', isOpen: false });
    }
  }

  return (
    <NavContext.Provider value={
        {
        isMobileView,
        isMobileMenuOpen,
        handleResize,
        navLinks,
        dispatch
        }
      }
    >
      {props.children}
    </NavContext.Provider>
  )
}

export default NavContextProvider;
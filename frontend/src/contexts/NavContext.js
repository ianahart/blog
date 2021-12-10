import { createContext, useReducer, useState } from "react";
import { navReducer } from "../reducers/navReducer";

export const NavContext = createContext();


const NavContextProvider = (props) => {

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
        dispatch
        }
      }
    >
      {props.children}
    </NavContext.Provider>
  )
}

export default NavContextProvider;
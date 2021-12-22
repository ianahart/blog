import { useLocation, Navigate } from "react-router-dom";
import { getLocalUser } from "../../misc/helpers";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const RequireAuth = ({ children, }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user?.accessToken && getLocalUser()?.accessToken) {
    return children;
  } else {
     return <Navigate to="/admin/login"
      replace
      state={{ path: location.pathname,  }} />
  }
}

export default RequireAuth;
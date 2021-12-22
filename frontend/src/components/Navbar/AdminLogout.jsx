import { Box } from "@chakra-ui/react";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import apiRequest from "../../services/apiRequest";
import { AuthContext } from "../../contexts/AuthContext";


const AdminLogout = () => {
  const { handleRemoveLocUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await apiRequest('/api/v1/auth/logout', {  }, 'DELETE', null);
      if (response) {
        handleRemoveLocUser();
        navigate('/admin/login');
      }
    } catch(e) {

    }
  };

  return (
       <Box
        fontWeight="700"
        fontSize="lg"
        _hover={{ textDecoration: 'none' }}
        color="light.primary"
        px={4} onClick={logout} role="button">Logout</Box>
   );
};

export default AdminLogout;
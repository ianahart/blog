import { createContext, useState } from "react";
import { applyRules } from "../misc/helpers";
import { findNeedle } from "../misc/helpers";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [authErrors, setAuthErrors] = useState('');
  const [activeField, setActiveField] = useState('');
  const [adminExists, setAdminExists] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTempVerified, setTempVerified] = useState(false);
  const [credentials, setCredentials] = useState([
    {name: 'username', value: '', error: '' },
    {name: 'temp_password', value: '', error: '' },
    {name: 'password', value: '', error: '' }]);

  const handleInputChange = ({ name, value }) => {
    const updatedCreds = [...credentials];
    const index = findNeedle(updatedCreds, name, 'name');
    updatedCreds[index].value = value;
    setCredentials(updatedCreds);
  };

  const validateForm = (fields) => {
    let validated = [...fields];
    let exclude;

    if (adminExists) {
      exclude = 'temp_password';
    } else if (!adminExists && isTempVerified) {
      exclude = 'temp_password'
    } else {
      exclude = 'password'
    }

    validated
    .filter(field => field.name !== exclude)
    .forEach((field) => {
          let formatted = field.name.replace('_', ' ');
          formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
          applyRules(validated, field, formatted);
        });
    setCredentials(validated);
  }

  const handleRetrySubmit = () => {
    const creds = [...credentials];
    const updatedCreds = creds.map(field =>( field.error = ''));
    setCredentials(updatedCreds);
  }


  const authenticate = (e) => {
    // handle switch from verify to login when using temp password
        console.log('FORM SUBMITTED!!!!!!!!!!!!!!!!!!!!!!');
  };

  return (
     <AuthContext.Provider value={
        {
          activeField,
          adminExists,
          isTempVerified,
          setActiveField,
          credentials,
          authErrors,
          handleInputChange,
          validateForm,
          authenticate,
          handleRetrySubmit,
        }
      }
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
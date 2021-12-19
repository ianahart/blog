import { createContext, useState } from "react";
import { applyRules } from "../misc/helpers";
import { emailRules, findNeedle } from "../misc/helpers";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
   const initialUserState = { adminExists: false, isTempVerified: false, token: null, curUser: null }
   const initialCredState = {
    creds:  [
      {name: 'email', value: '', error: '' },
      {name: 'temp_password', value: '', error: '' },
      {name: 'password', value: '', error: '' }
    ],
}
  const [user, setUser] = useState(initialUserState);
  const [credentials, setCredentials] = useState(initialCredState.creds);

  const handleInputChange = ({ name, value }) => {
    const updatedCreds = [...credentials];
    const index = findNeedle(updatedCreds, name, 'name');
    updatedCreds[index].value = value;
    setCredentials(updatedCreds);
  };

  const emailRule = () => {
    const updatedCreds = [...credentials];
    const index = findNeedle(updatedCreds, 'email', 'name');
    updatedCreds[index].error = emailRules(updatedCreds[index].value);
    setCredentials(updatedCreds);
  }

  const validateForm = (fields) => {
    const validated = [...fields];
    const exclude = user.adminExists || (!user.adminExists && user.isTempVerified) ? 'temp_password' : 'password';
    validated
    .filter(field => field.name !== exclude)
    .forEach((field) => applyRules(validated, field));
    setCredentials(validated);
  };

  const handleRetrySubmit = (form) => {
    const creds = [...form];
    const updatedCreds = creds.map((cred) => Object.assign({},cred, { error: '' }));
    setCredentials(updatedCreds);
  };

  const applyErrors = ({ data }) => {
    const validated = [...credentials];
    data.detail.forEach(({ loc, msg }) => {
      const fieldIndex = validated.findIndex(({ name }) => name === loc[1])
      validated[fieldIndex].error = msg
    });
    setCredentials(validated)
  }

  return (
     <AuthContext.Provider value={
        {
          user,
          setUser,
          credentials,
          setCredentials,
          handleInputChange,
          validateForm,
          emailRule,
          handleRetrySubmit,
          applyErrors,
        }
      }
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;

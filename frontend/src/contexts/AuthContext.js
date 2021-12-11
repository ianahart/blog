import { createContext, useState } from "react";
import { applyRules } from "../misc/helpers";
import { userNameRules, findNeedle } from "../misc/helpers";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const initialUserState = { adminExists: false, isTempVerified: false, token: null, curUser: null }
   const initialCredState = {
    creds:  [
      {name: 'username', value: '', error: '' },
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

  const userNameRule = () => {
    const updatedCreds = [...credentials];
    const index = findNeedle(updatedCreds, 'username', 'name');
    updatedCreds[index].error = userNameRules(updatedCreds[index].value);
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
    const updatedCreds = creds.map((cred) => Object.assign({},cred, { error: '' }))
    setCredentials(updatedCreds);
  };

  const authenticate = (e) => {
    if (!user.adminExists && !user.isTempVerified) {
       setUser({ ...user, isTempVerified: true });
      return
    }
    console.log('AuthContext.js@authenticate(): Form has been submitted...');
  };

  return (
     <AuthContext.Provider value={
        {
          user,
          setUser,
          credentials,
          setCredentials,
          handleInputChange,
          validateForm,
          userNameRule,
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

/** AUTH FLOW */
 // START
  // post(checkUserNameExists)
  // if (usernameExists && tempPasswordChanged) {
  //   post(normalLogin)
  // } else if (userNameExists && !tempPasswordChanged) {
  //   /**  show temp password */
  //    post(verify temp_password)
  //   if (tempPasswordVerfied) {
  //   //   /** show create password */
  //   }
  // }

  //usernames will be manually added or added by an already verified administrator
    // if (!username exists) {
        // if (!noAdminsYet) {
        //   // show temp password
        // } else {
        //   // do nothing show error
        // }
    // }

// END
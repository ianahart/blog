import { useContext, useState, useEffect } from 'react';
import { BiUser, BiLockAlt } from 'react-icons/bi';
import { Link as RouterLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { findNeedle } from '../../misc/helpers';
import apiRequest from '../../services/apiRequest';

import {
        Box,
        Button,
        FormControl,
        FormLabel,
        FormErrorMessage,
        Heading,
        Icon,
        Input,
        InputGroup,
        Link
      } from '@chakra-ui/react';
import  { AuthContext }  from '../../contexts/AuthContext';



const LoginForm = () => {
  const initialState = {
    activeField: '',
    userVerificationSent: false,
  }

  const [state, setState] = useState(initialState);
  const {
          user,
          setUser,
          credentials,
          setCredentials,
          authenticate,
          validateForm,
          userNameRule,
          handleInputChange,
          handleRetrySubmit }=  useContext(AuthContext);

  let passwordType = user.isTempVerified || user.adminExists ? 'password' : 'temp_password';
  let password = credentials[findNeedle(credentials, passwordType, 'name')]
  let username = credentials[findNeedle(credentials, 'username', 'name')];

  const roleText = (admin, verified, notVerified) => {
    if (user.adminExists) {
      return admin;
    }
    return !user.adminExists && user.isTempVerified ? verified : notVerified;
  };

  const checkErrors = () => {
    return credentials.some((field) => field.error.length);
  }


  const handleOnSubmit = (e) => {

      handleRetrySubmit(credentials);
      validateForm(credentials);
      if (checkErrors()) {
        return;
      }
      console.log('Submitted.');

        /** TODO TOMORROW */
        // setup post endpoint

        //verify submit is making actually apiRequest because authenticate() is commented out
        authenticate(credentials);

      // const response = apiRequest('/api/v1/admin/login', credentials, 'POST');
  }


  const handleClick = () => {
        userNameRule();
        if (!username.error.length) {



           const response = apiRequest('/api/v1/admin/verify/username', credentials, 'POST');
          //  const response = apiRequest('/api/v1/admin/verify/temp', credentials, 'POST');

          // setState({ ...state, userVerificationSent: true })
          // // const response = await axios({})
          // // setUser({ ...user, ['adminExists']:true });
          // setUser({ ...user, adminExists: false });
            // setAdminExists(false)
           //(response.data.adminExists)
          // if (true) {
           // setUser({ ...user, ['adminExists']:true });
          // } else {
          // setUser({ ...user, ['adminExists']:false });
          // }
       }

  }

  const onSubmitHandler = debounce(handleOnSubmit, 200);
  const changeHandler = debounce(value => handleInputChange(value), 50);
  const clickHandler = debounce(handleClick, 200);

  const debouncedChangeHandler = ({ target }) => changeHandler({ name:target.name, value:target.value });
  const debouncedClickHandler = () => clickHandler()
  const debouncedOnSubmitHandler = (e) => {e.preventDefault(); onSubmitHandler(e)}

  useEffect(() => {
       return () => setCredentials(['username', 'temp_password', 'password']
       .map(cred => ({ name: cred, value: '', error: '' })))
  }, [setCredentials])


  return (
    <Box
      onSubmit={debouncedOnSubmitHandler}
      method="POST"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100%"
      as="form"
    >
      <Heading
        textAlign="center"
        mt={9}
        color="dark.primary"
        letterSpacing="0"
        size="lg"
      >Admin Login
      </Heading>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <FormControl
          isInvalid={username.error}
          my={8}
          id="username"
        >
          <FormLabel variant="login">Username</FormLabel>
          <InputGroup
            display="flex"
            flexDirection="column"
            position="relative"
          >
            <Icon
              position="absolute"
              left="12px"
              zIndex="1"
              fontSize="1.5rem"
              color={state.activeField === 'username' ? 'blue.light': 'gray.secondary'}
              as={BiUser}
            />

            <Input
              onFocus={(e) => setState({...state, activeField: e.target.name })}
              onBlur={() => setState({...state, activeField: '' })}
              onChange={debouncedChangeHandler}
              name="username"
              value={username.value}
              autoComplete="off"
              placeholder="Type your username"
              pl="35px"
              variant="minimal"
              size="sm"
           />
           <FormErrorMessage
            display="flex"
            justifyContent="center"
            my={3}
            >
              {username.error}
            </FormErrorMessage>
          </InputGroup>
        </FormControl>
        {
          !state.userVerificationSent &&
          <Box my={5} textAlign="center">
            <Button onClick={debouncedClickHandler} variant="main">Continue</Button>
          </Box>
         }
         { state.userVerificationSent &&
          <FormControl
            isInvalid={password.error}
            my={8}
            id="password"
          >
            <FormLabel variant="login">{roleText('Password', 'Create Password', 'Temp Password')}</FormLabel>
            <InputGroup
              display="flex"
              flexDirection="column"
              position="relative"
            >
              <Icon
                position="absolute"
                left="12px"
                zIndex="1"
                fontSize="1.5rem"
                color={state.activeField === 'password' || state.activeField === 'temp_password' ? 'blue.light': 'gray.secondary'}
                as={BiLockAlt}
              />
              <Input
                onFocus={(e) => setState({...state, activeField: e.target.name })}
                onBlur={() => setState({...state, activeField: '' })}
                onChange={debouncedChangeHandler}
                name={roleText('password', 'password', 'temp_password')}
                value={password.value}
                autoComplete="off"
                placeholder={roleText('Type your password', 'Create your password', 'Type your temp password')}
                pl="35px"
                variant="minimal"
                size="sm"
                type="password"
            />
            <FormErrorMessage
              display="flex"
              justifyContent="center"
              my={3}
            >
              {password.error}
            </FormErrorMessage>
            </InputGroup>
          </FormControl>
        }
      </Box>
        <Box mb="1rem" textAlign="right" mr="0.65rem">
          <Link
            as={RouterLink}
            _hover={{ textDecoration: 'none' }}
            color="dark.secondary"
            fontWeight="400"
            to="/admin/forgot-password">
            Forgot password?
          </Link>
        </Box>
        {
          state.userVerificationSent &&
          <Box my={5} textAlign="center">
            <Button type="submit" variant="main">{roleText('Login', 'Login', 'Verify')}</Button>
          </Box>
        }
    </Box>
  );
}

export default LoginForm;
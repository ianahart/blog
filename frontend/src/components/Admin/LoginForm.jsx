import { useContext, useState, useEffect } from 'react';
import { BiUser, BiLockAlt } from 'react-icons/bi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
    isUserVerified: false,
  }

  const [state, setState] = useState(initialState);
  const navigate = useNavigate()
  const {
          user,
          setUser,
          credentials,
          setCredentials,
          validateForm,
          emailRule,
          handleInputChange,
          applyErrors,
          handleRetrySubmit }=  useContext(AuthContext);

  let passwordType = user.isTempVerified || user.adminExists ? 'password' : 'temp_password';
  let password = credentials[findNeedle(credentials, passwordType, 'name')]
  let email = credentials[findNeedle(credentials, 'email', 'name')];

  const roleText = (admin, verified, notVerified) => {
    if (user.adminExists) {
      return admin;
    }
    return !user.adminExists && user.isTempVerified ? verified : notVerified;
  };

  const checkErrors = () => {
    return credentials.some((field) => field.error.length);
  }

  const verify = async (data) => {
    try {
      const response = await apiRequest('/api/v1/users/admin/verify', data, 'POST', null, applyErrors);
      console.log('verify');
        if (response.status === 200) {
            if (!user.adminExists && !user.isTempVerified && response.data.is_user_verified) {
              setUser({ ...user, isTempVerified: true });
            }
            return response.data.is_user_verified
        }
    } catch(e) {
        console.log(e)
      console.log(`LoginForm.jsx@verify():`);
    }
  }

  const handleOnSubmit = async (e) => {
      try {
        handleRetrySubmit(credentials);
        validateForm(credentials);
        if (checkErrors()) {
          return;
        }
          if(!user.adminExists && !user.isTempVerified) {
              await verify({ temp_password: password.value })
             return
          }
          console.log('create')
          setUser({...user, adminExists: true });
          const response = await apiRequest('/api/v1/users/admin/', { credentials }, 'POST', null, applyErrors);
      } catch(e) {
        console.log('LoginForm.jsx@handleSubmit() Error:', e);
      }
  }

  const handleClick = async () => {
        console.log('verify email')
        handleRetrySubmit(credentials);
        emailRule();
        if (email.error.length) {
          return;
        }
        const response =  await apiRequest('/api/v1/users/admin/exists',  { email: email.value }, 'POST',null, applyErrors);
        if (!response) {
          return
        }
        if (!response.data.user_exists) {
            setState({ ...state, isUserVerified: true });
            return;
        }
        setUser({ ...user, adminExists: true });
        setState({ ...state, isUserVerified: true });
  }

  const login = async () => {
    try {
      handleRetrySubmit(credentials);
      validateForm(credentials);
      const response = await apiRequest('/api/v1/auth/login', { credentials }, 'POST', null , applyErrors);
      console.log(response)
      if (!response) {
        return
      }
      navigate('/')
    } catch(e) {
      console.log(e);
    }
  }

  const onSubmitHandler = debounce(handleOnSubmit, 200);
  const changeHandler = debounce(value => handleInputChange(value), 50);
  const clickHandler = debounce(handleClick, 200);

  const debouncedChangeHandler = ({ target }) => changeHandler({ name:target.name, value:target.value });
  const debouncedClickHandler = () => clickHandler()
  const debouncedOnSubmitHandler = (e) => {e.preventDefault(); onSubmitHandler(e)}

  useEffect(() => {
       return () => setCredentials(['email', 'temp_password', 'password']
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
          isInvalid={email.error}
          my={8}
          id="email"
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
              color={state.activeField === 'email' ? 'blue.light': 'gray.secondary'}
              as={BiUser}
            />

            <Input
              onFocus={(e) => setState({...state, activeField: e.target.name })}
              onBlur={() => setState({...state, activeField: '' })}
              onChange={debouncedChangeHandler}
              name="email"
              value={email.value}
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
              {email.error}
            </FormErrorMessage>
          </InputGroup>
        </FormControl>
        {
          !state.isUserVerified &&
          <Box my={5} textAlign="center">
            <Button onClick={debouncedClickHandler} variant="main">Continue</Button>
          </Box>
         }
         { state.isUserVerified &&
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
          state.isUserVerified && !user.adminExists &&
          <Box my={5} textAlign="center">
            <Button type="submit" variant="main">{roleText('Create', 'Create', 'Verify')}</Button>
          </Box>
        }
        {
          state.isUserVerified && user.adminExists &&
          <Box my={5} textAlign="center">
            <Button onClick={login} type="button" variant="main">Login</Button>
          </Box>
        }
    </Box>
  );
}

export default LoginForm;
import { useContext } from 'react';
import { BiUser, BiLockAlt } from 'react-icons/bi';
import { Link as RouterLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { findNeedle } from '../../misc/helpers';

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

  const {
          adminExists,
          isTempVerified,
          activeField,
          setActiveField,
          credentials,
          authenticate,
          validateForm,
          handleInputChange,
          handleRetrySubmit }=  useContext(AuthContext);

  const changeHandler = debounce(value => handleInputChange(value), 75);
  const debouncedHandler = ({ target }) => changeHandler({name:target.name, value:target.value});

  let passwordType = isTempVerified || adminExists ? 'password' : 'temp_password';
  let password = credentials[findNeedle(credentials, passwordType, 'name')]
  let username = credentials[findNeedle(credentials, 'username', 'name')];

  const roleText = (admin, verified, notVerified) => {
    if (adminExists) {
      return admin;
    }
    return !adminExists && isTempVerified ? verified : notVerified;
  };

  const checkErrors = () => {
    return credentials.some((field) => field.error.length);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleRetrySubmit(credentials);
    validateForm(credentials);
    if (!checkErrors()) {
      authenticate(credentials);
    }
  };

  return (
    <Box
      onSubmit={handleOnSubmit}
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
              color={activeField === 'username' ? 'blue.light': 'gray.secondary'}
              as={BiUser}
            />
            <Input
              onFocus={(e) => setActiveField(e.target.name)}
              onBlur={() => setActiveField('')}
              onChange={debouncedHandler}
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
          <FormControl
            // isInvalid={tempPassword.error || password.error}
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
                color={activeField === 'password' || activeField === 'temp_password' ? 'blue.light': 'gray.secondary'}
                as={BiLockAlt}
              />
              <Input
                onFocus={(e) => setActiveField(e.target.name)}
                onBlur={() => setActiveField('')}
                onChange={debouncedHandler}
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
              {/* { isTempVerified ? password.error : tempPassword.error } */}
              {password.error}
            </FormErrorMessage>
            </InputGroup>
          </FormControl>
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
        <Box my={5} textAlign="center">
          <Button type="submit" variant="main">{roleText('Login', 'Login', 'Verify')}</Button>
        </Box>
    </Box>
  );
}

export default LoginForm;






import {
  Box,
  Button,
  Icon,
  Image,
  Text,
  UnorderedList,
  Collapse,
  ListItem,
} from '@chakra-ui/react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useState, useEffect, useContext, Fragment } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import PortraitUpload from './PortraitUpload';
import PrimaryField from './PrimaryField';
import settingsBG from '../../../../images/settings.png';
import settingsSecure from '../../../../images/settings_secure.svg';
import apiRequest from '../../../../services/apiRequest.js';
import Spinner from '../../../Mixed/Spinner.jsx';
import Toast from '../../Dashboard/Editor/Toast.jsx';
import { getLocalUser } from '../../../../misc/helpers.js';

const Settings = () => {
  const { user, updateUserProp } = useContext(AuthContext);
  const [lastname, setLastname] = useState({ name: 'lastname', value: '' });
  const [password, setPassword] = useState({ name: 'password', value: '' });
  const [firstname, setFirstname] = useState({ name: 'firstname', value: '' });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [fieldErrors, setFieldErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleCloseToast = () => {
    setButtonClicked(false);
  };

  useEffect(() => {
    const locUser = getLocalUser();
    const prevFirstName = locUser.firstName ? locUser.firstName : '';
    const prevLastName = locUser.lastName ? locUser.lastName : '';

    setLastname((prevState) => ({ ...prevState, value: prevLastName }));
    setFirstname((prevState) => ({ ...prevState, value: prevFirstName }));
  }, [setFirstname, setLastname]);

  const handleOnChange = (name, event) => {
    const { value } = event.target;
    switch (name) {
      case 'password':
        setPassword({ ...password, name, value });
        break;
      case 'firstname':
        setFirstname({ ...firstname, name, value });
        break;
      case 'lastname':
        setLastname({ ...lastname, name, value });
        break;
      default:
        return;
    }
  };

  const validateFields = () => {
    [firstname, lastname].forEach((field) => {
      if (!field.value.trim().length) {
        setFieldErrors((prevState) => [
          ...prevState,
          `${field.name} is a required field.`,
        ]);
      }
    });
  };

  const handleSubmitError = ({ data, status }) => {
    if (status === 400) {
      setFieldErrors((prevState) => [...prevState, data.detail]);
      return;
    }

    const errors = [];
    setFieldErrors([]);
    data.detail.forEach(({ msg }) => {
      errors.push(msg);
    });
    setFieldErrors([...fieldErrors, ...errors]);
  };

  const updateFields = async () => {
    try {
      setFieldErrors([]);
      validateFields();

      if (fieldErrors.length) {
        return;
      }
      setIsLoading(true);
      const response = await apiRequest(
        `/api/v1/users/admin/${user.userId}`,
        {
          first_name: firstname.value,
          last_name: lastname.value,
          password: password.value,
        },
        'PATCH',
        handleSubmitError,
        null
      );

      if (response.status === 200) {
        const { firstName, lastName } = response.data.attrs;
        updateUserProp('firstName', firstName);
        updateUserProp('lastName', lastName);
        setIsLoading(false);
        setButtonClicked(true);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <Box
      backgroundImage={settingsBG}
      backgroundSize="cover"
      backgroundPosition="center"
      minHeight="100vh"
      width="100%"
    >
      <Box
        margin="0 auto"
        maxWidth="1200px"
        width={['100%', '100%', '100%', '100%']}
      >
        <Box
          margin="0 auto"
          mt={20}
          minHeight="450px"
          backgroundColor="#FFF"
          boxShadow="sm"
          width={['95%', '95%', '95%', '100%']}
          p={5}
          borderRadius={5}
        >
          <Text fontWeight="bold" color="dark.secondary">
            Your Settings
          </Text>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection={['column', 'column', 'row', 'row']}
          >
            <PortraitUpload />
            <form mb={5} width={['100%', '100%', '60%', '50%']}>
              {buttonClicked ? (
                <Box position="relative">
                  <Collapse in={buttonClicked} animateOpacity>
                    <Toast
                      handleCloseToast={handleCloseToast}
                      buttonClicked={buttonClicked}
                      message="Your information has been updated."
                    />
                  </Collapse>
                </Box>
              ) : (
                <Image
                  margin="1rem auto 3.5rem auto"
                  width="70%"
                  src={settingsSecure}
                  alt="settings secure illustration"
                />
              )}
              {fieldErrors.length ? (
                <Icon
                  height="24px"
                  width="24px"
                  color="red"
                  as={AiOutlineExclamationCircle}
                ></Icon>
              ) : (
                ''
              )}
              <UnorderedList>
                {fieldErrors.map((fieldError, key) => {
                  return (
                    <ListItem
                      py={0.5}
                      fontWeight="500"
                      color="validationError.primary"
                      key={key}
                    >
                      {fieldError}
                    </ListItem>
                  );
                })}
              </UnorderedList>
              {isLoading ? (
                <Spinner size={100} loading={isLoading} />
              ) : (
                <Fragment>
                  <PrimaryField
                    handleOnChange={handleOnChange}
                    name={firstname.name}
                    type="text"
                    text="First Name:"
                    value={firstname.value}
                  />
                  <PrimaryField
                    handleOnChange={handleOnChange}
                    name={lastname.name}
                    type="text"
                    text="Last Name:"
                    value={lastname.value}
                  />
                  <Box position="relative">
                    <Text
                      onClick={() => setPasswordVisible(!isPasswordVisible)}
                      cursor="pointer"
                      fontSize="12px"
                      fontWeight="bold"
                      color="#4169e1"
                      zIndex={5}
                      position="absolute"
                      top="45px"
                      right="15px"
                    >
                      {isPasswordVisible ? 'Hide' : 'Show'}
                    </Text>
                    <PrimaryField
                      handleOnChange={handleOnChange}
                      name={password.name}
                      type={isPasswordVisible ? 'text' : 'password'}
                      text="New Password:"
                      value={password.value}
                      helperText="New password cannot be the same password as your current one."
                    />
                  </Box>
                  <Box my={10} textAlign="center">
                    <Button onClick={updateFields} variant="main">
                      Submit
                    </Button>
                  </Box>
                </Fragment>
              )}
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Settings;

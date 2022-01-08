import { Box, Button, Icon, Image, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useState } from 'react';
import PortraitUpload from './PortraitUpload';
import PrimaryField from './PrimaryField';
import settingsBG from '../../../../images/settings.png';
import settingsSecure from '../../../../images/settings_secure.svg';
import apiRequest from '../../../../services/apiRequest.js';

const Settings = () => {
  const [lastname, setLastname] = useState({ name: 'lastname', value: '' });
  const [password, setPassword] = useState({ name: 'password', value: '' });
  const [firstname, setFirstname] = useState({ name: 'firstname', value: '' });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [fieldErrors, setFieldErrors] = useState([]);

  const handleOnChange = (name, event) => {
    const { value } = event.target;
    switch(name) {
      case 'password':
        setPassword({...password, name, value});
        break;
      case 'firstname':
        setFirstname({...firstname,  name, value });
        break;
     case 'lastname':
       setLastname({...lastname, name, value });
       break;
     default:
      return;
    }
  }

  const handlePortraitOnChange = (e) => {
    console.log(e);
  }

  const validateFields = () => {
    setFieldErrors([]);
    [firstname, lastname, password].forEach((field) => {
      if (!field.value.trim().length) {
        setFieldErrors((prevState) => [...prevState, `${field.name} is a required field.`]);
      }
    });
  };

  const updateFields = async () => {
    try {

      validateFields();
      if (!fieldErrors.length) {
        console.log('fields sent to be updated.');
      }

      // const response =  await apiRequest('/api/v1/posts/admin/',   formData , 'POST', handleSubmitError, null);
    } catch(e) {
      console.log(e)
    }
  };

  return (
    <Box backgroundImage={settingsBG} backgroundSize="cover" backgroundPosition="center" minHeight="100vh" width="100%">
      <Box margin="0 auto" maxWidth="1200px" width={['100%', '100%','100%','100%']}>
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
          <Text fontWeight="bold" color="dark.secondary">Your Settings</Text>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection={['column', 'column', 'row', 'row']}
          >
           <PortraitUpload handlePortraitOnChange={handlePortraitOnChange}  />
            <form mb={5} width={['100%', '100%', '60%', '50%']}>
             <Image margin="1rem auto 3.5rem auto" width="70%" src={settingsSecure} alt="settings secure illustration" />
             {fieldErrors.length ? <Icon height="24px" width="24px" color="red" as ={AiOutlineExclamationCircle}></Icon> : ''}
             <UnorderedList>
               {
                 fieldErrors.map((fieldError, key) => {
                  return <ListItem py={0.5} fontWeight="500" color="validationError.primary" key={key}>{ fieldError }</ListItem>
                 })
               }
             </UnorderedList>
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
                { isPasswordVisible ? 'Hide' : 'Show' }
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
                <Button onClick={updateFields} variant="main">Submit</Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Settings;



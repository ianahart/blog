import { Box } from '@chakra-ui/react';
import LoginForm from '../../components/Admin/LoginForm';

const Login = () => {
  const gradient = "linear-gradient(to left top, #16db93, #00cea6, #00bfb2, #00b0b7, #00a0b3, #00a4b2, #00a7b0, #00abad, #2cc1a2, #69d38c, #a9e270, #efea5a);"
  return (
    <Box
      minHeight="100vh"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundImage={gradient}
    >
      <Box
        width={['95%', '380px']}
        minHeight={['400px', '550px']}
        maxWidth="440px"
        mt="-5rem"
        height="100%"
        backgroundColor="white"
        boxShadow="black"
        rounded="10px"
      >
        <LoginForm />
     </Box>
    </Box>
  )
}

export default Login;
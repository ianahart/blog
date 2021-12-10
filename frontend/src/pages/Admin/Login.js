import { Box } from '@chakra-ui/react';
import LoginForm from '../../components/Admin/LoginForm';

const Login = () => {
  const gradient = "linear-gradient(to left top, #ffa41b, #ff7652, #f0587d, #bc549a, #7757a0, #5268a9, #3574a5, #327c99, #619ca8, #93bcba, #c5dbd3, #f5faf6);"
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
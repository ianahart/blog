import { Box, Text } from '@chakra-ui/react';
import HomeBG from '../images/home_bg.svg';

const Home = () => {

  return (
    <Box backgroundImage={HomeBG} backgroundSize="cover" backgroundPosition="center" minHeight="100vh" width="100%">
      <Text>This is the home page</Text>
    </Box>
  );
}

export default Home;
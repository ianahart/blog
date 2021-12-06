import main_logo from '../../images/main_logo.png';
import { Box, Heading, Image } from '@chakra-ui/react';
import '@fontsource/caveat-brush/400.css'

const Logo = () => {
  return (
      <Box display="flex" justifyContent="center" alignItems="center" mb={5} flexDirection="column">
        <Image src={main_logo} alt="computer with rocket"/>
        <Heading size="xl" fontFamily="caveat brush" color="blue.secondary">Ian Hart</Heading>
      </Box>
  );

}

export default Logo;
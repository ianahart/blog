import { Box, Text, Heading, Button, Slide, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
const CookieBanner = ({ cookieBannerShowing, closeCookieBanner }) => {
  const handleOnClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    closeCookieBanner();
  };

  return (
    <Slide direction="bottom" in={cookieBannerShowing} style={{ zIndex: 10 }}>
      <Box
        backgroundColor="light.primary"
        boxShadow="lg"
        border=" 1px solid dark.secondary"
        borderRadius={8}
        width="80%"
        margin="0 auto"
        p="1rem"
      >
        <Heading as="h4">This website uses cookies</Heading>
        <Text lineHeight="1.6">
          We use cookies to provide you with the best possible experience. They also allow us to
          analyze user behavior in order to constantly improve the website for you.
        </Text>
        <Box display="flex" width="400px">
          <Link
            display="inline-block"
            mx={3}
            color="blue.primary"
            textDecoration="underline"
            as={RouterLink}
            to="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link color="blue.primary" textDecoration="underline" as={RouterLink} to="/cookie-policy">
            Cookie Policy
          </Link>
        </Box>
        <Box display="flex" mt={5} mb={1} justifyContent="flex-end">
          <Button
            backgroundColor="green.primary"
            display="inline-block"
            width="120px"
            mx={3}
            onClick={handleOnClick}
          >
            Ok
          </Button>
        </Box>
      </Box>
    </Slide>
  );
};
export default CookieBanner;

import { Box, Text, Heading } from '@chakra-ui/react';
const Total = ({ label, value }) => {
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#FFF"
      margin="0 auto"
      my={['1rem', '1rem', 0]}
      height="140px"
      width={['40%', '40%', '200px']}
      boxShadow="md"
      p="1rem"
      borderRadius={8}
    >
      <Heading textAlign="center" color="dark.secondary" fontSize="28px" height="80px" as="h5">
        {label}
      </Heading>
      <Text
        color="blue.primary"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        fontSize="40px"
      >
        {value}
      </Text>
    </Box>
  );
};

export default Total;

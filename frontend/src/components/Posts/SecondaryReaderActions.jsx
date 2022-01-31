import { Box, Text, Button } from '@chakra-ui/react';

const SecondaryReaderActions = ({ firstName }) => {
  return (
    <Box height="100%">
      <Box
        backgroundColor="blue.primary"
        mb={1.5}
        height="40px"
        borderTopRadius={8}
      ></Box>
      <Box padding="1rem">
        <Text fontStyle="italic" color="dark.secondary" cursor="pointer">
          Checkout more posts written by {firstName}
        </Text>
        <Box textAlign="center" margin="1.5rem auto 1.5rem auto">
          <Button color="dark.secondary" width="200px">
            See More
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SecondaryReaderActions;

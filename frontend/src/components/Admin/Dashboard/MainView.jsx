import { Box, Heading } from '@chakra-ui/react';

const MainView = () => {
  return (
    <Box minHeight="100vh" m="1rem" backgroundColor="light.primary" width="100%">
      <Box height="100%" backgroundColor="blue.primary" borderRadius="6px">
        <Heading color="blue.primary" size="sm">
          Blog metrics will be displayed here.. stats, graphs, etc...
        </Heading>
      </Box>
    </Box>
  );
};
export default MainView;


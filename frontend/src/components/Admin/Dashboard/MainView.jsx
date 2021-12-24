import { Box, Heading } from "@chakra-ui/react";

const MainView = () => {
  return (
    <Box
      minHeight="100%"
      backgroundColor="light.primary"
      width="100%"
    >
      <Box
        mt={20}
        mr={5}
        mb={5}
        ml={5}
        minHeight="50%"
        backgroundColor="#FFF"
        borderRadius="6px"
      >
        <Heading color="gray.outline">This is the main view</Heading>
      </Box>
    </Box>
  );
}
export default MainView;
import { Box, Icon, Text } from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { ScaleFade } from '@chakra-ui/react';
const Tag = ({ id, value, handleRemoveTag }) => {
  return (
    <ScaleFade initialScale={0.1} in="true">
      <Box
        width="150px"
        maxWidth="200px"
        onClick={() => handleRemoveTag(id)}
        transition="all 0.5s ease-in-out"
        boxShadow="md"
        my={2.5}
        borderRadius={5}
        backgroundColor="blue.primary"
        p={1}
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color="light.primary" wordBreak="break-all" mr={1}>
          {value}
        </Text>
        <Icon height="18px" width="18px" color="#FFF" as={AiOutlineClose} />
      </Box>
    </ScaleFade>
  );
};

export default Tag;

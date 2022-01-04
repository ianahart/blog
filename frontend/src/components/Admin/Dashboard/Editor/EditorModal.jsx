import { Box, Text, Button, SlideFade } from '@chakra-ui/react';

const EditorModal = ({ editorModalOpen, handleClickContinue, handleClickReset }) => {

  return (
    <Box
      position="absolute"
      height="100%"
      backgroundColor="rgba(0,0,0,0.75)"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      // justifyContent="center"
      zIndex={5}
      top="0"
      left="0"
    >
      <SlideFade in={editorModalOpen} offsetY="300px">
        <Box
          minHeight="200px"
          m="15rem auto 1rem auto"
          width={['85%', '85%', '70%', '600px']}
          borderRadius={5}
          boxShadow="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          backgroundColor="light.primary">
          <Box>
            <Text p={1} color="dark.secondary">You have a unfinished blog post, what would you like to do?</Text>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              onClick={handleClickContinue}
              _hover={{backgroundColor: 'blue.secondary'}}
              color="light.primary"
              backgroundColor="blue.secondary"
              m={2}>Continue
            </Button>
            <Button
              onClick={handleClickReset}
              _hover={{backgroundColor: 'green.primary'}}
              color="light.primary"
              backgroundColor="green.primary"
              m={2}>
              Start Fresh
            </Button>
          </Box>
        </Box>
      </SlideFade>
    </Box>
  )
};
export default EditorModal;
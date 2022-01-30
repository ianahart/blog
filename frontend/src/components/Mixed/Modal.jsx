import { Box, ScaleFade } from '@chakra-ui/react';

const Modal = ({ children, isOpen }) => {
  return (
    <>
      <ScaleFade initialScale={0.5} in={isOpen}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          position="absolute"
          zIndex="10"
          pt={40}
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundColor="rgba(0,0,0,0.7)"
        >
          {children}
        </Box>
      </ScaleFade>
    </>
  );
};

export default Modal;

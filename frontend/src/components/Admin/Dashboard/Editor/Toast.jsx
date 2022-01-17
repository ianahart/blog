import { Box, Text, Icon } from '@chakra-ui/react';
import { FcCheckmark } from 'react-icons/fc';
import { MdClose } from 'react-icons/md';
import { useEffect, useRef } from 'react';

const Toast = ({ handleCloseToast, message, buttonClicked }) => {
  const removeRef = useRef();
  removeRef.current = handleCloseToast;

  useEffect(() => {
    const duration = 5000;

    const id = setTimeout(() => {
      removeRef.current();
    }, duration);

    return () => clearTimeout(id);
  }, [buttonClicked]);

  return (
    <Box
      minWidth="280px"
      top="-40px"
      width="100%"
      zIndex={10}
      borderRadius={5}
      backgroundColor="rgba(0,0,0,0.65)"
      padding={2}
      position="absolute"
    >
      <Box width="100%">
        <Text
          color="#FFF"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Icon mr={1} as={FcCheckmark}></Icon>
          {message}
          <Icon
            cursor="pointer"
            onClick={handleCloseToast}
            ml={3}
            as={MdClose}
          ></Icon>
        </Text>
      </Box>
    </Box>
  );
};

export default Toast;


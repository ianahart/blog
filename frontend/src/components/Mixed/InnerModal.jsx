import { Box, Button, Text } from '@chakra-ui/react';

const InnerModal = ({
  buttonOne,
  secondaryText,
  closeModal,
  buttonTwo,
  text,
}) => {
  const handleOnClick = (action) => {
    closeModal(false, action);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="250px"
      width={['90%', '90%', '600px']}
      m={1}
      backgroundColor="#FFF"
      borderRadius={8}
      boxShadow="md"
      padding={1}
    >
      <Box textAlign="center" mb={2.5}>
        {secondaryText && <Text color="dark.secondary">{secondaryText}</Text>}
        <Text color="dark.secondary">{text}</Text>
      </Box>
      <Box
        mt={2.5}
        mb={2.5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          onClick={() => handleOnClick(buttonOne)}
          m={1.5}
          width="120px"
          textTransform="capitalize"
          color="#FFF"
          backgroundColor="blue.primaryHover"
        >
          {buttonOne}
        </Button>
        <Button onClick={() => handleOnClick(buttonTwo)} m={1.5} width="120px">
          {buttonTwo}
        </Button>
      </Box>
    </Box>
  );
};
export default InnerModal;

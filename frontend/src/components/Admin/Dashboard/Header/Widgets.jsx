import { Box, Icon } from '@chakra-ui/react';
import { FiMail, FiBell } from 'react-icons/fi';
const Widgets = () => {
  return (
    <Box
      marginLeft="auto"
      display="flex"
      width={["100%", "50%", '100%']}
      justifyContent="flex-end"
      alignItems="center"
    >
      <Icon cursor="pointer" mx={5} fontSize={25} color="gray.secondary" as={FiMail}/>
      <Icon cursor="pointer" mx={5} fontSize={25} color="gray.secondary" as={FiBell}/>
    </Box>
  );
}

export default Widgets;
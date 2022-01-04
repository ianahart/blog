import { Box, Icon } from "@chakra-ui/react";
import { AiOutlineFileDone } from 'react-icons/ai';
const SubmitButton = ({ handleSubmit }) => {


  return (
    <Box display="flex" alignItems="center" onClick={handleSubmit}>
       <Icon mr={0.5} as={AiOutlineFileDone}></Icon>
       Submit Post
    </Box>
  )
}

export default SubmitButton;

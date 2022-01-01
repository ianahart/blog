import { Box, Icon } from '@chakra-ui/react';
import ToolTip from './ToolTip';



const ImageAlignmentButton = ({ icon, type, label, handleClickAlignment }) => {
  return (
    <ToolTip label={label} top="-50px">
      <Box
        onClick={() => handleClickAlignment(type)}
        height="30px"
        width="30px"
        cursor="pointer"
        p={0.5}
        m={1}
        borderRadius={3}
        backgroundColor="light.primary"
        color="dark.primary">
          <Icon as={icon}></Icon>
      </Box>
    </ToolTip>
  );
}
export default ImageAlignmentButton
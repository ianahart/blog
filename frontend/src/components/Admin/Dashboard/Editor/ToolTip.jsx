import { useState } from 'react';
import { Box } from '@chakra-ui/react';

const ToolTip = (props) => {
  const [toolTip, setToolTip] = useState(false);

    const handleOnMouseOver = (e) => {
      setToolTip(true);
    }

    const handleOnMouseLeave = (e) => {
      setToolTip(false)
    }

  return (
    <Box
      position="relative"
      textAlign="center"
      onMouseLeave={handleOnMouseLeave}
      onMouseOver={handleOnMouseOver}>
      {toolTip &&
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={2}
          zIndex="2"
          borderRadius={8}
          fontSize={12}
          minHeight={10}
          boxShadow="sm"
          backgroundColor="dark.secondary"
          minWidth="50px"
          color="#FFF"
          top={props.top}
          right={props.right}
          position="absolute">
          {props.label}
       </Box>
      }
      {props.children}
    </Box>
  )
}

export default ToolTip;
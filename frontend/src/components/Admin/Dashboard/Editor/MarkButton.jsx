import { Box, Button, Icon } from '@chakra-ui/react';
import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import ToolTip from './ToolTip';
import ColorPicker from './ColorPicker';
import { Fragment, useState } from 'react';

const MarkButton = ({ format, icon = null, toolTip, btnStyles, color }) => {
   const editor = useSlate();
   const [isColorPickerShowing, setIsColorPickerShowing] = useState(false);
   const [curColor, setCurColor] = useState('');

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  }

  const toggleMark = (editor, format, color) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      if (format === 'color') {
        Editor.addMark(editor, format, color)
      } else {
         Editor.removeMark(editor, format);
      }
     } else {
      if (format === 'color') {
        Editor.addMark(editor, 'color', color)
      } else {
         Editor.addMark(editor, format, true);
      }
    }
  }

  const toggleColorPicker = () => {
    setIsColorPickerShowing(!isColorPickerShowing);
  }

  const handleColorPick = (color) => {
    setCurColor(color);
    toggleMark(editor, format, color);
    setIsColorPickerShowing(false);
  }

   return (
    <Fragment>
     {
       format !== 'color' ? (
        <ToolTip top={'-45px'} label={toolTip}>
        <Button
           m={2}
           style={isMarkActive(editor, format) ? btnStyles.active : btnStyles.default}
           _hover={{backgroundColor: 'none'}}
           onMouseDown={(e) => toggleMark(editor, format)}>
            <Icon as={icon}></Icon>
         </Button>
       </ToolTip>) : (
          <Box>
            <ColorPicker curColor={curColor} handleColorPick={handleColorPick} isColorPickerShowing={isColorPickerShowing}>
             <Button
               m={2}
               color={curColor}
               textShadow="md"
               _hover={{backgroundColor: 'none'}}
               onClick={toggleColorPicker}
            >
               <Icon as={icon}></Icon>
            </Button>
          </ColorPicker>
         </Box>
      )
     }
    </Fragment>
    );
  }
  export default MarkButton;

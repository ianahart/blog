import { Button, Icon } from '@chakra-ui/react';
import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import ToolTip from './ToolTip';

const MarkButton = ({ format, icon = null, toolTip, btnStyles }) => {
   const editor = useSlate();

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  }

  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
     } else {
      Editor.addMark(editor, format, true);
    }
  }

   return (
     <ToolTip top={'-45px'} label={toolTip}>
      <Button
        m={2}
        style={isMarkActive(editor, format) ? btnStyles.active : btnStyles.default}
        _hover={{backgroundColor: 'none'}}
        onMouseDown={(e) => toggleMark(editor, format)}>
         <Icon as={icon}></Icon>
      </Button>
    </ToolTip>
    );
  }
  export default MarkButton;
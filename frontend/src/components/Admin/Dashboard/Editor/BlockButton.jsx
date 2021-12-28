import { Button, Icon } from '@chakra-ui/react';
import { useSlate } from 'slate-react';
import { Editor, Transforms  } from 'slate';
import ToolTip from './ToolTip';

const BlockButton = ({ format, label = null, icon = null, btnStyles, toolTip }) => {
    const editor = useSlate();
    const LIST_TYPES = ['numbered-list', 'bulleted-list'];

    const toggleBlock = (editor, format) => {
      const isActive = isBlockActive(editor, format)
      const isList = LIST_TYPES.includes(format)

      Transforms.unwrapNodes(editor, {
        match: n =>
          !Editor.isEditor(n) &&
          LIST_TYPES.includes(n.type),
        split: true,
      })

    const newProperties = { type: isActive ? 'paragraph' : isList ? 'list-item' : format, };
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }

  const isBlockActive = (editor, format) => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) && n.type === format,
      })
    )
    return !!match
  }



  return (
    <ToolTip top={'-45px'} label={toolTip}>
      <Button
        m={2}
        style={isBlockActive(editor, format) ? btnStyles.active : btnStyles.default}
        _hover={{backgroundColor: 'none'}}
        onMouseDown={(e) => toggleBlock(editor, format)}>
          { label ? label : <Icon as={icon}></Icon> }
      </Button>
    </ToolTip>
    )
  }
export default BlockButton;

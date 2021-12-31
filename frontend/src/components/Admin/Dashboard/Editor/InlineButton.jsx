import { Button, Icon } from '@chakra-ui/react';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Range  } from 'slate';
import isUrl from 'is-url';
import ToolTip from './ToolTip';

const InlineButton = ({ format, icon, toolTip }) => {
  const editor = useSlate();
  editor.isInline = (el) => ['link'].includes(el.type);

  const isLinkAlreadySelected = (editor) => {
      const [link] = Editor.nodes(editor, {
        match: n =>
          !Editor.isEditor(n) && n.type === 'link',
      });
      return !!link;
  }

  const handleInsertLink = (editor) => {
    if (!editor.selection) return;

    if (isLinkAlreadySelected(editor)) {
      Transforms.unwrapNodes(editor, {
        at: editor.selection,
        match: (n) => n.type === 'link',
      });
      return;
    }

    const isSectionCollapsed = Range.isCollapsed(editor.selection);

    insertLink({
      text: isSectionCollapsed ? prompt('Type in the text for the URL link') : '',
      url:  prompt('Type in the URL for a link'),
      isSectionCollapsed,
      editor,
    });
  }

  const createLinkNode = (url, text) => {
    return {
      type: 'link',
      href: url,
      children: [{ text }]
    }
  }

 const insertLink = ({ editor, url, text, isSectionCollapsed }) => {
    if (!url || !isUrl(url)) return;
    const linkNode = createLinkNode(url, text);

    if (isSectionCollapsed) {
      Transforms.insertNodes(editor, linkNode,
          { at: editor.selection }
        );
    } else {
      Transforms.wrapNodes(editor, linkNode,
        { split: true, at: editor.selection }
      );
      Transforms.collapse(editor, { edge: "end" });
    }
 };

  return (
    <ToolTip top={'-35px'} label={toolTip}>
      <Button m={2} onMouseDown={() => handleInsertLink(editor)}>
        <Icon as={icon}></Icon>
      </Button>
    </ToolTip>
  )
}

export default InlineButton;
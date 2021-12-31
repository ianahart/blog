import { Button, Icon } from '@chakra-ui/react';
import { ReactEditor, useSlate } from 'slate-react';
import { Editor, Transforms, Range  } from 'slate';
import isUrl from 'is-url';

const InlineButton = ({ format, icon }) => {
  const editor = useSlate();
  editor.isInline = (el) => ['link'].includes(el.type);

  const isLinkAlreadySelected = (editor, parentNode) => {

    return !!Editor.above(editor, {
      at: editor.selection,
      match: (n) => {
        const nestedLink = parentNode?.children.find(node => node?.type === 'link')?.type;
        const childNode = n.type === undefined ?  nestedLink : n.type;
        return Editor.isEditor && childNode === 'link';
      }
    });
  }

  const handleInsertLink = (editor) => {
    if (!editor.selection) return;
    const [parentNode, parentPath] = Editor.parent(
      editor,
      editor.selection.focus?.path
    );

    if (isLinkAlreadySelected(editor, parentNode)) {
      Transforms.unwrapNodes(editor, {
        at: editor.selection,
        match: (n) => Editor.isEditor && n.type === 'link',
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
    <Button m={2} onMouseDown={() => handleInsertLink(editor)}>
      <Icon as={icon}></Icon>
    </Button>
  )
}

export default InlineButton;
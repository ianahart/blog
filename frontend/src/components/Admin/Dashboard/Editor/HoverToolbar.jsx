import { useRef, useEffect } from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import { Editor, Range } from 'slate';
import MarkButton from './MarkButton';
import {
  AiOutlineUnderline,
  AiOutlineBold,
  AiOutlineItalic,
} from 'react-icons/ai';
import { Box } from '@chakra-ui/react';

const HoverToolbar = ({ paperRef }) => {
  const btnStyles = {
    active: {
      backgroundColor: '#048BA8',
      color: '#FFF',
      width: '20px',
      height: '25px',
    },
    default: {
      backgroundColor: '#EDF2F7',
      color: '#686D76',
      width: '20px',
      height: '25px',
    },
  };
  const ref = useRef();
  const editor = useSlate();
  const { selection } = editor;
  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    }
    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = '1';
    el.style.top = `${
      rect.top + paperRef.current.scrollTop - el.offsetHeight - 300
    }px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });
  return (
    <Box
      ref={ref}
      boxShadow="md"
      borderRadius="8px"
      width="175px"
      zIndex="5"
      position="absolute"
      display="flex"
      margin-top="-6px"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.7)"
      top="-10000px"
      left="-10000px"
      opacity="0"
      transition="opacity 0.75s"
    >
      <MarkButton
        btnStyles={btnStyles}
        format="bold"
        icon={AiOutlineBold}
        toolTip="Bold Text"
      />
      <MarkButton
        btnStyles={btnStyles}
        format="italic"
        icon={AiOutlineItalic}
        toolTip="Italic Text"
      />
      <MarkButton
        btnStyles={btnStyles}
        format="underline"
        icon={AiOutlineUnderline}
        toolTip="Underline Text"
      />
    </Box>
  );
};

export default HoverToolbar;

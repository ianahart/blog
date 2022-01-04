
import {Box, Icon } from '@chakra-ui/react';
import { useContext, useMemo, useCallback, useState, useEffect } from 'react';
import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact} from 'slate-react';
import { FaParagraph } from 'react-icons/fa';
import { BiFullscreen, BiExitFullscreen, BiCodeAlt, BiFontColor } from 'react-icons/bi';
import { AiOutlineOrderedList, AiOutlinePicture, AiOutlineLink, AiOutlineUnorderedList, AiOutlineBold,AiOutlineUnderline,AiOutlineItalic,AiOutlineFileText} from 'react-icons/ai';


import apiRequest from '../../../../services/apiRequest';
import { AuthContext } from '../../../../contexts/AuthContext';
import Toolbar from './Toolbar';
import BlockButton from './BlockButton';
import MarkButton from './MarkButton';
import InlineButton from './InlineButton';
import WordCountButton from './WordCountButton';
import ImageButton from './ImageButton';
import Element from './Element';
import Leaf from './Leaf';
import ToolTip from './ToolTip';
import EditorModal from './EditorModal';

 const BlogEditor = () => {
    const { user } = useContext(AuthContext);
    const editor = useMemo(() => withReact(createEditor()), []);
    const renderElement = useCallback(props => <Element {...props}/>,[]);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const [fullScreen, setFullScreen] = useState(false);
    const [count, setCount] = useState({ words: 0, chars: 0 });
    const [editorModalOpen, setEditorModalOpen] = useState(false);
    const initialEditorState = [
    {
      type: 'paragraph',
      children: [{ text: ' ' }],
    },
  ];
  const [value, setValue] = useState(JSON.parse(localStorage.getItem('editor')) || initialEditorState);

  const btnStyles = {
    active: { backgroundColor: '#048BA8', color: '#FFF' },
    default: { backgroundColor: '#EDF2F7', color: '#686D76' }
  };

  const screenStyles = {
        cursor:'pointer',
        height:'24px',
        color:'#FFF',
        width:'24px'
  }

  const handleSaveEditor = (value) => {
    setValue(value);
  }

  const handleSubmit = async () => {
    try {
      const response =  await apiRequest('/api/v1/posts/',  { post: value }, 'POST', null);
      console.log(response)
      // TO CHECK IF DATA IS STILL IN RIGHT STRUCTURE
      //  localStorage.setItem('editor', JSON.stringify(response.data.post));



    } catch(e) {
      console.log(e);
    }
  }

  const handleSetCount = (count) => {
    setCount(count);
  }

  const enterFullScreen = () => {
    setFullScreen(true);
  };

  const exitFullScreen = () => {
    setFullScreen(false);
  }


  useEffect(() => {
    const prevEditor = localStorage.getItem('editor');
    if (!prevEditor) {
      return;
    }
    setEditorModalOpen(true);
  }, [setEditorModalOpen]);

  const handleClickContinue = () => {
    setEditorModalOpen(false);
  };

  const handleClickReset = () => {
    setEditorModalOpen(false)
    localStorage.removeItem('editor');
    setValue(initialEditorState);
    Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
    });
  };

  return (
    <Box
      mt={fullScreen || editorModalOpen ? 0 : 20}
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      position="relative"
    >
    {editorModalOpen &&
      <EditorModal
         handleClickContinue={handleClickContinue}
         handleClickReset={handleClickReset}
         editorModalOpen={editorModalOpen}
      />
    }
      <Box
        backgroundColor="#FFF"
        transition="all 0.5s ease-in-out"
        transform={ fullScreen ? 'scale(1)': 'scale(1)'}
        mb={3}
        minHeight={fullScreen ? '100vh' : '400px'}
        width={fullScreen ? '100%' : ['90%', '90%', '600px']}
        minWidth={['90%', '90%', '750px']}
        borderLeft={ fullScreen ? '1px solid #e4e6eb': 'none'}
        borderRadius={5}
      >
         <Slate
           editor={editor}
           value={value}
           onChange={newValue => setValue(newValue)}
         >
         <ToolTip top={'-45px'} right={0} label={fullScreen ? 'Minimize' : 'Fullscreen'}>
           <Box
            width="100%"
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            display="flex"
            p={2}
            justifyContent="flex-end"
            alignItems="center"
            backgroundColor="blue.secondary"
            height="40px">
            {fullScreen ? (   <Icon
              onClick={exitFullScreen}
              style={screenStyles}
              as={BiExitFullscreen}>
           </Icon>) : (   <Icon
              onClick={enterFullScreen}
              style={screenStyles}
              as={BiFullscreen}>
           </Icon>)}
          </Box>
         </ToolTip>
          <Toolbar handleSubmit={handleSubmit} handleSaveEditor={handleSaveEditor} editorValue={value}>
            <BlockButton btnStyles={btnStyles} format="heading-one"   label="h1" toolTip="3XL"/>
            <BlockButton btnStyles={btnStyles} format="heading-two"   label="h2" toolTip="2XL"/>
            <BlockButton btnStyles={btnStyles} format="heading-three" label="h3" toolTip="XL"/>
            <BlockButton btnStyles={btnStyles} format="heading-four"  label="h4" toolTip="LG"/>
            <BlockButton btnStyles={btnStyles} format="heading-five"  label="h5" toolTip="MD"/>
            <BlockButton btnStyles={btnStyles} format="heading-six"   label="h6" toolTip="SM"/>
            <BlockButton btnStyles={btnStyles} format="numbered-list" icon={AiOutlineOrderedList} toolTip="Numbered List" />
            <BlockButton btnStyles={btnStyles} format="bulleted-list" icon={AiOutlineUnorderedList} toolTip="Bulleted List"/>
            <BlockButton btnStyles={btnStyles} format="paragraph"     icon={FaParagraph}  toolTip="Paragraph"/>
            <MarkButton  btnStyles={btnStyles} format="bold"          icon={AiOutlineBold} toolTip="Bold Text"/>
            <MarkButton  btnStyles={btnStyles} format="italic"        icon={AiOutlineItalic} toolTip="Italic Text"/>
            <MarkButton  btnStyles={btnStyles} format="underline"     icon={AiOutlineUnderline} toolTip="Underline Text"/>
            <MarkButton  btnStyles={btnStyles} format="color"       icon={BiFontColor} toolTip="Font Color"/>
            <MarkButton  btnStyles={btnStyles} format="code"        icon={BiCodeAlt} toolTip="Code Block"/>
            <InlineButton format="link" icon={AiOutlineLink} toolTip="Link"></InlineButton>
            <ImageButton btnStyles={btnStyles} format="image" icon={AiOutlinePicture} toolTip="Image"></ImageButton>
            <WordCountButton count={count} handleSetCount={handleSetCount} icon={AiOutlineFileText} toolTip="Word Count" />
          </Toolbar>
          <Box
            height="2px"
            width="100%"
            backgroundColor="gray.outline"
            mb={3}
          >
          </Box>
          <Box p={3}>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
            />
          </Box>
         </Slate>
      </Box>
    </Box>
  );
}

export default BlogEditor;


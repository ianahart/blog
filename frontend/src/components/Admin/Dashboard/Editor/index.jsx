
import {Box, Link, Heading, Icon, Text, ListItem, OrderedList, UnorderedList } from '@chakra-ui/react';
import { /** useContext,  */ useMemo, useCallback, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { FaParagraph } from 'react-icons/fa';
import { BiFullscreen, BiExitFullscreen, BiCodeAlt, BiFontColor } from 'react-icons/bi';
import { AiOutlineOrderedList, AiOutlinePicture, AiOutlineLink, AiOutlineUnorderedList, AiOutlineBold,AiOutlineUnderline,AiOutlineItalic,AiOutlineFileText} from 'react-icons/ai';
// import { AuthContext } from '../../../../contexts/AuthContext';
import Toolbar from './Toolbar';
import BlockButton from './BlockButton';
import MarkButton from './MarkButton';
import InlineButton from './InlineButton';
import WordCountButton from './WordCountButton';
import ImageButton from './ImageButton';
import ImageElement from './ImageElement';
import ToolTip from './ToolTip';

 const BlogEditor = () => {
    // const { user } = useContext(AuthContext);
    const editor = useMemo(() => withReact(createEditor()), []);
    const renderElement = useCallback(props => <Element {...props}/>,[]);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const [fullScreen, setFullScreen] = useState(false);
    const [count, setCount] = useState({ words: 0, chars: 0 });
    const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Start writing a new blog post.' }],
    },

    {
      type: 'image',
      url: '/images/coding.jpeg',
      // caption: 'coding',
      children: [{ text: '' }],
    },
    {
      type: 'paragraph',
      children: [{text:'some text after the image to keep document flowing'}],
    }
  ]);

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


  /** Render Elements */
  const Element = ({ attributes, children, element }) => {

    switch (element.type) {
      case 'link':
        return <Link as="a" onClick={() => { window.open(element.href, '_blank') }} color="blue" textDecoration="underline" href={element.href}  {...attributes}>{children}</Link>
      case 'paragraph':
        return <Text as="p"  {...attributes}>{children}</Text>
      case 'heading-one':
       return <Heading as="h1" size="3xl" {...attributes}>{children}</Heading>
      case 'heading-two':
        return <Heading as="h2" size="2xl" {...attributes}>{children}</Heading>
      case 'heading-three':
        return <Heading as="h3" size="xl" {...attributes}>{children}</Heading>
      case 'heading-four':
        return <Heading as="h4" size="lg" {...attributes}>{children}</Heading>
      case 'heading-five':
        return <Heading as="h5" size="md" {...attributes}>{children}</Heading>
      case 'heading-six':
        return <Heading as="h6" size="sm" {...attributes}>{children}</Heading>
      case 'list-item':
        return <ListItem {...attributes}>{children}</ListItem>
      case 'numbered-list':
        return <OrderedList {...attributes}>{children}</OrderedList>
      case 'bulleted-list':
        return <UnorderedList {...attributes}>{children}</UnorderedList>
      case 'image':
        return <ImageElement
              attributes={attributes}
              children={children}
              element={element}>
          </ImageElement>
      default:
        return <Text as="p" {...attributes}>{children}</Text>
    }
  }

  const Leaf = ({ attributes, children , leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
    if (leaf.code) {
      children = <code>{children}</code>
    }
    if (leaf.italic) {
      children = <em>{children}</em>
    }
    if (leaf.underline) {
      children = <u>{children}</u>
    }
    if (leaf.color) {
      children = <span>{children}</span>
    }
      return <span style={{color: leaf.color}} {...attributes}>{children}</span>
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


  return (
    <Box
      mt={fullScreen ? 0 : 20}
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
    >
      <Box
        backgroundColor="#FFF"
        transition="all 0.5s ease-in-out"
        transform={ fullScreen ? 'scale(1)': 'scale(1)'}
        minHeight={fullScreen ? '100vh' : '400px'}
        width={fullScreen ? '100%' : ['90%', '90%', '600px']}
        minWidth={['90%', '90%', '600px']}
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
          <Toolbar>
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
          <Box pl={5}>
            <Text m={0} as="p" color="dark.secondary">
              Words:
              <Box fontWeight="bold" as="span"> {count.words}</Box>
            </Text>
            <Text m={0} as="p" color="dark.secondary">
              Chars:
              <Box fontWeight="bold" as="span"> {count.chars}</Box>
            </Text>
          </Box>
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


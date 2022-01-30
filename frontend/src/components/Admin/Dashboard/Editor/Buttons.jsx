import BlockButton from './BlockButton.jsx';
import MarkButton from './MarkButton.jsx';
import ImageButton from './ImageButton.jsx';
import InlineButton from './InlineButton.jsx';
import WordCountButton from './WordCountButton.jsx';

import { FaParagraph } from 'react-icons/fa';
import { BiCodeAlt, BiFontColor } from 'react-icons/bi';
import {
  AiOutlineOrderedList,
  AiOutlinePicture,
  AiOutlineLink,
  AiOutlineUnorderedList,
  AiOutlineBold,
  AiOutlineUnderline,
  AiOutlineItalic,
  AiOutlineFileText,
} from 'react-icons/ai';

const Buttons = ({ handleCountText, count }) => {
  const btnStyles = {
    active: { backgroundColor: '#048BA8', color: '#FFF' },
    default: { backgroundColor: '#EDF2F7', color: '#686D76' },
  };
  return (
    <>
      <BlockButton
        btnStyles={btnStyles}
        format="heading-one"
        label="h1"
        toolTip="3XL"
      />
      <BlockButton
        btnStyles={btnStyles}
        format="heading-two"
        label="h2"
        toolTip="2XL"
      />
      <BlockButton
        btnStyles={btnStyles}
        format="heading-three"
        label="h3"
        toolTip="XL"
      />
      <BlockButton
        btnStyles={btnStyles}
        format="heading-four"
        label="h4"
        toolTip="LG"
      />
      <BlockButton
        btnStyles={btnStyles}
        format="heading-five"
        label="h5"
        toolTip="MD"
      />
      <BlockButton
        btnStyles={btnStyles}
        format="heading-six"
        label="h6"
        toolTip="SM"
      />
      <BlockButton
        btnStyles={btnStyles}
        format="numbered-list"
        icon={AiOutlineOrderedList}
        toolTip="Numbered List"
      />
      <BlockButton
        btnStyles={btnStyles}
        format="bulleted-list"
        icon={AiOutlineUnorderedList}
        toolTip="Bulleted List"
      />
      <BlockButton
        btnStyles={btnStyles}
        format="paragraph"
        icon={FaParagraph}
        toolTip="Paragraph"
      />
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
      <MarkButton
        btnStyles={btnStyles}
        format="color"
        icon={BiFontColor}
        toolTip="Font Color"
      />
      <MarkButton
        btnStyles={btnStyles}
        format="code"
        icon={BiCodeAlt}
        toolTip="Code Block"
      />
      <InlineButton
        format="link"
        icon={AiOutlineLink}
        toolTip="Link"
      ></InlineButton>
      <ImageButton
        btnStyles={btnStyles}
        format="image"
        icon={AiOutlinePicture}
        toolTip="Image"
      ></ImageButton>
      <WordCountButton
        count={count}
        handleCountText={handleCountText}
        icon={AiOutlineFileText}
        toolTip="Word Count"
      />
    </>
  );
};

export default Buttons;

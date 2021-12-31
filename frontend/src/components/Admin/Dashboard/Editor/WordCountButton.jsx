import { Button, Icon } from '@chakra-ui/react';
import { useSlate } from 'slate-react';
import ToolTip from './ToolTip';

  const WordCountButton = ({ count, handleSetCount, icon, toolTip }) => {
    const editor = useSlate();

    const countText = (editor, e) => {
      const curCount = {words: 0, chars: 0};
      const { children } = editor;

      children.forEach((child) => {
          const counts = child.children.reduce((acc, cur)=> {
          let text = child.type.includes('-list') || cur.type?.includes('link') ? cur.children[0].text : cur.text;
          acc.words += text.split(' ').filter((word) => word !== '').length;
          acc.chars += text.replace(' ', '').trim().length;
          return acc;
          }, { words: 0, chars: 0 });
        curCount.words += counts.words
        curCount.chars += counts.chars
        handleSetCount({...count, ...{ words: curCount.words, chars: curCount.chars }});
      });
    }

    return (
      <ToolTip top={'-45px'} label={toolTip}>
        <Button backgroundColor="#EDF2F7" color="#686D76" onClick={(e) => countText(editor, e)}>
          <Icon as={icon}></Icon>
        </Button>
      </ToolTip>
    );
  }
export default WordCountButton;
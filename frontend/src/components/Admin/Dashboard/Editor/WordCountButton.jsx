import { Fragment } from 'react';
import { Box, Button, Icon, Text } from '@chakra-ui/react';
import { useSlate } from 'slate-react';
import ToolTip from './ToolTip';

  const WordCountButton = ({ count, handleCountText, icon, toolTip }) => {
    const editor = useSlate();

    return (
      <Fragment>
        <ToolTip top={'-45px'} label={toolTip}>
          <Button backgroundColor="#EDF2F7" color="#686D76" onClick={(e) => handleCountText(editor, e)}>
            <Icon as={icon}></Icon>
          </Button>
        </ToolTip>
        <Box flexBasis="100%" pl={5}>
          <Text m={0} as="p" color="dark.secondary">
            Words:
            <Box fontWeight="bold" as="span"> {count.words}</Box>
          </Text>
          <Text m={0} as="p" color="dark.secondary">
            Chars:
            <Box fontWeight="bold" as="span"> {count.chars}</Box>
          </Text>
        </Box>
      </Fragment>
    );
  }
export default WordCountButton;
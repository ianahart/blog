import { Box } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import Element from '../Admin/Dashboard/Editor/Element';
import Leaf from '../Admin/Dashboard/Editor/Leaf';
import PostHeader from './PostHeader';

const Contents = ({ post, value, handleEditorChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <>
      {value.length && post ? (
        <Box
          width="90%"
          margin="0 auto"
          flexDirection="column"
          maxHeight="100vh"
          overflowY="auto"
          css={{
            '&::-webkit-scrollbar': {
              width: 0,
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-track': {
              width: 0,
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'transparent',
              borderRadius: '24px',
            },
          }}
          borderRadius={8}
          backgroundColor="#FFF"
        >
          <PostHeader post={post} />
          <Slate
            value={value}
            editor={editor}
            onChange={(newValue) => handleEditorChange(newValue)}
          >
            <Box display="flex" width="100%" borderRadius={8} p={3}>
              <Editable
                readOnly
                renderElement={renderElement}
                renderLeaf={renderLeaf}
              />
            </Box>
          </Slate>
        </Box>
      ) : (
        <Box>Loading</Box>
      )}
    </>
  );
};

export default Contents;

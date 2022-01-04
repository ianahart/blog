import {Box } from '@chakra-ui/react';
import { useContext, useCallback, useMemo, useState } from 'react';
// import apiRequest from '../../../../services/apiRequest';
// import BackLink from '../BackLink';
import { AuthContext } from '../../../../contexts/AuthContext';
import { createEditor } from 'slate';
import { Slate, Editable, withReact} from 'slate-react';
import Element from '../Editor/Element';
import Leaf from '../Editor/Leaf';


const AdminPost = () => {
  const { user } = useContext(AuthContext);
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(props => <Element {...props}/>,[]);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const initialEditorState = [
    {
      type: 'paragraph',
      children: [{ text: 'this post will come from database' }],
    },
  ];
  // null === post from database
  //  const [value, setValue] = useState(null);

  const [value, setValue] = useState(JSON.parse(localStorage.getItem('editor')) || initialEditorState);

  return (
    <Slate
      value={value}
      editor={editor}
      onChange={newValue => setValue(newValue)}
    >
      <Box
        width="400px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="1px solid blue"
        p={3}>
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Box>
    </Slate>
  );
}

export default AdminPost;



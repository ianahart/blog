import SubmitButton from "./SubmitButton";
import SaveButton from "./SaveButton";
import { BiChevronDown } from 'react-icons/bi';
import { useSlate } from "slate-react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
const EditorMenu = ({ editorValue, handleCountText, handleSaveEditor, handleSubmit }) => {
  const editor = useSlate();

  return (
    <Menu onOpen={(e) => handleCountText(editor, e)}>
      <MenuButton backgroundColor="#f9f9f9" as={Button} rightIcon={<BiChevronDown />}>
        File
      </MenuButton>
      <MenuList>
        <MenuItem>
          <SaveButton editorValue={editorValue} handleSaveEditor={handleSaveEditor} />
        </MenuItem>
        <MenuItem>
          <SubmitButton handleSubmit={handleSubmit} />
        </MenuItem>
      </MenuList>
    </Menu>
  )
};

export default EditorMenu;

import SubmitButton from "./SubmitButton";
import SaveButton from "./SaveButton";
import { BiChevronDown, BiSave } from 'react-icons/bi';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
const EditorMenu = ({ editorValue, handleSaveEditor, handleSubmit }) => {
  return (
    <Menu>
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

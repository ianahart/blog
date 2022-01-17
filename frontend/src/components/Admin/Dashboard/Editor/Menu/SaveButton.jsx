import { Box, Collapse, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import Toast from '../Toast';
import { BiSave } from 'react-icons/bi';

const SaveButton = ({ editorValue, handleSaveEditor }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClickSave = (e) => {
    e.stopPropagation();
    localStorage.setItem('editor', JSON.stringify(editorValue));
    const savedEditor = JSON.parse(localStorage.getItem('editor'));
    handleSaveEditor(savedEditor);
    setButtonClicked(true);
  };

  const handleCloseSaveToast = () => {
    setButtonClicked(false);
  };

  return (
    <Box position="relative" width="100%">
      <Collapse in={buttonClicked} animateOpacity>
        <Toast
          handleCloseToast={handleCloseSaveToast}
          buttonClicked={buttonClicked}
          message="Your current post has been saved!"
        />
      </Collapse>
      <Box display="flex" alignItems="center" onClick={handleClickSave}>
        <Icon mr={0.5} as={BiSave}></Icon>
        Save
      </Box>
    </Box>
  );
};

export default SaveButton;


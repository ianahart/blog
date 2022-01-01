import { Button, Box, Collapse } from '@chakra-ui/react';
import { useState } from 'react';
import Toast from './Toast';

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
  }

  return (
    <Box position="relative" width="100%">
      <Collapse in={buttonClicked} animateOpacity>
        <Toast
          handleCloseSaveToast={handleCloseSaveToast}
          buttonClicked={buttonClicked}
        />
      </Collapse>
      <Button
        onClick={handleClickSave}
        _hover={{color: 'dark.secondary'}}
        m={1}
        backgroundColor="blue.secondary"
        color="#FFF">
        Save
      </Button>
    </Box>
  )
}

export default SaveButton;
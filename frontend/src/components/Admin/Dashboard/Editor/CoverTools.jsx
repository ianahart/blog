import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import CoverTool from './CoverTool';
const CoverTools = ({ coverImage, title, handleSetCoverImage, handleSetTitle}) => {
  const [fileSize, setFileSize] = useState(0);
  const [isTitleInputOpen, setIsTitleOpen] = useState(false);

  const handleImageOnChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileSize(file.size);

    if (file.size > 2000000) {
      return;
    }
    handleSetCoverImage(file);
    setFileSize(0);
  }

  const handleTitleOnChange = (e) => {
    handleSetTitle(e.target.value);
  }

  const openTitleInput = () => {
    setIsTitleOpen(true);
  }

  return (
        <Box mt="0.5rem" mb={['1rem', '1rem', 'auto']}>
          <Box onClick={openTitleInput}>
            <CoverTool
              label="Post Title"
              stateValue={title}
              iconAdd={IoMdAdd}
              iconRemove={AiOutlineCloseCircle}
              handleStateValue={handleSetTitle}
            />
          </Box>
          {isTitleInputOpen &&
            <Box
              zIndex={5}
              backgroundColor="rgba(0,0,0,0.75)"
              position="absolute"
              top="-100px"
              boxShadow="md"
              p={1}
              pt="2rem"
              left={['30px', '30px', '30px']}
              minHeight="120px"
              minWidth={['80%', '350px', '350px']}
              borderRadius="5px">
              <Input mb={3} onChange={handleTitleOnChange} backgroundColor="#FFF" placeholder="Title of post" />
              <Button m={1} onClick={() => setIsTitleOpen(false)} >Add</Button>
              <Button m={1} onClick={() => setIsTitleOpen(false)}>Cancel</Button>
            </Box>
          }
          <Box cursor="pointer" position="relative">
            {!coverImage &&
            <form encType="multipart/form-data">
              <Input
                type="file"
                multiple
                cursor="pointer"
                accept="image/png, image/jpeg"
                name="file"
                onChange={handleImageOnChange}
                position="absolute"
                opacity={0}
                top={0}
                lef={0}
                width="100%"
                height="100%"
              />
            </form>
            }
            <CoverTool
                label="Cover Image"
                iconAdd={IoMdAdd}
                stateValue={coverImage}
                iconRemove={AiOutlineCloseCircle}
                handleStateValue={handleSetCoverImage}
              />
            <Text fontSize="12px" color="dark.secondary">{ fileSize > 2000000 ? 'The file is too large max: 2mb' : ''}</Text>
          </Box>
        </Box>
  );
};

export default CoverTools;
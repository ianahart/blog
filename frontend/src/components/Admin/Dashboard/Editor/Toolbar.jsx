import { Box, Collapse, Icon, Text } from "@chakra-ui/react";
import { BsArrowsCollapse } from 'react-icons/bs';
import { AiOutlineTool, AiOutlineExclamationCircle } from 'react-icons/ai';
import { useState } from "react";
import ToolTip from "./ToolTip";
import CoverTools from "./CoverTools";
import EditorMenu from "./Menu";

const Toolbar = ({
    children,
    editorValue,
    submitError,
    handleSaveEditor,
    handleCountText,
    handleSubmit,
    coverImage,
    title,
    handleSetCoverImage,
    handleLSInsert,
    handleSetTitle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const iconStyles = {
    cursor: 'pointer',
    color: '#8d8d8f',
    margin: '1rem',
    width: '24px',
    height: '24px',
  };

  return (
    <Box>
      <Box m={1} display="flex" alignItems="center" justifyContent="space-between">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start">
          <Box my={3}>
            {submitError &&
            <Box display="flex" alignItems="center">
               <Icon mr={1.5} color="red" height="18px" as={AiOutlineExclamationCircle} />
               <Text fontWeight="600" fontSize="12px" color="validationError.primary">{submitError}</Text>
            </Box>}
          </Box>
          <EditorMenu
            editorValue={editorValue}
            handleSubmit={handleSubmit}
            handleCountText={handleCountText}
            handleSaveEditor={handleSaveEditor} />
        </Box>
        {isCollapsed ?
          (
            <ToolTip top="-60px" label="Show Toolbar">
              <Icon
                onClick={() => setIsCollapsed(false)}
                mr={1}
                style={iconStyles}
                as={AiOutlineTool}>
              </Icon>
            </ToolTip>
          ) :
          (
            <ToolTip top="-60px" label="Collapse Toolbar">
              <Icon
                onClick={() => setIsCollapsed(true)}
                style={iconStyles}
                as={BsArrowsCollapse}>
              </Icon>
            </ToolTip>
          )
        }
      </Box>
      <Collapse in={!isCollapsed}>
        <Box
          position="relative"
          p={2}
          display="flex"
          flexDirection={['column', 'column', 'row']}
          alignItems="center"
          justifyContent="space-between">
          <CoverTools
            handleLSInsert={handleLSInsert}
            coverImage={coverImage}
            title={title}
            handleSetCoverImage={handleSetCoverImage}
            handleSetTitle={handleSetTitle}
          />
          <Box
            maxWidth="900px" p={0.5}
            borderRadius="5px"
            backgroundColor="#f9f9f9"
            display="flex"
            width={['100%', '90%', '70%']}
            flexWrap="wrap"
            alignItems="center">
            { children }
          </Box>
       </Box>
     </Collapse>
    </Box>
  );
}

export default Toolbar;
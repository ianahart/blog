import { Box, Collapse, Icon } from "@chakra-ui/react";
import { BsArrowsCollapse } from 'react-icons/bs';
import { AiOutlineTool } from 'react-icons/ai';
import { useState } from "react";
import ToolTip from "./ToolTip";
import CoverTools from "./CoverTools";
import EditorMenu from "./Menu";

const Toolbar = ({ children, editorValue, handleSaveEditor, handleSubmit }) => {
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
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          <EditorMenu
            editorValue={editorValue}
            handleSubmit={handleSubmit}
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
        <Box p={2} display="flex" flexDirection={['column', 'column', 'row']} alignItems="center" justifyContent="space-between">
          <CoverTools />
          <Box display="flex" width={['100%', '90%', '70%']} flexWrap="wrap" alignItems="center">
            { children }
          </Box>
       </Box>
     </Collapse>
    </Box>
  );
}

export default Toolbar;
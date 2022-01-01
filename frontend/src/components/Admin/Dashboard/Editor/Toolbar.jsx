import { Box, Collapse, Icon } from "@chakra-ui/react";
import { BsArrowsCollapse } from 'react-icons/bs';
import { AiOutlineTool } from 'react-icons/ai';
import { useState } from "react";
import SaveButton from "./SaveButton";
import SubmitButton from "./SubmitButton";
import ToolTip from "./ToolTip";

const Toolbar = ({ children, editorValue, handleSaveEditor }) => {
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
          <SaveButton handleSaveEditor={handleSaveEditor} editorValue={editorValue} />
          <SubmitButton />
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
        <Box display="flex" flexWrap="wrap" alignItems="center" p={2}>
          { children }
        </Box>
      </Collapse>
    </Box>
  );
}

export default Toolbar;
import { Box, Icon, Tooltip, Button } from '@chakra-ui/react';
import { BsCheckSquare, BsTrash, BsSearch } from 'react-icons/bs';

const Actions = () => {
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <Tooltip
        backgroundColor="green.primary"
        label="Mark as read"
        aria-label="mark as read tooltip"
      >
        <Box mx={2} cursor="pointer" as="span">
          <Icon layerStyle="iconBtn" color="dark.secondary" as={BsCheckSquare} />
        </Box>
      </Tooltip>
      <Tooltip
        backgroundColor="green.primary"
        label="Filter by sender"
        aria-label="filter messages by name tooltip"
      >
        <Box mx={2} cursor="pointer" as="span">
          <Icon layerStyle="iconBtn" color="dark.secondary" as={BsSearch} />
        </Box>
      </Tooltip>

      <Tooltip
        backgroundColor="green.primary"
        label="Delete message"
        aria-label="delete message tooltip"
      >
        <Box mx={2} cursor="pointer" as="span">
          <Icon layerStyle="iconBtn" color="dark.secondary" as={BsTrash} />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default Actions;

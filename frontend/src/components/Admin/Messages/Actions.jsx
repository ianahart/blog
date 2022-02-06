import { Box, Icon, Tooltip } from '@chakra-ui/react';
import { BsCheckSquare, BsTrash, BsSearch } from 'react-icons/bs';

const Actions = ({ massAction }) => {
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <Tooltip
        backgroundColor="green.primary"
        label="Mark as read"
        aria-label="mark as read tooltip"
      >
        <Box onClick={() => massAction('mark_as_read')} mx={2} cursor="pointer" as="span">
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
        label="Delete messages"
        aria-label="delete message tooltip"
      >
        <Box onClick={() => massAction('delete')} mx={2} cursor="pointer" as="span">
          <Icon layerStyle="iconBtn" color="dark.secondary" as={BsTrash} />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default Actions;

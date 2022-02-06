import { Box, Icon, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';
import { BsCheckSquare, BsTrash, BsSearch } from 'react-icons/bs';
import Filter from './Filter.jsx';

const Actions = ({ resetFilter, searchFilter, massAction, filterSender }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleOnClick = () => {
    setIsFilterOpen((prevState) => !prevState);
    resetFilter();
  };

  return (
    <Box>
      <Box mb={1.5} display="flex" justifyContent="flex-end" alignItems="center">
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
          <Box onClick={handleOnClick} mx={2} cursor="pointer" as="span">
            <Icon layerStyle="iconBtn" color={isFilterOpen ? '#16db93' : '#686d76'} as={BsSearch} />
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
      {isFilterOpen && <Filter searchFilter={searchFilter} filterSender={filterSender} />}
    </Box>
  );
};

export default Actions;

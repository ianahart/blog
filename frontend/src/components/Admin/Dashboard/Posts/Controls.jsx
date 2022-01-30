import { Box, Icon } from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';

const Controls = ({ openModal }) => {
  const containerStyles = {
    cursor: 'pointer',
    margintop: '1.5rem',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
  };
  const iconStyles = {
    color: '#686d76',
    width: '30px',
    height: '30px',
  };

  const handleOnClick = (action) => {
    openModal(true, action);
  };

  return (
    <Box width="100%">
      <Box
        mt={10}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mr={1.5}
      >
        <Box
          onClick={() => handleOnClick('edit')}
          style={containerStyles}
          _hover={{
            backgroundColor: 'rgba(22,219,147,0.2)',
            borderRadius: '50%',
          }}
        >
          <Icon
            style={iconStyles}
            _hover={{ color: '#16DB93' }}
            as={AiOutlineEdit}
          />
        </Box>
        <Box
          onClick={() => handleOnClick('delete')}
          style={containerStyles}
          _hover={{
            backgroundColor: 'rgba(176,64,64,0.2)',
            borderRadius: '50%',
          }}
        >
          <Icon
            style={iconStyles}
            _hover={{ color: '#B04040' }}
            as={AiOutlineDelete}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Controls;

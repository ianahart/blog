import { Box, Icon } from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';

const Controls = ({ openModal }) => {
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
          layerStyle="iconContainer"
          _hover={{
            backgroundColor: 'rgba(22,219,147,0.2)',
          }}
        >
          <Icon
            layerStyle="iconBtn"
            _hover={{ color: '#16DB93' }}
            color="dark.secondary"
            as={AiOutlineEdit}
          />
        </Box>
        <Box
          onClick={() => handleOnClick('delete')}
          layerStyle="iconContainer"
          _hover={{
            backgroundColor: 'rgba(176,64,64,0.2)',
            borderRadius: '50%',
          }}
        >
          <Icon
            layerStyle="iconBtn"
            _hover={{ color: '#B04040' }}
            color="dark.secondary"
            as={AiOutlineDelete}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Controls;

import { Box, Icon, Text } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { AiFillTag } from 'react-icons/ai';
const TagsTool = ({ openTagsTool, tags }) => {
  const iconStyles = {
    cursor: 'pointer',
    marginRight: '0.25rem',
    color: '#9f9fa3',
    width: '24px',
    height: '24px',
  };
  const containerStyles = {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };
  const buttonTextStyles = {
    fontWeight: 'bold',
    color: '#686D76',
    textAlign: 'left',
  };

  return (
    <Box onClick={openTagsTool} mt={1.5} style={containerStyles}>
      <Icon style={iconStyles} as={tags.length === 3 ? AiFillTag : IoMdAdd} />
      <Text style={buttonTextStyles}>Tags({tags.length})</Text>
    </Box>
  );
};

export default TagsTool;

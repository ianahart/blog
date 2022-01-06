import { Box, Text, Icon } from '@chakra-ui/react';

const CoverTool = ({ iconAdd, iconRemove, label, stateValue, handleStateValue }) => {

  const iconStyles = { cursor:'pointer', marginRight: '0.25rem', color: '#9f9fa3', width: '24px', height: '24px' };
  const containerStyles = { cursor: 'pointer', display: 'flex', alignItems: 'center' };
  const buttonTextStyles = { fontWeight: 'bold', color: '#686D76', textAlign: 'left' }


  const removeValue = () => {
    handleStateValue(null);
  }

  return (
    <Box cursor="pointer">
      <Box style={containerStyles}>
        {!stateValue && <Icon style={iconStyles} as={iconAdd}/>}
        <Text style={buttonTextStyles}>{label}</Text>
      </Box>
      <Box mb={5} display="flex" alignItems="center">
        {stateValue && <Text color="#B4B4B4" fontWeight="bold" fontSize="10px">{stateValue}</Text>}
        {stateValue && <Icon onClick={removeValue} cursor="pointer" height="18px" width="18px" ml="0.25rem" as={iconRemove}></Icon>}
      </Box>
    </Box>
  );
};

export default CoverTool;
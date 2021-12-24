import { Box, InputGroup, Input, Icon } from "@chakra-ui/react";
import { BiSearch, BiMenu } from 'react-icons/bi';

const Searchbar = ({ handleSidebarToggle }) => {

  return (
     <Box
      mx={5}
      display="flex"
      justifyContent={['flex-end', 'flex-end', 'space-around']}
      alignItems="center"
      maxWidth="800px"
      width="100%"
      >
      <Box display="flex" flexDirection={['row-reverse', 'row-reverse', 'row']}>
        <Icon
          onClick={handleSidebarToggle}
          cursor="pointer"
          mx={5}
          fontSize={25}
          color="gray.secondary"
          as={BiMenu}
        />
        <Icon
          display={['none', 'none', 'inline-block']}
          mx={5}
          fontSize={25}
          color="gray.secondary"
          as={BiSearch}
        />
      </Box>
      <InputGroup display={['none', 'none', 'inline-block']} width="100%">
        <Input
          _focus={{ border: 'none' }}
          width="100%"
          variant="regular"
          autoComplete="off"
          maxWidth="800px"
          outline="none"
          border="none"
          placeholder="Search Posts"
        />
      </InputGroup>
    </Box>
  );
}

export default Searchbar;
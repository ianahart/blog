import { FormLabel, FormControl, Box, Input } from '@chakra-ui/react';
const Filter = ({ filterSender, searchFilter }) => {
  const handleOnChange = (e) => {
    filterSender(e.target.value);
  };

  return (
    <Box m="2rem 0 1.5rem 1rem">
      <FormControl>
        <FormLabel htmlFor="search" color="dark.secondary">
          Search by name
        </FormLabel>
      </FormControl>
      <Input
        id="search"
        onChange={handleOnChange}
        value={searchFilter}
        width="50%"
        placeholder="search..."
      />
    </Box>
  );
};

export default Filter;

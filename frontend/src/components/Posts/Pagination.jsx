import { Box, Text, Button } from '@chakra-ui/react';

const Pagination = ({ fetchError, pagination, curPreviewTab, paginate }) => {
  return (
    <Box mt={4}>
      <Text
        textAlign="center"
        fontSize="18px"
        fontWeight="bold"
        color="blue.secondary"
      >
        {pagination.page}
      </Text>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        {pagination.start > 0 && (
          <Button mr={3} onClick={() => paginate(curPreviewTab, 'prev')}>
            Prev
          </Button>
        )}
        {fetchError?.toLowerCase() !== 'all posts have been loaded.' && (
          <Button ml={3} onClick={() => paginate(curPreviewTab, 'next')}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Pagination;

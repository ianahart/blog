import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';

const CoverTools = () => {
  return (
      <Box mt="0.5rem" mb={['1rem', '1rem', 'auto']}>
            <Text border="1px solid blue">i am a title input</Text>
            <Text border="1px solid green">i am a image upload </Text>
          </Box>
  )
}

export default CoverTools;
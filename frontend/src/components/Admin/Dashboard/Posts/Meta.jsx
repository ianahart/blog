import { Icon, Box, Text } from '@chakra-ui/react';
import { AiOutlineTrophy } from 'react-icons/ai';

const Meta = () => {
  return (
    <Box width="100%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={8}
        p={1}
        justifyContent="center"
      >
        <Box mb={2} display="flex" alignItems="center">
          <Icon
            width="24px"
            height="24px"
            color="#BBA129"
            as={AiOutlineTrophy}
          />
          <Text ml={2} fontSize="18px">
            Ranking:{' '}
          </Text>
        </Box>
        <Text fontSize="14px">5th most liked post of all time</Text>
      </Box>
    </Box>
  );
};
export default Meta;

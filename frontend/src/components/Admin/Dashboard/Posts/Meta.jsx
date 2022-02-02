import { Icon, Box, Text } from '@chakra-ui/react';
import { AiOutlineTrophy } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import background from '../../../../images/top_waves.png';
import axios from 'axios';

const Meta = ({ postId }) => {
  const [ranking, setRanking] = useState({
    ranking: '',
    post_id: '',
    has_likes: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const rankPost = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `/api/v1/posts/${postId}/admin/rank/`,
        });
        if (response.status === 200) {
          const { result } = response.data;
          setRanking((prevState) => {
            return {
              ...prevState,
              ...result,
            };
          });
          console.log(response);
          setLoading(false);
        }
      } catch (e) {
        setError(e.response.data?.detail);
        setLoading(false);
      }
    };
    rankPost();
  }, [postId]);

  return (
    <>
      {!loading && (
        <Box height="100%" width="100%">
          <Box
            height="100%"
            opacity="0.6"
            margin="0 auto"
            textAlign="center"
            backgroundImage={background}
            p={1}
          >
            {' '}
            <Box mt={5}>
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
              {error && (
                <Text color="gray.validationError" fontSize="12px">
                  {error}
                </Text>
              )}
              {ranking.has_likes ? (
                <Text fontSize="14px">
                  <Box as="span" color="blue.primary" fontWeight="bold">
                    {ranking.ranking}
                  </Box>{' '}
                  most liked post of all time
                </Text>
              ) : (
                <Text>{ranking.ranking}</Text>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
export default Meta;

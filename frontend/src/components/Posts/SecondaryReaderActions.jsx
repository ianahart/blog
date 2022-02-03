import { Box, Link, Text, Button, SlideFade } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import background from '../../images/top_waves.png';
const SecondaryReaderActions = ({ authorId, firstName, postId }) => {
  const [randomPosts, setRandomPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(0);

  useEffect(() => {
    setPageSize(2);
  }, []);

  const handleOnClick = async () => {
    try {
      setIsOpen(true);
      const response = await axios({
        method: 'GET',
        url: `/api/v1/posts/random/?size=${pageSize}&user=${authorId}&postid=${postId}`,
      });

      if (response.status === 200) {
        const { posts } = response.data?.result;
        setRandomPosts(posts);
      }
    } catch (e) {
      setError(e.response.data?.detail);
    }
  };

  return (
    <Box filter="opacity(65%)" backgroundImage={background} height="70%">
      <Box
        backgroundColor="blue.primary"
        mb={1.5}
        height="40px"
        borderTopRadius={8}
      ></Box>
      <Box padding="1rem">
        <Text fontStyle="italic" color="dark.secondary" cursor="pointer">
          Checkout more posts written by {firstName}
        </Text>
        {error !== null ? (
          <Text
            textAlign="center"
            mt="1rem"
            fontSize="12px"
            color="gray.validationError"
          >
            {error}
          </Text>
        ) : (
          <SlideFade in={isOpen} offsetY="100px">
            <Box borderRadius={8} backgroundColor="#fff" shadow="md">
              {randomPosts.map((randomPost) => {
                return (
                  <Link
                    key={randomPost.id}
                    as={RouterLink}
                    to={`/posts/${randomPost.slug}`}
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}
                  >
                    <Box
                      textAlign="center"
                      display="flex"
                      _hover={{ backgroundColor: '#ebe7e7' }}
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      p={0.5}
                      my="1rem"
                    >
                      <Text fontSize="16px" color="dark.secondary">
                        {randomPost.title}
                      </Text>
                      <Box display="flex" justifyContent="center">
                        {randomPost.tags.map((tag, index) => {
                          return (
                            <Text
                              mx={0.5}
                              fontSize="12px"
                              key={index}
                              color="gray.validationError"
                            >
                              {tag}
                            </Text>
                          );
                        })}
                      </Box>
                    </Box>
                  </Link>
                );
              })}
            </Box>
          </SlideFade>
        )}
        <Box textAlign="center" margin="1.5rem auto 1.5rem auto">
          <Button
            disabled={error !== null ? true : false}
            _hover={{ backgroundColor: '#05b4da' }}
            borderRadius="50%"
            boxShadow="md"
            color="light.primary"
            height="80px"
            backgroundColor="blue.primary"
            onClick={handleOnClick}
            width="80px"
          >
            See More
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SecondaryReaderActions;

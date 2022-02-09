import { Box, Text, Image, Button, Divider, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext.js';
import { useContext } from 'react';

const Results = ({ error, mode = 'reg', paginate, data, searchTerm }) => {
  const { user } = useContext(AuthContext);

  const handleOnClick = () => {
    paginate();
  };

  return (
    <Box
      zIndex={10}
      padding="0.75rem"
      margin="0 auto 1.5rem auto"
      width={['100%', '650px', '650px']}
      backgroundColor="#FFF"
      boxShadow="md"
      borderRadius={8}
      maxHeight="400px"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          width: '10px',
          backgroundColor: '#BBBABD',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#05b4da',
          borderRadius: '24px',
        },
      }}
      p={3}
    >
      {data.map((item) => {
        return (
          <Box my="1rem" key={item.id}>
            <Box alignItems="center" display="flex">
              {item.post?.cover_image_path && (
                <Image
                  width="55px"
                  height="55px"
                  borderRadius={8}
                  src={item.post.cover_image_path}
                  alt={item.post.title}
                  mr="1rem"
                />
              )}
              <Link
                _hover={{ textDecorationColor: 'blue' }}
                textDecorationColor="green.primary"
                as={RouterLink}
                to={
                  mode === 'admin'
                    ? `/admin/${user?.userId}/posts/${item.post.slug}`
                    : `/posts/${item.post.slug}`
                }
              >
                <Text fontSize="18px" color="dark.secondary">
                  {item.post.title}
                </Text>
              </Link>
            </Box>
            <Box mt={3} display="flex">
              {item.text.map((tag, index) => {
                return (
                  <Text
                    fontWeight={tag.includes(searchTerm) ? 'bold' : 'normal'}
                    key={index}
                    fontSize="14px"
                    mx="0.25rem"
                    color="dark.secondary"
                  >
                    #{tag}
                  </Text>
                );
              })}
            </Box>
            <Divider orientation="horizontal" />
          </Box>
        );
      })}
      {mode === 'reg' && error === null && (
        <Button onClick={handleOnClick} width="100%" variant="main">
          See more...
        </Button>
      )}
    </Box>
  );
};

export default Results;

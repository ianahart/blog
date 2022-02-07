import { Box, Text, Image, Heading, SlideFade, Link, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { memo } from 'react';
const Tag = memo(({ data, param, resetTags }) => {
  return (
    <SlideFade offsetX="300px" in={true}>
      <Box
        width={['95%', '95%', '500px']}
        color="dark.secondary"
        p="1rem"
        my="2rem"
        backgroundColor="#fff"
        boxShadow="md"
        borderRadius={8}
      >
        <Box display="flex" alignItems="center">
          {data.post.author.portrait_url ? (
            <Image
              mr={2}
              borderRadius="50%"
              height="50px"
              width="50px"
              src={data.post.author.portrait_url}
              alt="profile picture of the author"
            />
          ) : (
            <Icon
              width="50px"
              height="50px"
              mr={2}
              borderRadius="50%"
              color="light.primary"
              as={FaUserCircle}
            />
          )}
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box display="flex" alignItems="center">
              {data.post.author.first_name && <Text mx={0.5}>{data.post.author.first_name}</Text>}
              {data.post.author.last_name && <Text mx={0.5}>{data.post.author.last_name}</Text>}
            </Box>
            <Text fontSize="12px" color="gray.validationError">
              {data.post.readable_date}
            </Text>
          </Box>
        </Box>
        <Box my="1.2rem">
          <Link as={RouterLink} to={`/posts/${data.post.slug}-${data.post.id}`}>
            <Heading textAlign="center" fontSize="20px" as="h4">
              {data.post.title}
            </Heading>
          </Link>
          <Box mt="1rem" display="flex">
            {data.text.length > 0 &&
              data.text.map((tag, index) => {
                return (
                  <Link
                    onClick={resetTags}
                    key={index}
                    as={RouterLink}
                    to={`/tags/${tag}?offset=0&limit=2`}
                  >
                    <Box
                      fontSize="14px"
                      mx="0.7rem"
                      fontWeight={tag.includes(param) ? 'bold' : 'normal'}
                      color="dark.secondary"
                      cursor="pointer"
                    >
                      #{tag}
                    </Box>
                  </Link>
                );
              })}
          </Box>
        </Box>
      </Box>
    </SlideFade>
  );
});

export default Tag;

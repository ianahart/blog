import { Box, Icon, Text, Image, Heading } from '@chakra-ui/react';
import { AiOutlineCalendar } from 'react-icons/ai';

const PostHeader = ({ post }) => {
  return (
    <Box borderTopRadius={8} mb={5}>
      <Image
        mb={4}
        borderTopRadius={8}
        width="100%"
        height="300px"
        src={post.cover_image_path}
        alt={post.cover_image_filename}
      />
      <Box ml={2} mb={10} display="flex" alignItems="center">
        <Box mr={2} width="50px" height="50px" borderRadius="50%">
          {post.author.portrait_url ? (
            <Image
              borderRadius="50%"
              height="100%"
              width="100%"
              src={post.author.portrait_url}
              alt={post.author.first_name}
            />
          ) : (
            <Box></Box>
          )}
        </Box>
        <Box textAlign="left">
          <Heading color="dark.secondary" fontSize="22px" as="h3">
            {post.author.first_name} {post.author.last_name}
          </Heading>
          <Text
            fontSize="12px"
            display="flex"
            alignItems="center"
            color="#8b8787"
          >
            <Icon
              mr={2}
              height="24px"
              width="24px"
              color="gray.text"
              as={AiOutlineCalendar}
            />
            {post.created_at}
          </Text>
        </Box>
      </Box>
      <Box ml={2}>
        <Heading color="dark.secondary" fontSize="32px" as="h1">
          {post.title}
        </Heading>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            {post.tags?.map((tag, index) => {
              return (
                <Box
                  cursor="pointer"
                  key={index}
                  display="inline-block"
                  mx={2}
                  my={2}
                  color="dark.secondary"
                  as="span"
                >
                  #{tag}
                </Box>
              );
            })}
          </Box>
          <Box mr={2}>
            <Text color="#8b8787" fontStyle="italics" fontSize="14px">
              {post.read_time}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostHeader;

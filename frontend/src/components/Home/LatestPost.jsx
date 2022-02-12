import { Box, Link, Text, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

const LatestPost = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      as={RouterLink}
      to={`/posts/${post.slug}-${post.id}`}
    >
      <Box
        bg={isHovered ? '#222121' : 'transparent'}
        borderRadius={8}
        padding="1rem"
        boxShadow="sm"
        mb="2rem"
        mt="2rem"
        width="340px"
        as="article"
      >
        {post.cover_image_path && (
          <Image
            boxShadow="md"
            borderRadius={8}
            mb={3}
            width="100%"
            height="140px"
            src={post.cover_image_path}
            alt={post.title}
          />
        )}
        <Box textAlign="left">
          <Text
            color={isHovered ? '' : '#FFF'}
            bgGradient={isHovered ? 'linear-gradient(to right, #16db93, #3583c2)' : ''}
            backgroundClip={isHovered ? 'text' : ''}
            fontWeight="bold"
            mb={1}
            fontSize="18px"
          >
            {post.title}
          </Text>
          <Text color="#aeaeb1">{post.content}</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default LatestPost;

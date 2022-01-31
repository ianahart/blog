import {
  Box,
  Heading,
  Icon,
  Image,
  Text,
  keyframes,
  Link,
  usePrefersReducedMotion,
} from '@chakra-ui/react';
import { BsSuitHeart, BsHeartFill } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';
const Preview = ({ previewData, previewLink }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const fade = keyframes`
    from { transform: translateX(-150px) }
    to { transform: translateX(0px)}
    `;
  const animation = prefersReducedMotion ? undefined : `${fade} 1s`;
  const author = previewData?.author_name
    ? previewData.author_name
    : 'Anonymous';

  return (
    <Box
      transition="0.8s all"
      borderRadius={8}
      animation={animation}
      border="1px solid gray.text"
      py={3}
      px={2.5}
      my={2.5}
      boxShadow="md"
    >
      <Box display="flex" justifyContent="flex-start">
        {previewData.portrait_url && (
          <Box width="55px" height="55px" borderRadius="50%">
            <Image
              width="100%"
              height="100%"
              borderRadius="50%"
              src={previewData.portrait_url}
              alt={author}
            />
          </Box>
        )}
        <Box ml={3}>
          <Text>{author}</Text>
          <Text color="gray.secondary" fontSize="12px">
            {previewData.created_at}
          </Text>
        </Box>
      </Box>
      <Box width={['98%', '80%', '80%']} margin="1rem auto">
        <Link
          as={RouterLink}
          _hover={{ textDecoration: 'none' }}
          to={previewLink}
        >
          <Box
            borderRadius={8}
            margin="0 auto"
            width="70%"
            height="200px"
            position="relative"
          >
            <Heading
              style={{ textShadow: '2px 1px 2px #0E0F0F' }}
              position="absolute"
              bottom="0"
              padding={1}
              zIndex={2}
              color="light.primary"
              mb={1.5}
              fontSize={['1rem', '1.5rem', '1.5rem']}
              as="h3"
            >
              {previewData.title}
            </Heading>
            <Image
              borderRadius={8}
              height="100%"
              width="100%"
              src={previewData.cover_image_path}
              alt={previewData.title}
            />

            <Box
              borderRadius={8}
              backgroundColor="rgba(0,0,0,0.4)"
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
            ></Box>
          </Box>
        </Link>
        {previewData.tag?.text?.length
          ? previewData.tag.text.map((text, index) => {
              return (
                <Box
                  key={index}
                  as="span"
                  color="dark.secondary"
                  _hover={{ color: 'gray.600' }}
                  display="inline-block"
                  my={[0.5, 2, 2]}
                  mx={(0.5, 2, 2)}
                  cursor="pointer"
                >
                  #{text}
                </Box>
              );
            })
          : ''}
        <Box display="flex" my={3} justifyContent="space-between">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Icon
              height="20px"
              width="20px"
              fill="red.500"
              as={previewData.user_has_liked ? BsHeartFill : BsSuitHeart}
            />
            {previewData.like_count > 0 ? (
              <Text ml={1} color="dark.secondary">
                {previewData.like_count}
              </Text>
            ) : (
              <></>
            )}
          </Box>
          <Text color="gray.400">{previewData.read_time}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Preview;

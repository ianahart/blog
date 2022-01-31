import { Box, Text, Icon } from '@chakra-ui/react';
import {
  BsSuitHeart,
  BsHeartFill,
  BsBookmark,
  BsThreeDots,
} from 'react-icons/bs';

const PrimaryReaderActions = ({
  userHasLiked,
  likeCount,
  reactToPost,
  loading,
}) => {
  const handleOnLikeClick = async () => {
    const action = userHasLiked ? 'unlike' : 'like';
    await reactToPost(action);
  };
  return (
    <Box
      width=""
      mt={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        onClick={handleOnLikeClick}
        disabled={loading ? true : false}
        role="button"
        position="relative"
        mb="0"
        _hover={{ backgroundColor: 'rgba(176, 64,64,0.2)' }}
        layerStyle="iconContainer"
      >
        <Icon
          _hover={{ color: '#B04040' }}
          layerStyle="iconBtn"
          role="button"
          color="dark.secondary"
          as={userHasLiked ? BsHeartFill : BsSuitHeart}
        />
        <Text
          position="absolute"
          fontSize="16px"
          color="dark.secondary"
          bottom="-20px"
          fontWeight="700"
        >
          {likeCount === 0 ? '' : likeCount}
        </Text>
      </Box>
      <Box
        _hover={{ backgroundColor: 'rgba(22,219,147,0.2)' }}
        layerStyle="iconContainer"
      >
        <Icon
          _hover={{ color: '#16DB93' }}
          layerStyle="iconBtn"
          color="dark.secondary"
          as={BsBookmark}
        />
      </Box>
      <Box
        _hover={{ backgroundColor: 'rgba(128, 127, 128, 0.2)' }}
        layerStyle="iconContainer"
      >
        <Icon layerStyle="iconBtn" color="dark.secondary" as={BsThreeDots} />
      </Box>
    </Box>
  );
};

export default PrimaryReaderActions;

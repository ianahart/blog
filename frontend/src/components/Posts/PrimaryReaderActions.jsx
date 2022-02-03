import {
  Box,
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { BiCopy } from 'react-icons/bi';
import { BsThreeDots, BsSuitHeart, BsHeartFill } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
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

  const handleOnCopyClick = () => {
    navigator.clipboard.writeText(window.location.href);
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
          as={FiSend}
        />
      </Box>
      <Box
        _hover={{ backgroundColor: 'rgba(128, 127, 128, 0.2)' }}
        layerStyle="iconContainer"
      >
        <Menu>
          <MenuButton
            aria-label="Options"
            _hover={{ backgroundColor: 'transparent' }}
            role="button"
            as={Box}
          >
            <Icon
              _hover={{ backgroundColor: 'transparent' }}
              color="dark.secondary"
              layerStyle="iconBtn"
              as={BsThreeDots}
            ></Icon>
          </MenuButton>
          <MenuList minH="250px">
            <MenuItem
              onClick={handleOnCopyClick}
              display="flex"
              justifyContent="space-between"
            >
              <Text fontWeight="bold" color="dark.secondary">
                Copy link
              </Text>
              <Icon
                height="20px"
                color="blue.primary"
                width="20px"
                as={BiCopy}
              />
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default PrimaryReaderActions;

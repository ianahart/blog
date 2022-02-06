import { Box, Text, Button, Link, Icon, Tooltip } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AiOutlineClose,
  AiOutlineClockCircle,
  AiOutlineLink,
  AiOutlineUser,
  AiOutlineContacts,
} from 'react-icons/ai';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
const MessageView = ({ markAsRead, message, closeModal }) => {
  const handleOnClick = () => {
    markAsRead(message.id);
    closeModal();
  };

  return (
    <Box
      width={['95%', '95%', '550px']}
      minHeight="225px"
      boxShadow="md"
      backgroundColor="#FFF"
      borderRadius={8}
    >
      <Box
        role="button"
        cursor="pointer"
        borderTopRadius={8}
        backgroundColor="blue.primary"
        display="flex"
        justifyContent="flex-end"
        onClick={closeModal}
      >
        <Icon color="light.primary" layerStyle="iconBtn" as={AiOutlineClose} />
      </Box>
      <Box p={2.5}>
        <Box my={1.5} display="flex" alignItems="center" justifyContent="space-evenly">
          <Box display="flex" mr="auto" alignItems="center">
            <Icon as={AiOutlineUser} color="dark.secondary" />
            <Text ml={1.5} color="dark.secondary" fontSize="14px">
              {message.sender}
            </Text>
          </Box>
          <Text mr="auto" fontWeight="bold" textAlign="center">
            {message.post.title}
          </Text>
          <Link to={`/admin/${message.post.author_id}/posts/${message.post_link}`} as={RouterLink}>
            <Icon layerStyle="iconSm" color="dark.secondary" as={AiOutlineLink} />
            Go To:
          </Link>
        </Box>

        <Text color="dark.secondary" lineHeight={1.6} bg="#f3f0f0" p={1} borderRadius={8}>
          {message.message}
        </Text>
        <Box my={1.5} display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Icon layerStyle="iconSm" as={AiOutlineClockCircle} color="dark.secondary" />
            <Text ml={1.5} color="gray.validationError" fontSize="12px">
              {message.created_at}
            </Text>
          </Box>
          <Box display="flex" alignItems="center">
            <Icon layerStyle="iconSm" as={AiOutlineContacts} />
            <Text fontSize="12px" ml={1.5} color="gray.validationError">
              {message.contact}
            </Text>
          </Box>
        </Box>
        <Box my={2} display="flex" justifyContent="flex-end">
          {!message.read && (
            <Tooltip color="light.primary" bg="green.primary" label="Mark as read">
              <Box display="flex" alignItems="center" mr={10} onClick={handleOnClick} as="span">
                <Icon layerStyle="iconBtn" color="dark.secondary" as={MdOutlineMarkEmailRead} />
              </Box>
            </Tooltip>
          )}
          <Button boxShadow="sm" onClick={closeModal}>
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageView;

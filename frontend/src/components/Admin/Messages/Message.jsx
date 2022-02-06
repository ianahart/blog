import {
  Box,
  ListItem,
  Checkbox,
  Icon,
  keyframes,
  Divider,
  usePrefersReducedMotion,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';
import { memo } from 'react';
import { MdOutlineMarkAsUnread } from 'react-icons/md';
const Message = memo(
  ({ deleteMessage, searchFilter, markAsUnread, handleCheckedMessages, message, openModal }) => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const handleOnChange = () => {
      handleCheckedMessages(message.id);
    };

    const handleOnClick = () => {
      openModal(message.id);
    };

    const slide = keyframes`
    from {transform: translateX(200px); opacity: 0;}
    to {transform: translateX(0); opacity: 1;}
    `;
    const animation = prefersReducedMotion ? undefined : `${slide} 0.5s ease-out`;

    return (
      <>
        {message.sender.toLowerCase().includes(searchFilter.toLowerCase()) && (
          <ListItem
            cursor="pointer"
            backgroundColor={message.read ? '#FFF' : '#dadadf'}
            _hover={{ backgroundColor: 'rgba(37,131,194,0.3) !important' }}
            animation={animation}
          >
            <Box
              minHeight="50px"
              display="flex"
              flexDirection={['column', 'column', 'row']}
              justifyContent="space-around"
              width="100%"
              p={1.5}
            >
              <Box
                mr="auto"
                alignItems="center"
                justifyContent="flex-start"
                display="flex"
                flexGrow="1"
              >
                {!message.read && (
                  <Checkbox
                    onChange={handleOnChange}
                    isChecked={message.is_checked}
                    size="lg"
                    aria-label="delete or mark as read"
                    borderColor="blue.primary"
                    colorScheme="teal"
                  />
                )}
                {message.read && (
                  <Tooltip color="light.primary" bg="green.primary" label="Mark as unread">
                    <Box
                      onClick={() => markAsUnread(message.id)}
                      display="flex"
                      alignItems="center"
                      mx={2.5}
                      as="span"
                    >
                      <Icon layerStyle="iconSm" color="dark.secondary" as={MdOutlineMarkAsUnread} />
                    </Box>
                  </Tooltip>
                )}
                <Text as={message.read ? 'p' : 'strong'} ml={5}>
                  {message?.sender ? message.sender : 'Anonymous'}
                </Text>
              </Box>
              <Box flexGrow="2" display="flex" justifyContent="flex-start">
                <Box onClick={handleOnClick} cursor="pointer" flexGrow="1" mr="auto">
                  <Text zIndex={-1} as={message.read ? 'p' : 'strong'}>
                    {message.ellipses}
                  </Text>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  mr={['auto', 'auto', 0]}
                  ml={[0, 'auto', 'auto']}
                >
                  <Text fontSize="14px" as={message.read ? 'p' : 'strong'}>
                    {message.readable_date}
                  </Text>
                  {message.read && (
                    <Tooltip label="Delete" bg="green.primary" color="light.primary">
                      <Box
                        onClick={() => deleteMessage(message.id)}
                        pl={1}
                        cursor="pointer"
                        display="flex"
                        alignItems="center"
                      >
                        <Icon layerStyle="iconSm" color="dark.secondary" as={BsTrash} />
                      </Box>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            </Box>
            <Divider pointer="cursor" orientation="horizontal" />
          </ListItem>
        )}
      </>
    );
  }
);

export default Message;

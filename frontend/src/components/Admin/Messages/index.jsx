import { Box, Text, Divider, Icon, Tooltip, Heading } from '@chakra-ui/react';
import { useEffect, useCallback, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext.js';
import Actions from './Actions.jsx';
import { AiOutlineReload } from 'react-icons/ai';
import Spinner from '../../Mixed/Spinner.jsx';
import MessageList from './MessageList';

const Messages = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = (response) => {
    if (response.status === 200) {
      const { result } = response.data;
      setMessages((prevState) => [...prevState, ...result.messages]);
      setPage(result.q_str.page);
      setOffset(result.q_str.offset);
    }
  };

  const massAction = (action) => {
    const checkedIds = [...messages].filter((item) => item.is_checked).map((item) => item.id);
    if (action === 'mark_as_read') {
      markAsReadAll(checkedIds);
    } else {
      deleteAll(checkedIds);
    }
  };

  const markAsReadAll = (ids) => {
    const readMessages = [...messages].map((message) => {
      if (ids.includes(message.id)) {
        return { ...message, is_checked: false, read: true };
      }
      return { ...message };
    });
    setMessages(readMessages);
  };

  const deleteAll = (ids) => {
    const items = [...messages].filter((item) => {
      return !ids.includes(item.id) ? item : false;
    });
    setMessages(items);
  };

  const updateMessage = (item, id, prop, value) => {
    return item.id === id ? { ...item, [prop]: value } : { ...item };
  };

  const handleCheckedMessages = (messageId) => {
    const items = [...messages].map((item) => {
      return updateMessage(item, messageId, 'is_checked', !item.is_checked);
    });
    setMessages(items);
  };

  const markAsRead = (messageId) => {
    const items = [...messages].map((item) => {
      return updateMessage(item, messageId, 'read', true);
    });
    setMessages(items);
  };

  const markAsUnread = (messageId) => {
    const items = [...messages].map((item) => {
      return updateMessage(item, messageId, 'read', false);
    });
    setMessages(items);
  };

  const loadMessages = useCallback(async () => {
    try {
      setPageSize(4);
      const response = await axios({
        method: 'GET',
        url: `/api/v1/messages/admin/?size=4&page=1&offset=0`,
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      console.log(response);
      handleFetch(response);
    } catch (e) {
      if (e.response.status === 404) {
        setError(e.response.data.detail);
      }
    }
  }, [user.accessToken]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const paginate = async () => {
    try {
      console.log('paginate');
      setIsLoading(true);
      const response = await axios({
        method: 'GET',
        url: `/api/v1/messages/admin/?size=${pageSize}&page=${page}&offset=${offset}`,
      });
      if (response.status === 200) {
        handleFetch(response);
        setIsLoading(false);
      }
    } catch (e) {
      if (e.response.status === 404) {
        setIsLoading(false);
        setError(e.response.data.detail);
      }
    }
  };

  return (
    <Box
      minHeight="100vh"
      width={['95%', '95%', '850px']}
      margin="10rem auto 3rem auto"
      backgroundColor="#FFF"
      borderRadius={8}
      boxShadow="md"
      position="relative"
    >
      <Box>
        <Heading ml={1.5} color="dark.secondary" as="h3">
          {user?.firstName ? user.firstName : 'Admin'}
        </Heading>
        <Actions massAction={massAction} />
      </Box>
      <Divider orientation="horizontal" mb={3} />
      <Divider />
      <Box onClick={paginate} cursor="pointer" ml={1.5} mt={3} mb={7}>
        <Tooltip backgroundColor="green.primary" label="Load more messages...">
          <Box as="span">
            <Icon layerStyle="iconBtn" color="dark.secondary" as={AiOutlineReload} />
          </Box>
        </Tooltip>
      </Box>
      {error && (
        <Text color="gray.validationError" fontSize="14px" textAlign="center" my={3}>
          {error}
        </Text>
      )}
      {isLoading && <Spinner size={100} msg="Loading more messages..." loading={isLoading} />}
      <MessageList
        markAsRead={markAsRead}
        markAsUnread={markAsUnread}
        handleCheckedMessages={handleCheckedMessages}
        messages={messages}
      />
    </Box>
  );
};

export default Messages;

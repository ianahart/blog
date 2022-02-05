import { Box, Text, Button, Divider, Icon, Tooltip, Heading } from '@chakra-ui/react';
import { useEffect, useCallback, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext.js';
import Actions from './Actions.jsx';
import { AiOutlineReload } from 'react-icons/ai';

const Messages = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(null);

  const handleFetch = (response) => {
    if (response.status === 200) {
      const { result } = response.data;
      setMessages((prevState) => [...prevState, ...result.messages]);
      setPage(result.q_str.page);
      setOffset(result.q_str.offset);
    }
  };

  const loadMessages = useCallback(async () => {
    try {
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
      const response = await axios({
        method: 'GET',
        url: `/api/v1/messages/admin/?size=${pageSize}&page=${page}&offset=${offset}`,
      });
      if (response.status === 200) {
        handleFetch(response);
      }
    } catch (e) {
      if (e.response.status === 404) {
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
    >
      <Box>
        <Heading ml={1.5} color="dark.secondary" as="h3">
          {user?.firstName ? user.firstName : 'Admin'}
        </Heading>
        <Actions />
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
    </Box>
  );
};

export default Messages;

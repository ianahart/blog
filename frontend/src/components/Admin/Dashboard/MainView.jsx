import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import graph from '../../../images/graph.png';
import { AuthContext } from '../../../contexts/AuthContext.js';
import Spinner from '../../Mixed/Spinner.jsx';
import LikesChart from './Charts/LikesChart.jsx';
import PostsChart from './Charts/PostsChart.jsx';
import TagsChart from './Charts/TagsChart.jsx';
import MessagesChart from './Charts/MessagesChart';
import Total from './Charts/Total.jsx';

const MainView = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(null);
  const [visitors, setVisitors] = useState(null);
  const [posts, setPosts] = useState(null);
  const [tags, setTags] = useState(null);
  const [messages, setMessages] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const retrieveMetrics = async () => {
      try {
        setLoading(true);
        const response = await axios({
          method: 'GET',
          url: `/api/v1/metrics/admin/${user.userId}/`,
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        const { metrics } = response.data.data;
        setLikes(metrics.likes.result);
        setVisitors(metrics.visitors.result);
        setPosts(metrics.posts);
        setTags(metrics.tags);
        setMessages(metrics.messages);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        if (e.response.status === 500) return;
        setError(e.response.data.detail);
      }
    };
    if (user.accessToken) {
      retrieveMetrics();
    }
  }, [user.userId, user.accessToken]);

  return (
    <Box
      minHeight="100vh"
      background="radial-gradient(circle, rgba(22,219,147,1) 0%, rgba(4,139,168,0.3) 100%)"
      width="100%"
    >
      {loading && <Spinner msg="Loading metrics, please wait..." loading={loading} size={150} />}
      {error && <Text color="dark.secondary">{error}</Text>}
      <Box height="100%" borderRadius="6px">
        <Box
          display="flex"
          my="2.5rem"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
        >
          <Image mr={1.5} src={graph} alt="graph icon" />
          <Heading
            color="light.primary"
            bg="blue.primary"
            p="0.25rem"
            my="3.5rem"
            textAlign="center"
            as="h1"
          >
            Your Analytics
          </Heading>
        </Box>
        <Box
          margin="0 auto"
          mb="2.5rem"
          display="flex"
          flexDir={['column', 'column', 'row']}
          maxWidth="1200px"
          width="100%"
          justifyContent="space-evenly"
        >
          {visitors && <Total label="Unique Vistors" value={visitors} />}
          {posts && <Total label="Posts (2022)" value={posts.total} />}
          {tags && <Total label="Unique Tags" value={tags.unique} />}
        </Box>
        <Box
          maxWidth="1200px"
          margin="0 auto"
          width="100%"
          display="flex"
          flexDir={['column', 'column', 'row']}
          justifyContent="space-evenly"
        >
          <Box
            width="100%"
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            {likes && <LikesChart data={likes} />}
            {posts && <PostsChart data={posts} />}
          </Box>
          <Box flexGrow="1" display="flex" flexDir="column" alignItems="center">
            {tags && <TagsChart data={tags.result} />}
            {messages && <MessagesChart data={messages} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default MainView;

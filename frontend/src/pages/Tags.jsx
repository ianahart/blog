import { Box, Button, SlideFade, Text } from '@chakra-ui/react';
import { useParams, useLocation } from 'react-router-dom';
import { useCallback, useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import Tag from '../components/Tags/Tag.jsx';
import tagBackground from '../images/tags_page.svg';

const Tags = () => {
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [param, setParam] = useState(null);
  const [queryString, setQueryString] = useState(null);
  const params = useParams();
  const location = useLocation();

  useMemo(() => {
    setParam(params.tag);
    setQueryString(location.search);
  }, [params.tag, location.search]);

  const resetTags = () => {
    setTags([]);
    setParam(null);
    setQueryString(null);
    setError(null);
  };

  const updateData = (response) => {
    setTags((prevState) => [...prevState, ...response.data.tags]);
    setQueryString(response.data.q_str);
  };

  const fetchTags = useCallback(async () => {
    try {
      const res = await axios({ method: 'GET', url: `/api/v1/tags/${param}/?offset=0&limit=3` });
      updateData(res);
    } catch (e) {
      if (e.response.status === 500) return;
      setError(e.response.data.detail);
    }
  }, [param]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const paginate = useCallback(async () => {
    try {
      const res = await axios({ method: 'GET', url: `/api/v1/tags/${param}/${queryString}` });
      updateData(res);
    } catch (e) {
      if (e.response.status === 500) return;
      setError(e.response.data.detail);
    }
  }, [param, queryString]);

  return (
    <Box
      _before={{
        content: "' '",
        display: 'block',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        opacity: 0.6,
        backgroundImage: `url(${tagBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      position="relative"
    >
      <Box
        position="relative"
        margin="0 auto 3rem auto"
        display="flex"
        alignItems="center"
        flexDir="column"
        justifyContent="center"
        p={1.5}
        borderRadius={8}
        width={['95%', '95%', '600px', '850px']}
      >
        {param && (
          <SlideFade in={true} offsetX="100px">
            <Text color="#FFF" fontSize="18px" fontWeight="bold" my="1.5rem">
              Results for{' '}
              <Box textShadow="2px 1px 2px rgba(0,0,0,0.6)" as="span" color="green.primary">
                &ldquo;{param}&rdquo;"
              </Box>
            </Text>
          </SlideFade>
        )}
        {error && (
          <Text fontSize="14px" textAlign="center" color="dark.secondary">
            {error}
          </Text>
        )}
        {tags.length > 0 &&
          tags.map((tag) => {
            return <Tag resetTags={resetTags} key={tag.id} param={param} data={tag} />;
          })}

        {error === null && (
          <Box display="flex" alignItems="center" justifyContent="center" my={3}>
            <Button onClick={paginate} variant="main">
              More...
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Tags;

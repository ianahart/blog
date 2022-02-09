import { Box, Text } from '@chakra-ui/react';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';

import Previews from '../components/Posts/Previews';
import SearchBar from '../components/Search/SearchBar.jsx';
import Results from '../components/Search/Results.jsx';
import useDebounce from '../hooks/useDebounce.jsx';

const Posts = () => {
  const outline = '1px solid #e3e2e2';
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);

  const handleOnChange = (e) => setSearchTerm(e.target.value);
  const debouncedSearchTerm = useDebounce(searchTerm, 750);

  const searchTags = useCallback(async () => {
    try {
      setError(null);
      setResults([]);
      const response = await axios({
        method: 'GET',
        url: `/api/v1/tags/search/?q=${encodeURIComponent(debouncedSearchTerm)}&limit=3&offset=0`,
      });
      setResults((prevState) => [...prevState, ...response.data.results]);
      setOffset((prevState) => prevState + response.data.offset);
    } catch (e) {
      if (e.response.data?.detail !== 500) {
        setError(e.response.data.detail);
      }
      setSearchTerm('');
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setOffset(0);
      searchTags();
    } else {
      setResults([]);
    }
  }, [searchTags, debouncedSearchTerm]);

  const paginate = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `/api/v1/tags/search/?q=${encodeURIComponent(
          debouncedSearchTerm
        )}&limit=3&offset=${offset}`,
      });
      setResults((prevState) => [...prevState, ...response.data.results]);
      setOffset(response.data.offset);
    } catch (e) {
      if (e.response.status !== 500) {
        setError(e.response.data.detail);
      }
    }
  };

  return (
    <>
      <Box margin="3rem auto 1.5rem auto">
        {error && (
          <Text mb="1rem" color="dark.secondary" fontSize="14px" textAlign="center">
            {error}
          </Text>
        )}
        <Box display="flex" position="relative" justifyContent="center">
          <SearchBar
            icon={true}
            value={searchTerm}
            handleOnChange={handleOnChange}
            display={['flex']}
            focus={{ border: `${outline}` }}
            border={outline}
            placeHolder="Search by Tags"
          />
        </Box>
        {results.length > 0 && searchTerm.length > 0 ? (
          <Results paginate={paginate} error={error} data={results} searchTerm={searchTerm} />
        ) : (
          <></>
        )}
      </Box>
      <Previews previewLink="/posts/" />
    </>
  );
};

export default Posts;

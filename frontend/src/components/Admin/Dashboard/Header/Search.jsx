import { Box, Icon, Text } from '@chakra-ui/react';
import { BiSearch, BiMenu } from 'react-icons/bi';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../../../Search/SearchBar.jsx';
import useDebounce from '../../../../hooks/useDebounce.jsx';
import Results from '../../../Search/Results.jsx';
import Widgets from './Widgets.jsx';
const Search = ({ handleSidebarToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const handleOnChange = (e) => setSearchTerm(e.target.value);
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 350);

  const searchPostByTitle = useCallback(async () => {
    try {
      setError([]);
      setResults([]);
      const response = await axios({
        method: 'GET',
        url: `/api/v1/posts/admin/search/?q=${encodeURIComponent(debouncedSearchTerm)}`,
      });

      setResults((prev) => [...prev, ...response.data.results]);
    } catch (e) {
      if (e.response.status !== 500) {
        setError(e.response.data.detail);
      }
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setError(null);
      searchPostByTitle();
    } else {
      setResults([]);
    }
  }, [searchPostByTitle, debouncedSearchTerm]);

  return (
    <Box
      mx={5}
      display="flex"
      justifyContent={['flex-end', 'flex-end', 'space-around']}
      alignItems="center"
      position="relative"
      maxWidth="800px"
      width="100%"
    >
      <Box display="flex" flexDirection={['row-reverse', 'row-reverse', 'row']}>
        <Icon
          onClick={handleSidebarToggle}
          cursor="pointer"
          mx={5}
          fontSize={25}
          color="gray.secondary"
          as={BiMenu}
        />
        <Icon
          display={['none', 'none', 'inline-block']}
          mx={5}
          fontSize={25}
          color="gray.secondary"
          as={BiSearch}
        />
      </Box>
      <SearchBar
        handleOnChange={handleOnChange}
        display={['none', 'none', 'flex']}
        focus={{ border: 'none' }}
        border="none"
        role="admin"
        placeHolder="Search Posts"
      />
      {error && (
        <Text position="absolute" color="dark.secondary" fontSize="14px">
          {error}
        </Text>
      )}

      {results.length > 0 && searchTerm.length > 0 ? (
        <Box
          position="absolute"
          top="55px"
          zIndex={12}
          right="0px"
          display={['none', 'none', 'inline-block']}
          width={['100%', '650px', '650px']}
          height="300px"
        >
          <Results mode="admin" error={error} data={results} searchTerm={searchTerm} />
        </Box>
      ) : (
        <></>
      )}
      <Widgets />
    </Box>
  );
};

export default Search;

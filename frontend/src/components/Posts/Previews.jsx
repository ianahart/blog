import { Box, Text } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import apiRequest from '../../services/apiRequest.js';
import Preview from './Preview';
import Header from './Header';
import Spinner from '../Mixed/Spinner';
import Pagination from './Pagination.jsx';

const Previews = () => {
  const [previewData, setPreviewData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    start: 0,
    end: 2,
    limit: 2,
    direction: 'initial_load',
  });
  const [fetchError, setFetchError] = useState(null);
  const [curPreviewTab, setCurPreviewTab] = useState('latest');
  const [isLoading, setIsLoading] = useState(false);

  const handleCurPreviewTab = async (newTab) => {
    if (newTab === curPreviewTab) {
      return;
    }
    setCurPreviewTab(newTab);
    if (fetchError) {
      setFetchError(null);
    }

    setPreviewData([]);
    setPagination({
      page: 0,
      start: 0,
      end: 2,
      limit: 2,
      direction: 'initial_load',
    });

    await fetchPreviews(newTab, 'initial_load');
  };

  const handleFetchErrors = ({ data, status }) => {
    console.log(data);
    setIsLoading(false);
    if (Array.isArray(data.detail)) {
      return;
    }
    setFetchError(data.detail);
  };

  const fetchPreviews = async (newTab, direction) => {
    try {
      setFetchError('');
      const queryString = `tab=${newTab}&start=${pagination.start}&end=${pagination.end}&direction=${direction}&page=${pagination.page}&limit=${pagination.limit}`;
      const response = await apiRequest(
        `/api/v1/posts/?${queryString}`,
        {},
        'GET',
        handleFetchErrors,
        null
      );
      console.log(response);
      if (response.status === 200) {
        const { pagination, posts } = response.data;
        setPreviewData((prevData) => [...prevData, ...posts]);
        setPagination((prevPagination) => ({
          ...prevPagination,
          ...pagination,
        }));
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadPreviews = async () => {
      try {
        const response = await apiRequest(
          `/api/v1/posts/?tab=latest&start=0&end=2&direction=initial_load&page=1&limit=2`,
          {},
          'GET',
          handleFetchErrors,
          {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
        );
        if (response.status === 200) {
          setPreviewData((prevData) => [...prevData, ...response.data.posts]);

          setPagination((prevPagination) => ({
            ...prevPagination,
            ...response.data.pagination,
          }));
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
      }
    };
    loadPreviews();
  }, []);

  const paginate = (tab, direction) => {
    setPreviewData([]);
    fetchPreviews(tab, direction);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={10}
      width="100%"
      minHeight="100vh"
    >
      <Box py={2} width={['100%', '650px', '650px']} height="max-content">
        <Header
          curPreviewTab={curPreviewTab}
          handleCurPreviewTab={handleCurPreviewTab}
        />
        {fetchError && (
          <Box display="flex" justifyContent="center" mt={12}>
            <Text fontSize="18px" color="gray.validationError">
              {fetchError}
            </Text>
          </Box>
        )}
        {previewData.length ? (
          <Fragment>
            {previewData.map((preview) => {
              return (
                <Preview
                  previewLink={`/posts/${preview.slug}`}
                  key={preview.id}
                  authenticated={false}
                  previewData={preview}
                />
              );
            })}
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
        {isLoading && <Spinner size={100} loading={false} />}
        {!isLoading && (
          <Pagination
            fetchError={fetchError}
            pagination={pagination}
            curPreviewTab={curPreviewTab}
            paginate={paginate}
          />
        )}
      </Box>
    </Box>
  );
};

export default Previews;

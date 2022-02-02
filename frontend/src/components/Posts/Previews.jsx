import { Box, Text } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import apiRequest from '../../services/apiRequest.js';
import Preview from './Preview';
import PreviewHeader from './PreviewHeader';
import Spinner from '../Mixed/Spinner';
import Pagination from './Pagination.jsx';

const Previews = () => {
  const [previewData, setPreviewData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    start: 0,
    total: 0,
    limit: 3,
    direction: 'initial_load'
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
    setPagination((prevPagination) => {
      return {
        ...prevPagination,
                    page: 0,
        start: 'fuck',
        total: 0,
        limit: 3,
        direction: 'initial_load'
      }
    })
    await fetchPreviews(newTab, 'initial_load');
  };

  useEffect(() => {
    if (pagination.direction === 'initial_load') {
          setPagination((prevPagination) => {
      return {
        ...prevPagination,
                    page: 0,
        start: 0,
        total: 0,
        limit: 3,
        direction: 'initial_load'
      }
    })
    }
  }, [pagination.direction])


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
      console.log('fetchPreviews()', newTab, direction)
      setFetchError('');

      const queryString = `tab=${newTab}&start=${pagination.start}&total=${pagination.total}&direction=${direction}&page=${pagination.page}&limit=${pagination.limit}`;
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
          `/api/v1/posts/?direction=initial_load&limit=${pagination.limit}`,
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
  }, [pagination.limit]);

  const paginate = (tab, direction) => {
    setPreviewData([]);
    if (direction === 'next' && pagination.start + pagination.limit < pagination.total) {
      fetchPreviews(tab, direction);
    } else if (direction === 'prev' && pagination.start > 0) {
      fetchPreviews(tab, direction);
    }
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
        <PreviewHeader
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
                  previewLink={`/posts/${preview.slug}-${preview.id}`}
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


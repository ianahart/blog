import {
  Box,
  Button,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { useContext, Fragment, useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../../contexts/AuthContext';
import Preview from '../../../../Posts/Preview.jsx';
import Spinner from '../../../../Mixed/Spinner.jsx';
import axios from 'axios';

const AdminPreviews = () => {
  const { user } = useContext(AuthContext);
  const [state, setState] = useState({
    pageSize: 3,
    previews: [],
    error: null,
    isLoading: false,
  });
  const params = useParams();
  const handleFetchErrors = ({ data, status }) => {
    if (status !== 403) {
      setState((prevState) => ({ ...prevState, error: data.detail }));
    }
  };

  const loadAdminPreviews = useCallback(async () => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      const response = await axios({
        method: 'GET',
        url: `/api/v1/posts/admin/${parseInt(params.userId)}/?size=3&total=0`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: 'Bearer ' + user.accessToken,
        },
      });
      setState((prevState) => {
        return {
          ...prevState,
          previews: [...prevState.previews, ...response.data.posts],
          isLoading: false,
          pageSize: response.data.pagination.size,
        };
      });
    } catch (e) {
      setState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
          error: e.response.status === 404 ? e.response.data.detail : null,
        };
      });
    }
  }, [user.accessToken, params.userId]);
  const handleOnChangeEnd = (curPageSize) => {
    setState((prevState) => ({ ...prevState, pageSize: curPageSize }));
  };

  const handleOnClick = async () => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      const response = await axios({
        method: 'GET',
        url: `/api/v1/posts/admin/${parseInt(params.userId)}/?size=${
          state.pageSize
        }&total=${state.previews.length}`,
      });
      setState((prevState) => {
        return {
          ...prevState,
          previews: [...prevState.previews, ...response.data.posts],
          isLoading: false,
          pageSize: response.data.pagination.size,
        };
      });
    } catch (e) {
      setState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
          error: e.response.status === 404 ? e.response.data.detail : null,
        };
      });
    }
  };

  useEffect(() => {
    loadAdminPreviews();
  }, [loadAdminPreviews]);

  return (
    <Box margin="3rem auto 1rem auto" width="1200px">
      <Box margin="0 auto" width="350px">
        <Text color="dark.secondary" fontWeight="bold">
          Results per page: {state.pageSize}
        </Text>
        <Slider
          mb={3}
          onChangeEnd={handleOnChangeEnd}
          min={2}
          max={15}
          aria-label="results-size"
          defaultValue={state.pageSize}
        >
          <SliderTrack>
            <SliderFilledTrack bg="blue.primary" />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        {state.previews.length ? (
          <Text
            mb={2}
            textAlign="right"
            fontSize="12px"
            color="dark.secondary"
            fontStyle="italic"
          >
            Posts between {state.previews[0].created_at} -{' '}
            {state.previews[state.previews.length - 1].created_at}
          </Text>
        ) : (
          <Text mb={2} fontSize="12px" color="dark.secondary">
            You currently do not have any posts.
          </Text>
        )}
      </Box>
      <Box
        backgroundColor="#FFF"
        borderRadius={8}
        boxShadow="sm"
        margin="0 auto"
        padding="1.5rem"
        width={['100%', '95%', '60%']}
      >
        {state.error && (
          <Box display="flex" justifyContent="center" mt={12}>
            <Text fontSize="18px" color="dark.secondary">
              {state.error}
            </Text>
          </Box>
        )}
        {state.previews.length ? (
          <Fragment>
            {state.previews.map((preview) => {
              return <Preview previewLink={`/admin/${preview.author_id}/posts/${preview.slug}`} key={preview.id} previewData={preview} />;
            })}
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
        {state.isLoading && <Spinner size={100} loading={false} />}
      </Box>
      {state.error?.toLowerCase() !== 'all posts have been loaded.' && (
        <Box display="flex" justifyContent="center">
          <Button onClick={handleOnClick}>Older Posts...</Button>
        </Box>
      )}
    </Box>
  );
};

export default AdminPreviews;

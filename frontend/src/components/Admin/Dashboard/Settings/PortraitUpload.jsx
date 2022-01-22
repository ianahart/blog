import { useState, useContext } from 'react';
import { FiUpload } from 'react-icons/fi';
import { RiAddFill } from 'react-icons/ri';
import { Box, Icon, Image, Input, Text } from '@chakra-ui/react';
import Spinner from '../../../Mixed/Spinner.jsx';
import apiRequest from '../../../../services/apiRequest.js';
import { AuthContext } from '../../../../contexts/AuthContext.js';

const PortraitUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { user, updateUserProp } = useContext(AuthContext);

  const handleOnDragOver = () => {
    setIsDragging(true);
    setUploadError(null);
  };
  const handleOnDragLeave = () => setIsDragging(false);

  const handleOnChange = (e) => {
    const avatar = e.target.files[0];
    handleUploadAvatar(avatar);
  };

  const handleUploadAvatar = (avatar) => {
    setIsDragging(false);
    if (!avatar) return;
    if (avatar.size > 2000000) {
      handleUploadError({
        data: { detail: 'File size must not exceed 2MB(megabytes)' },
        status: null,
      });
      return;
    }
    if (uploadError !== null) {
      return;
    }
    setIsLoading(true);
    uploadAvatar(avatar);
  };

  const handleUploadError = ({ data, status }) => {
    setUploadError(data.detail);
  };

  const uploadAvatar = async (avatar) => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);
      const response = await apiRequest(
        `/api/v1/users/admin/${user.userId}/avatar`,
        formData,
        'PATCH',
        handleUploadError,
        { 'content-type': 'multipart/form-data' }
      );

      if (response.status === 200) {
        updateUserProp('avatarUrl', response.data?.avatarUrl);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      console.log(e.response);
    }
  };

  const dragDropIcon = () => {
    if (isDragging && !isLoading) {
      return (
        <Icon height="68px" width="68px" color="#9b9393" as={RiAddFill}></Icon>
      );
    } else if (!isDragging && isLoading) {
      return <Spinner loading={isLoading} size={68} />;
    }
    return (
      <Icon height="68px" width="68px" color="#9b9393" as={FiUpload}></Icon>
    );
  };

  return (
    <Box mt={10} mb="auto" mr={3}>
      <Text mb={2} color="dark.secondary">
        Change Avatar:
      </Text>
      {uploadError && (
        <Text
          fontWeight="bold"
          fontSize="12px"
          color="validationError.primary"
          mb={2}
        >
          {uploadError}
        </Text>
      )}
      <Box
        position="relative"
        onDragLeave={handleOnDragLeave}
        onDragOver={handleOnDragOver}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        boxShadow="lg"
        backgroundColor="rgba(0,0,0,0.7)"
        height="225px"
        width="300px"
      >
        {user.avatarUrl && (
          <Image
            src={user.avatarUrl}
            alt="a users avatar portrait/avatar picture"
            position="absolute"
            zIndex={2}
            top={0}
            left={0}
            width="100%"
            height="100%"
          />
        )}
        <Box
          as="form"
          encType="multipart/form-data"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          zIndex={3}
          cursor="pointer"
          position="absolute"
          width="95%"
          height="95%"
          border=" 2px dashed #9b9393"
        >
          {dragDropIcon()}
          <Input
            type="file"
            cursor="pointer"
            zIndex={4}
            accept="image/png, image/jpeg"
            onChange={handleOnChange}
            position="absolute"
            opacity={0}
            top={0}
            left={0}
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PortraitUpload;

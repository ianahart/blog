import { useState } from 'react';
import {
  Box,
  Input,
  Icon,
  FormControl,
  Button,
  FormHelperText,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Tag from './Tag.jsx';

const TagsForm = ({ tags, closeTagsTool, handleAddTag, handleRemoveTag }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  const handleOnClick = () => {
    setError(null);
    if (value.trim().length > 150) {
      setError('A tag must be between 1 and 150 characters');
      return;
    }
    setValue('');
    handleAddTag(value);
  };

  const progressBar = () => {
    const style = { width: '0%', backgroundColor: 'inherit' };

    switch (tags.length) {
      case 1:
        style.width = '33.3%';
        style.backgroundColor = '#f9f5f5';
        break;
      case 2:
        style.width = '66.6%';
        style.backgroundColor = '#cbc9c9';
        break;
      case 3:
        style.width = '100%';
        style.backgroundColor = '#8f8e8e';
        break;
    }
    return style;
  };

  return (
    <Box
      borderRadius={8}
      backgroundColor="rgba(0, 0, 0, 0.8)"
      position="absolute"
      top="0"
      boxShadow="lg"
      left="2.5%"
      margin="0 auto"
      width="95%"
      minHeight="600px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      zIndex={5}
    >
      <Box
        boxShadow="md"
        minHeight="350px"
        borderRadius={8}
        width={['95%', '80%']}
        p="1rem"
        margin="0 auto"
        maxWidth="650px"
        backgroundColor="#FFF"
        as="form"
      >
        <Box textAlign="right">
          <Button onClick={closeTagsTool} type="button">
            Close
          </Button>
        </Box>
        <Box mt={6} display="flex" alignItems="center">
          <FormControl>
            <FormHelperText textAlign="center">
              Use up to three tags to describe your post
            </FormHelperText>
            {error && <Text color="validationError.primary">{error}</Text>}
            <FormLabel pb={1.5} mb={0} ml={7} htmlFor="tags">
              Add tags
            </FormLabel>
            <Box justifyContent="center" display="flex" alignItems="center">
              <Input
                width="80%"
                id="tags"
                type="text"
                placeHolder="tags..."
                value={value}
                onChange={handleOnChange}
              />
              <Button
                disabled={tags.length === 3 ? true : false}
                type="button"
                onClick={handleOnClick}
                ml={3}
                variant="inputBtn"
              >
                Add
              </Button>
            </Box>
          </FormControl>
        </Box>
        <Text
          color="dark.secondary"
          fontSize="14px"
          margin="1.5rem auto 0 auto"
          textAlign="center"
          fontWeight="bold"
        >
          {tags.length}/3
        </Text>
        {tags.length === 3 ? (
          <Box display="flex" justifyContent="center">
            <Icon
              height="55px"
              width="55px"
              color="green.primary"
              as={AiOutlineCheckCircle}
            />
          </Box>
        ) : (
          <Box
            margin="0 auto 0 auto"
            border="1px solid #f1eaea"
            borderRadius={20}
            height="20px"
            width="200px"
          >
            <Box
              backgroundColor={progressBar().backgroundColor}
              height="100%"
              borderRadius={20}
              transition="width 0.3s ease-in"
              width={progressBar().width}
            ></Box>
          </Box>
        )}
        <Box p={1} mt="2.5rem">
          {tags.map(({ id, value }) => {
            return (
              <Tag
                id={id}
                key={id}
                value={value}
                handleRemoveTag={handleRemoveTag}
              />
            );
          })}
        </Box>
        {tags.length ? (
          <Box
            display="flex"
            margin="3rem auto 1rem auto"
            height="3px"
            borderRadius={8}
            backgroundColor="#f1ecec"
            boxShadow="md"
            width="25%"
          ></Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};
export default TagsForm;

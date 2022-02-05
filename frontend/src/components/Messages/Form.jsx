import {
  Box,
  Button,
  Text,
  Textarea,
  Heading,
  Select,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
const Form = ({ postId, authorId, firstName, closeModal, submitForm }) => {
  const initialName = { value: '', error: null, isError: false };
  const initialContact = { value: '', error: null, isOpen: false, isError: false };
  const initialMessage = { value: '', error: null, isError: false };

  const [name, setName] = useState(initialName);
  const [contact, setContact] = useState(initialContact);
  const [message, setMessage] = useState(initialMessage);
  const [contactSelection, setContactSelection] = useState(null);
  const [errors, setErrors] = useState([]);

  const applyErrors = (result) => {
    setErrors([]);
    if (!errors.length) {
      const newErrors = result.map((item) => item.msg);
      setErrors([...errors, ...newErrors]);
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validated()) {
        return;
      }

      const response = await axios({
        method: 'POST',
        url: '/api/v1/messages/',
        data: {
          post_id: postId,
          recipient_user_id: authorId,
          message: message.value,
          sender: name.value,
          contact: contact.value,
          type_contact: contactSelection,
        },
      });

      if (response.status === 201) {
        setName(initialName);
        setMessage(initialMessage);
        setContact(initialContact);
        setContactSelection(null);

        closeModal();
      }
    } catch (e) {
      if (e.response.status === 422) {
        applyErrors(e.response.data.detail);
      } else {
        applyErrors([{ msg: e.response.data.detail }]);
      }
    }
  };

  const validated = () => {
    return [message, contact, name].every((input) => !input.isError && input.value.trim().length);
  };
  const handleOnBlur = (type) => {
    const rules = {
      alphaNum: {
        regex: /^[0-9a-zA-Z ]+$/,
        msg: `${type} must only consist of letters and numbers.`,
      },
      noSpecialChars: {
        regex: /^[a-zA-Z0-9,\s,!'.]*$/,
        msg: `${type} must not include any special characters.`,
      },

      email: {
        regex: /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        msg: `${type} is not a valid email address`,
      },
      phone: {
        regex: /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
        msg: `${type} must be a valid phone number`,
      },
    };

    switch (type.toLowerCase()) {
      case 'name':
        setName({ ...name, error: null, isError: false });
        if (!name.value.match(rules['alphaNum'].regex)) {
          setName({ ...name, error: rules['alphaNum'].msg, isError: true });
        }
        break;
      case 'message':
        setMessage({ ...message, error: null, isError: false });
        if (!message.value.match(rules['noSpecialChars'].regex)) {
          setMessage({ ...message, error: rules['noSpecialChars'].msg, isError: true });
        } else if (message.value.trim().length > 500) {
          setMessage({ ...message, error: '500 character limit.', isError: true });
        }
        break;
      case 'other':
        setContact({ ...contact, error: null, isError: false });
        if (!contact.value.match(rules['alphaNum'].regex)) {
          setContact({ ...contact, error: rules['alphaNum'].msg, isError: true });
        } else if (contact.value.trim().length === 0 || contact.value.trim().length > 100) {
          setContact({
            ...contact,
            error: `${contactSelection} must be between 1 and 100 characters`,
            isError: true,
          });
        }
        break;
      case 'email':
        setContact({ ...contact, error: null, isError: false });
        if (!contact.value.match(rules['email'].regex)) {
          setContact({ ...contact, error: rules['email'].msg, isError: true });
        }
        break;
      case 'phone':
        setContact({ ...contact, error: null, isError: false });
        if (!contact.value.match(rules['phone'].regex)) {
          setContact({ ...contact, error: rules['phone'].msg, isError: true });
        }
        break;
      default:
    }
  };

  const handleOnChange = (value, type) => {
    switch (type) {
      case 'name':
        setName({ ...name, value });
        break;
      case 'message':
        setMessage({ ...message, value });
        break;
      case 'contact':
        let open = !value.length ? false : true;
        setContactSelection(value);
        setContact({ ...contact, isOpen: open, value: '' });
        break;
      default:
        setContact({ ...contact, value, isOpen: true });
        return;
    }
  };

  return (
    <Box onSubmit={handleOnSubmit} width={['95%', '95%', '650px']} p={0.5} as="form">
      <Box margin="0 auto" width="85%" p={0.5}>
        <Heading textAlign="center" my={3} fontSize="24px" color="dark.secondary" as="h3">
          Send {firstName} a message about their post
        </Heading>
        {errors.length > 0 ? (
          <Box margin="1.5rem auto">
            {errors.map((error, index) => {
              return (
                <Text
                  key={index}
                  textAlign="center"
                  fontSize="12px"
                  my={0.2}
                  color="gray.validationError"
                >
                  {error}
                </Text>
              );
            })}
          </Box>
        ) : (
          <></>
        )}
        <FormControl isInvalid={name.isError} my={2.5} isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            onBlur={() => handleOnBlur('name')}
            value={name.value}
            onChange={(e) => handleOnChange(e.target.value, 'name')}
            id="name"
            type="text"
            focusBorderColor="green.primary"
          />
          <FormErrorMessage>{name.error}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={message.isError} my={2.5} isRequired>
          <FormLabel htmlFor="message">Message</FormLabel>
          <Textarea
            value={message.value}
            onBlur={() => handleOnBlur('message')}
            onChange={(e) => handleOnChange(e.target.value, 'message')}
            id="message"
            focusBorderColor="green.primary"
          />
          <FormHelperText>Maximum of 500 characters</FormHelperText>
          <FormErrorMessage>{message.error}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={contact.isError} my={2.5}>
          <FormLabel htmlFor="selection">Contact</FormLabel>
          <Select
            id="selection"
            onChange={(e) => handleOnChange(e.target.value, 'contact')}
            iconColor="blue.primary"
            focusBorderColor="green.primary"
            placeholder="Select Type"
          >
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
        {contact.isOpen && (
          <FormControl isRequired isInvalid={contact.isError} my={2.5}>
            <FormLabel htmlFor="contact">{contactSelection}</FormLabel>
            <Input
              focusBorderColor="green.primary"
              value={contact.value}
              onBlur={() => handleOnBlur(contactSelection)}
              onChange={(e) => handleOnChange(e.target.value, contactSelection)}
              id="contact"
              type="text"
            />
            <FormErrorMessage>{contact.error}</FormErrorMessage>
          </FormControl>
        )}
      </Box>
      <Box my={3} display="flex" justifyContent="space-around">
        <Button type="submit" variant="main">
          send
        </Button>
        <Button onClick={closeModal} variant="cancelBtn">
          cancel
        </Button>
      </Box>
    </Box>
  );
};

export default Form;

import { Box, List } from '@chakra-ui/react';
import { useState } from 'react';
import Message from './Message.jsx';
import Modal from '../../Mixed/Modal';
import MessageView from './MessageView.jsx';

const MessageList = ({ markAsUnread, markAsRead, handleCheckedMessages, messages }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageToView, setMessageToView] = useState(null);

  const openModal = (messageId) => {
    const list = [...messages];
    setMessageToView(list.filter((message) => message.id === messageId)[0]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setMessageToView(null);
    setIsModalOpen(false);
  };

  return (
    <Box>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} rgba="rgba(0, 0, 0, 0.65)">
          <MessageView closeModal={closeModal} markAsRead={markAsRead} message={messageToView} />
        </Modal>
      )}
      <List>
        {messages.map((message) => {
          return (
            <Message
              handleCheckedMessages={handleCheckedMessages}
              markAsUnread={markAsUnread}
              openModal={openModal}
              key={message.id}
              message={message}
            />
          );
        })}
      </List>
    </Box>
  );
};

export default MessageList;

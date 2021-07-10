import React from 'react';
import { chakra, Flex, HStack, IconButton, Input } from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';

import ChatBubble from './ChatBubble';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { useParams } from 'react-router-dom';

const ChatMessages = ({ messages }) => {
  const [formValue, setFormValue] = useState('');
  const user = useSelector(({ firebase }) => ({
    ...firebase.auth,
    ...firebase.profile,
  }));
  const firestore = useFirestore();

  const { teamId } = useParams();

  // auto scroll
  const dummy = useRef();
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const { uid, displayName, photoURL } = user;
    const text = formValue;
    setFormValue('');

    // set the message object
    const message = {
      sentAt: firestore.FieldValue.serverTimestamp(),
      sentBy: {
        uid,
        photoURL,
        displayName,
      },
      text,
    };

    // update the message subcollecion inside team doc
    await firestore
      .collection('teams')
      .doc(teamId)
      .collection('messages')
      .add(message);

    // update the teams collection for recent message
    await firestore.collection('teams').doc(teamId).update({
      recentMessage: message,
      modifiedAt: firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <>
      <Flex
        px={6}
        overflowY="auto"
        flexDirection="column"
        css={{
          '&::-webkit-scrollbar': {
            width: '0.3rem',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1faee',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#457b9d',
            borderRadius: '24px',
          },
        }}
      >
        {messages?.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        <chakra.span ref={dummy}></chakra.span>
      </Flex>

      <Flex pl={4} pr={2} py={2} borderTopColor="gray.100" borderTopWidth={1}>
        <chakra.form onSubmit={handleSendMessage} w="100%">
          <HStack justifyContent="space-between">
            <Input
              value={formValue}
              required
              variant="flushed"
              focusBorderColor="brand.500"
              isRequired="true"
              placeholder="Type your message"
              onChange={(e) => setFormValue(e.target.value)}
            />
            <IconButton
              colorScheme="brand"
              aria-label="Send message"
              variant="ghost"
              icon={<IoSend />}
              type="submit"
            />
          </HStack>
        </chakra.form>
      </Flex>
    </>
  );
};

export default ChatMessages;

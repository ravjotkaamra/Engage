import React from 'react';
import { chakra, Flex, IconButton, Input } from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';

import ChatBubble from './ChatBubble';
import { useEffect, useRef, useState } from 'react';
const messages = [
  {
    message: 'Hey Travis! Would you like to go out for a coffee?',
    from: 'others',
    dateSent: '20:21',
  },
  {
    message: 'Sure! At 11:00 am?',
    from: 'me',
    dateSent: '20:22',
  },
  {
    message: "That's too early! How about at noon?",
    from: 'others',
    dateSent: '20:22',
  },
  {
    message: 'That sounds good as well. Where should we meet?',
    from: 'me',
    dateSent: '20:23',
  },
  {
    message: 'Meet me at the hardware store on 21 Duck Street.',
    from: 'others',
    dateSent: '20:23',
  },
  {
    message: "Sounds good. I'll bring my friend with me as well!",
    from: 'me',
    dateSent: '20:24',
  },
  {
    message: 'Which one? The developer or the designer?',
    from: 'others',
    dateSent: '20:24',
  },
  {
    message: 'The developer. You remember Tony, right?',
    from: 'me',
    dateSent: '20:24',
  },
  {
    message: "Yeah! Tony's a great guy!",
    from: 'others',
    dateSent: '20:25',
  },
  {
    message: 'Indeed he is! Alright, see you later 👋!',
    from: 'me',
    dateSent: '20:25',
  },
];

const ChatMessages = () => {
  const [formValue, setFormValue] = useState('');

  // auto scroll
  const dummy = useRef();
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <Flex px={6} overflowY="auto" flexDirection="column">
        {messages.map(({ message, from, dateSent }, index) => (
          <ChatBubble
            key={index}
            message={message}
            from={from}
            dateSent={dateSent}
          />
        ))}
        <chakra.span ref={dummy}></chakra.span>
      </Flex>

      <Flex pl={4} pr={2} py={2} borderTopColor="gray.100" borderTopWidth={1}>
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
        />
      </Flex>
    </>
  );
};

export default ChatMessages;

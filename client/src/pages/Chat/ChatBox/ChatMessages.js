import React from 'react';
import { chakra, Flex, HStack, IconButton, Input } from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';

import ChatBubble from './ChatBubble';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  sendMessageToTeam,
  sendMessageToTeamMeeting,
} from '../../../actions/teams/sendTextAction';

const ChatMessages = ({ messages }) => {
  // for sending messages
  const dispatch = useDispatch();
  // for taking message input
  const [formValue, setFormValue] = useState('');
  const { teamId, meetId } = useParams();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    // if meet id is defined it means that we are currently in a meeting
    // or chatting before or after meeting is over else we are just chatting
    // within a team or with a friend (private team)
    if (meetId) {
      dispatch(sendMessageToTeamMeeting(teamId, meetId, formValue));
    } else {
      dispatch(sendMessageToTeam(teamId, formValue));
    }
    setFormValue('');
  };

  // auto scroll
  const dummy = useRef();
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

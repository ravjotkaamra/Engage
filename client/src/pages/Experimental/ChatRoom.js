import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import ChatBox from './ChatBox';
import ChatMessage from './ChatMessage';
import '../../App.css';
import { chakra } from '@chakra-ui/react';

const ChatRoom = ({ teamId }) => {
  // connect to the firestore messages
  useFirestoreConnect([
    {
      collection: 'teams',
      doc: teamId,
      subcollections: [
        { collection: 'messages', orderBy: 'sentAt'},
      ],
      storeAs: 'messages',
    },
  ]);
  // get the messages from the redux store
  const messages = useSelector(
    ({ firestore: { ordered } }) => ordered.messages
  );
  console.log('messages :>> ', messages);

  // auto scroll
  const dummy = useRef();
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <chakra.section
      textAlign="center"
      maxWidth="728px"
      margin="0 auto"
      display="flex"
      flexDir="column"
      justifyContent="center"
      minHeight="100vh"
      backgroundColor="rgb(40, 37, 53)"
    >
      <chakra.main
        padding="10px"
        height="80vh"
        margin="10vh 0 10vh"
        overflowY="scroll"
        display="flex"
        flexDir="column"
        css={{
          '&::-webkit-scrollbar': {
            width: '0.3rem',
          },
          '&::-webkit-scrollbar-track': {
            background: '#1e1e24',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#765dbd',
            borderRadius: '24px',
          },
        }}
      >
        {messages?.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <chakra.span ref={dummy}></chakra.span>
      </chakra.main>
      <ChatBox teamId={teamId} />
    </chakra.section>
  );
};

export default ChatRoom;

import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import ChatBox from './ChatBox';
import ChatMessage from './ChatMessage';
import '../../App.css';

const ChatRoom = ({ teamId }) => {
  // connect to the firestore messages
  useFirestoreConnect([
    {
      collection: 'teams',
      doc: teamId,
      subcollections: [
        { collection: 'messages', orderBy: 'createdAt', limitToLast: '10' },
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
    <section className="chat-room">
      <main className="chat-content">
        {messages?.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <span ref={dummy}></span>
      </main>
      <ChatBox teamId={teamId} />
    </section>
  );
};

export default ChatRoom;

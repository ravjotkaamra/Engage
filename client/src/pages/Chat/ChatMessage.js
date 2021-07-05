import React from 'react';
import { useSelector } from 'react-redux';

const ChatMessage = (props) => {
  const { text, sentBy } = props.message;
  const user = useSelector((state) => state.firebase.auth);

  const messageClass = sentBy.uid === user.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img class="chat-avatar" src={sentBy.photoURL} alt="avatar" />
        <p class="chat-text">{text}</p>
      </div>
    </>
  );
};

export default ChatMessage;

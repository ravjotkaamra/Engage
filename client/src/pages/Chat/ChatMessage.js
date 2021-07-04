import React from 'react';
import { useSelector } from 'react-redux';

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;
  const user = useSelector((state) => state.firebase.auth);

  const messageClass = uid === user.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img class="chat-avatar" src={photoURL} alt="avatar" />
        <p class="chat-text">{text}</p>
      </div>
    </>
  );
};

export default ChatMessage;

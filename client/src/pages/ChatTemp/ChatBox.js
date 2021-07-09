import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

const ChatBox = ({ teamId }) => {
  const [formValue, setFormValue] = useState('');
  const auth = useSelector((state) => state.firebase.auth);
  const firestore = useFirestore();

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, displayName, photoURL } = auth;
    const text = formValue;
    setFormValue('');
    await firestore.collection('teams').doc(teamId).collection('messages').add({
      sentAt: firestore.FieldValue.serverTimestamp(),
      sentBy: {
        uid,
        photoURL,
        displayName,
      },
      text,
    });
  };

  return (
    <>
      <form className="chat-box" onSubmit={sendMessage}>
        <input
          className="chat-input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a new message"
        />

        <button className="chat-btn" type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
};

export default ChatBox;

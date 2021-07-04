import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';

const ChatBox = ({ teamId }) => {
  const [formValue, setFormValue] = useState('');
  const auth = useSelector((state) => state.firebase.auth);
  const firestore = useFirestore();

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth;
    const text = formValue;
    setFormValue('');
    await firestore.collection('teams').doc(teamId).collection('messages').add({
      text,
      createdAt: firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
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

        <button class="chat-btn" type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
};

export default ChatBox;

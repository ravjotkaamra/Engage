import { chakra, IconButton, Textarea } from '@chakra-ui/react';
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
      <chakra.form
        // height="10vh"
        position="fixed"
        bottom="0"
        bgColor="rgb(24, 23, 23)"
        width="100%"
        maxW="728px"
        display="flex"
        onSubmit={sendMessage}
      >
        <Textarea
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a new message"
          fontSize="lg"
          focusBorderColor="brand.500"
          color="white"
          px={2}
          py={6}
          resize="none"
          variant="flushed"
          isRequired="true"
        />

        <IconButton />
      </chakra.form>
    </>
  );
};

export default ChatBox;

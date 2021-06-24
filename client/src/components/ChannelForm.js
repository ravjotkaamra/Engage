import React from 'react';
import { Input } from '@chakra-ui/input';

const ChannelForm = ({ setInCall, setChannelName }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setInCall(true);
  };

  return (
    <form className="join" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button type="submit">Join</button>
    </form>
  );
};

export default ChannelForm;

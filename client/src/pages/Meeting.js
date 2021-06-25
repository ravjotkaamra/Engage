import React, { useState } from 'react';
import { Box, Heading, Container } from '@chakra-ui/layout';
import ChannelForm from '../components/ChannelForm';
import VideoCall from '../components/VideoCall';

const Meeting = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState('');

  return (
    <Container maxW="xl" centerContent>
      <Box>
        <Heading
          bgGradient="linear(to-l, #7928CA,#FF0080)"
          bgClip="text"
          fontSize="6xl"
          fontWeight="extrabold"
        >
          Video Chat
        </Heading>
        {inCall ? (
          <VideoCall setInCall={setInCall} channelName={channelName} />
        ) : (
          <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
        )}
      </Box>
    </Container>
  );
};

export default Meeting;

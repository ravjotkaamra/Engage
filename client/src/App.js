import React, { useState } from 'react';
import { Box, Heading, Container } from '@chakra-ui/layout';
import ChannelForm from './components/ChannelForm';
import VideoCall from './components/VideoCall';
// <Container maxW="xl" centerContent>
//   <Heading
//     bgGradient="linear(to-l, #7928CA,#FF0080)"
//     bgClip="text"
//     fontSize="6xl"
//     fontWeight="extrabold"
//   >
//     Video Chat
//   </Heading>
//   <Box className="join">
//     <ButtonGroup size={'lg'}>
//       <Button
//         onClick={() => dispatch(handleJoin())}
//         leftIcon={<PhoneIcon w={5} h={4} />}
//         colorScheme="pink"
//         variant="solid"
//       >
//         NEW MEETING
//       </Button>
//       <Button
//         onClick={() => dispatch(handleLeave())}
//         rightIcon={<CloseIcon w={5} h={3} />}
//         colorScheme="pink"
//         variant="outline"
//       >
//         LEAVE
//       </Button>
//     </ButtonGroup>
//   </Box>

//   <VideoConference />
// </Container>;

const App = () => {
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

export default App;

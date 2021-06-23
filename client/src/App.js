import React, { useEffect, useState } from 'react';
import Video from './components/Video';
import { Button, Box, Container, ButtonGroup, Heading } from '@chakra-ui/react';
import { PhoneIcon, CloseIcon } from '@chakra-ui/icons';
import agoraHelpers from './helpers/agora';

const App = () => {
  const [rtc, setRtc] = useState({});
  const [options, setOptions] = useState({});

  useEffect(() => {
    agoraHelpers.startVideoCall(setOptions);
  }, []);
  console.log('options :>> ', options);
  return (
    <Container maxW="xl" centerContent>
      <Heading
        bgGradient="linear(to-l, #7928CA,#FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        Video Chat
      </Heading>
      <Box className="join">
        <ButtonGroup size={'lg'}>
          <Button
            onClick={() => agoraHelpers.handleJoin(setRtc)}
            leftIcon={<PhoneIcon w={5} h={4} />}
            colorScheme="pink"
            variant="solid"
          >
            NEW MEETING
          </Button>
          <Button
            onClick={agoraHelpers.handleLeave}
            rightIcon={<CloseIcon w={5} h={3} />}
            colorScheme="pink"
            variant="outline"
          >
            LEAVE
          </Button>
        </ButtonGroup>
      </Box>
      {rtc.localVideoTrack && (
        <Video
          videoTrack={rtc.localVideoTrack}
          name="Lindsey James"
          id={options.uid.toString()}
        />
      )}
    </Container>
  );
};
export default App;

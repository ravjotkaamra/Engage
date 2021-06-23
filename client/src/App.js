import React, { useEffect } from 'react';
import { Button, Box, Container, ButtonGroup, Heading } from '@chakra-ui/react';
import { PhoneIcon, CloseIcon } from '@chakra-ui/icons';
import VideoConference from './components/VideoConference';
import {
  handleJoin,
  handleLeave,
  startVideoCall,
} from './actions/agoraActions';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startVideoCall('test'));
  }, [dispatch]);

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
            onClick={() => dispatch(handleJoin())}
            leftIcon={<PhoneIcon w={5} h={4} />}
            colorScheme="pink"
            variant="solid"
          >
            NEW MEETING
          </Button>
          <Button
            onClick={() => dispatch(handleLeave())}
            rightIcon={<CloseIcon w={5} h={3} />}
            colorScheme="pink"
            variant="outline"
          >
            LEAVE
          </Button>
        </ButtonGroup>
      </Box>

      <VideoConference />
    </Container>
  );
};
export default App;

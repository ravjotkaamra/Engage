import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useHistory, useParams } from 'react-router-dom';
import Skelton from './Skelton';
import { Box, createStandaloneToast, Heading } from '@chakra-ui/react';
import theme from '../theme';
import VideoCall from '../components/VideoCall';

const Conference = () => {
  const meetId = useParams().id;
  const history = useHistory();
  const toast = createStandaloneToast({ theme });
  const user = useSelector((state) => state.firebase.auth);

  // sync meetings collection from Firestore into redux
  useFirestoreConnect([
    {
      collection: 'meetings',
      doc: meetId,
    },
  ]);
  // Get the meeting from redux state
  const meeting = useSelector(
    ({ firestore: { data } }) => data.meetings && data.meetings[meetId]
  );
  console.log('meeting :>> ', meeting);

  // Show skelton while meeting is loading
  if (!isLoaded(meeting)) {
    return <Skelton />;
  }
  // Show errormessage if there is no such meeting
  if (isEmpty(meeting)) {
    history.push('/meet');
    toast({
      title: 'Wrong URL',
      description: 'Please enter the correct meeting url',
      status: 'error',
      position: 'top',
      duration: 4000,
      isClosable: true,
      variant: 'top-accent',
    });
    return null;
  }

  // check if the user is invited to the current meeting
  const isInvited =
    meeting.host.email === user.email ||
    (meeting.participants &&
      meeting.participants.find((p) => p.email === user.email));

  if (!isInvited) {
    history.push('/meet');
    toast({
      title: 'Sorry host has not invited you',
      description: 'Please contact the host for invitation link!',
      status: 'warning',
      position: 'top',
      duration: 4000,
      isClosable: true,
      variant: 'top-accent',
    });
    return null;
  }

  return (
    <Box>
      <Heading>Hey Welcome to the meeting!</Heading>;
      <VideoCall channelName={meetId} />
    </Box>
  );
};

export default Conference;

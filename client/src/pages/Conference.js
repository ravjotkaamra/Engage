import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useHistory, useParams } from 'react-router-dom';
import Skelton from './Skelton';
import { Box, Center, createStandaloneToast } from '@chakra-ui/react';
import theme from '../theme';
import VideoCall from '../components/VideoCall';
import InviteBtn from '../components/InviteBtn';

const Conference = () => {
  const { meetId, teamId } = useParams();
  const history = useHistory();
  const toast = createStandaloneToast({ theme });
  const { uid: loggedInUid } = useSelector((state) => state.firebase.auth);
  const { teams: myTeams } = useSelector((state) => state.firebase.profile);

  // sync meetings sub-collection withing teams supercollection from Firestore into redux
  useFirestoreConnect([
    {
      collection: 'teams',
      doc: teamId,
      subcollections: [{ collection: 'meetings', doc: meetId }],
      storeAs: 'meeting',
    },
  ]);

  // Get the meeting from redux state
  const { meeting } = useSelector(({ firestore }) => firestore.data);
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
    myTeams.find((tid) => tid === teamId) ||
    meeting.invitees.find((inviteeId) => inviteeId === loggedInUid);

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
    <Box h="100vh" bg="gray.800">
      <Center>
        <Center>
          <InviteBtn teamId={teamId} meetId={meetId} />
        </Center>
      </Center>
      <Center>
        <Box className="conference" border="1px">
          <VideoCall channelName={meetId} />
        </Box>
      </Center>
    </Box>
  );
};

export default Conference;

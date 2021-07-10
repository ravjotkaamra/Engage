import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
const toast = createStandaloneToast({ theme });

let toastObj = {
  position: 'top',
  duration: 5000,
  isClosable: true,
  variant: 'left-accent',
};

export const createNewTeamMeeting = (teamId, history) => {
  return async (dispatch, getState, { getFirestore }) => {
    // getting state from redux store
    const state = getState();

    // getting firestore object for accessing 'meetings' sub-collection inside teams
    const firestore = getFirestore();

    // getting user id of the logged in user and
    const uid = state.firebase.auth.uid;

    // creating a new meeting with following info
    const meeting = {
      name: 'Meeting',
      createdBy: uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
      teamId,
      invitees: [],
      recentMessage: {},
    };

    // send a post request to the firestore teams meeting subcollection to create a new meeting
    try {
      const response = await firestore
        .collection('teams')
        .doc(teamId)
        .collection('meetings')
        .add(meeting);

      history.push(`/join/meet/${response.id}/teams/${teamId}`);
      // send a notification alert on to the screen
      toast({
        title: 'Meeting created',
        description: 'Click on invite button to meet your friends',
        status: 'success',
        ...toastObj,
      });
      console.log('response :>> ', response.id);
    } catch (error) {
      console.log('error :>> ', error);
      toast({
        title: 'Unexpected error',
        description: 'Please check your internet connection',
        status: 'error',
        ...toastObj,
      });
    }
  };
};

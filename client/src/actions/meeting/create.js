import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
const toast = createStandaloneToast({ theme });

export const createNewMeeting = (history) => {
  return async (dispatch, getState, { getFirestore }) => {
    // getting state from redux store
    const state = getState();
    // getting firestore object for accessing 'meetings' collection
    const firestore = getFirestore();
    // getting user id of the logged in user
    const uid = state.firebase.auth.uid;
    // getting email id and name of the logged in user
    const { email, displayName } = state.firebase.profile;
    // for displaying alerts on to the screen
    let toastObj;
    // creating a new meeting with following info
    const meeting = {
      name: 'Meeting',
      host: { uid, email, name: displayName },
      participants: null,
    };
    // console.log('firebase :>> ', firebase);
    // send a post request to the firebase collection to create a new meeting
    try {
      const response = await firestore.collection('meetings').add(meeting);
      history.push(`/join/meet/${response.id}`);
      toastObj = {
        title: 'Meeting created',
        description: 'Click on invite button to meet your friends',
        status: 'success',
      };
      console.log('response :>> ', response.id);
    } catch (error) {
      console.log('error :>> ', error);
      toastObj = {
        title: 'Unexpected error',
        description: 'Please check your internet connection',
        status: 'error',
      };
    }

    // send a notification alert on to the screen
    toast({
      ...toastObj,
      position: 'top',
      duration: 5000,
      isClosable: true,
      variant: 'left-accent',
    });
  };
};

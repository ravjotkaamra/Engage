import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
const toast = createStandaloneToast({ theme });

// props for sending toasts
let toastProps = {
  position: 'top',
  duration: 4000,
  isClosable: true,
  variant: 'left-accent',
};

export const joinTeam = (teamId) => {
  return async (dispatch, getState, { getFirestore }) => {
    // getting firestore object for accessing 'teams' collection
    const firestore = getFirestore();

    // getting user id of the logged in user
    const uid = getState().firebase.auth.uid;

    // send a post request to the firebase collection to add a new member to the team
    try {
      await firestore
        .collection('teams')
        .doc(teamId)
        .update({
          members: firestore.FieldValue.arrayUnion(uid),
        });

      // indicate to the user that he is a part of a new team
      await firestore
        .collection('users')
        .doc(uid)
        .update({
          teams: firestore.FieldValue.arrayUnion(teamId),
        });

      // send a notification alert on to the screen
      toast({
        title: 'Success',
        description: 'Welcome to the team!',
        status: 'success',
        ...toastProps,
      });
    } catch (error) {
      console.log('error :>> ', error);
      toast({
        title: 'Error',
        description: 'Please check team invite code again',
        status: 'error',
        ...toastProps,
      });
    }
  };
};

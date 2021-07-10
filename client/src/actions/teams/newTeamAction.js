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

export const createNewTeam = (teamName, description) => {
  return async (dispatch, getState, { getFirestore }) => {
    // getting firestore object for accessing 'teams' collection
    const firestore = getFirestore();

    // getting user id of the logged in user
    const uid = getState().firebase.auth.uid;

    // send a post request to the firebase collection to create a new team
    try {
      const team = await firestore.collection('teams').add({
        name: teamName,
        description,
        isPrivate: false,
        createdBy: uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        members: [uid],
        recentMessage: {}
      });

      console.log('response :>> ', team.id);
      // indicate to the user that he is a part of a new team
      await firestore
        .collection('users')
        .doc(uid)
        .update({
          teams: firestore.FieldValue.arrayUnion(team.id),
        });

      // send a notification alert on to the screen
      toast({
        title: 'Created Successfully',
        description: 'New Team created, click on the team to get started',
        status: 'success',
        ...toastProps,
      });
    } catch (error) {
      console.log('error :>> ', error);
      toast({
        title: 'Error',
        description: 'Sorry an unexpected error orccured, please try again',
        status: 'error',
        ...toastProps,
      });
    }
  };
};

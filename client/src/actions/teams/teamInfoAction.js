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

export const updateTeamDescription = (teamId, description, onCancel) => {
  return async (dispatch, getState, { getFirestore }) => {
    // getting firestore object for accessing 'teams' collection
    const firestore = getFirestore();

    // send a post request to the firebase collection to update description
    try {
      await firestore.collection('teams').doc(teamId).update({
        description,
      });

      // close the Popover form if successfull
      onCancel();
      // send a notification alert on to the screen
      toast({
        title: 'Updated',
        description: "Team's description successfully updated",
        status: 'success',
        ...toastProps,
      });
    } catch (error) {
      console.log('error :>> ', error);
      toast({
        title: 'Error',
        description: 'Sorry description could not be updated',
        status: 'error',
        ...toastProps,
      });
    }
  };
};

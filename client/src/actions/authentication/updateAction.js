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
export const updateProfile = (userId, name, bio, avatarUrl) => {
  return async (dispatch, getState, { getFirestore }) => {
    // getting firestore object for accessing 'teams' collection
    const firestore = getFirestore();

    try {
      await firestore.collection('users').doc(userId).update({
        name,
        bio,
        avatarUrl,
      });
      console.log('profile updated succesffullu :>> ');
      toast({
        title: 'Updated',
        description: 'Profile updated successfully',
        status: 'success',
        ...toastProps,
      });
    } catch (error) {
      console.log('error :>> ', error);
      toast({
        title: 'Please try again',
        description: 'Sorry profile could not get updated',
        status: 'error',
        ...toastProps,
      });
    }
  };
};

import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
// for setting the notification alerts on success or error
const toast = createStandaloneToast({ theme });

export const signInWithGoogle = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    let toastObj;
    try {
      await firebase.login({
        provider: 'google',
        type: 'popup',
      });
      const name = getState().firebase.profile.displayName;
      toastObj = {
        title: 'Logged in',
        description: `Welcome ${name}!`,
        status: 'success',
      };
    } catch (error) {
      console.log('trouble google signin: >>', error);
      toastObj = {
        title: 'Unexpected error',
        description: 'Could not complete logging in',
        status: 'warning',
      };
    }

    toast({
      ...toastObj,
      duration: 5000,
      isClosable: true,
      variant: 'left-accent',
    });
  };
};

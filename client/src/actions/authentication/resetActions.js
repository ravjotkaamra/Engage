import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
// for setting the notification alerts on success or error
const toast = createStandaloneToast({ theme });

export const resetPasswordWithEmail = (email) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    let toastObj;
    try {
      await firebase.resetPassword(email);
      toastObj = {
        title: 'Success',
        description: `Sent reset link to ${email}`,
        status: 'success',
      };
    } catch (error) {
      console.log('trouble resetting password: >>', error);
      toastObj = {
        title: 'Wrong Email',
        description: 'Please enter the correct email address',
        status: 'error',
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

import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
const toast = createStandaloneToast({ theme });

export const signup = (email, password, displayName) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    let toastObj;
    try {
      // use firebase object to create new account with email and password
      const userCredential = await firebase.createUser(
        { email, password },
        { displayName, email }
      );
      const name = getState().firebase.profile.displayName;
      toastObj = {
        title: 'Account created',
        description: `Welcome ${name}!`,
        status: 'success',
      };
      console.log('user information: >>', userCredential);
    } catch (error) {
      console.log('trouble signup', error);
      toastObj = {
        title: 'Wrong Credentials',
        description: 'Wrong email or password is too short',
        status: 'error',
      };
    }

    toast({
      ...toastObj,
      position: 'top',
      duration: 5000,
      isClosable: true,
      variant: 'left-accent',
    });
  };
};

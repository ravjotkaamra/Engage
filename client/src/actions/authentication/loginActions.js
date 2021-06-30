import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
const toast = createStandaloneToast({ theme });

export const login = (email, password) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    let toastObj;
    try {
      // use firebase object to login with email and password
      const userCredential = await firebase.login({ email, password });
      const name = getState().firebase.auth.displayName;
      toastObj = {
        title: 'Logged in',
        description: `Welcome ${name}!`,
        status: 'success',
      };
      console.log('user information: >>', userCredential);
    } catch (error) {
      toastObj = {
        title: 'Wrong Credentials',
        description: 'Wrong email or password is incorrect',
        status: 'error',
      };
      console.log('trouble signing in', error);
    }
    toast({
      ...toastObj,
      duration: 5000,
      isClosable: true,
      variant: 'left-accent',
    });
  };
};

export const logout = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase.logout();
      console.log('user successfully logged out');
    } catch (error) {
      console.log('trouble logging out', error);
    }
  };
};

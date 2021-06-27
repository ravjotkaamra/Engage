import { setNotification } from '../notifyActions';
import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
const toast = createStandaloneToast({ theme });

export const login = (email, password) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    try {
      // use firebase object to login with email and password
      const userCredential = await firebase.login({ email, password });
      const name = getState().firebase.profile.displayName;
      const notification = {
        message: `Welcome ${name}!`,
        type: 'success',
        timeout: 5000,
      };
      dispatch(setNotification(notification));
      console.log('user information: >>', userCredential);
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to create user account.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      const notification = {
        message: 'Wrong Email or Password',
        type: 'failure',
        timeout: 5000,
      };
      dispatch(setNotification(notification));
      console.log('trouble signing in', error);
    }
  };
};

export const logout = () => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    try {
      await firebase.logout();
      console.log('user successfully logged out');
    } catch (error) {
      console.log('trouble logging out', error);
    }
  };
};

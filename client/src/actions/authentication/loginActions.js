import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
const toast = createStandaloneToast({ theme });

export const login = (email, password) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      // use firebase object to login with email and password
      const userCredential = await firebase.login({ email, password });

      console.log('user information: >>', userCredential);
    } catch (error) {
      toast({
        title: 'Wrong Credentials',
        description: 'Wrong email or password is incorrect',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
        variant: 'left-accent',
      });
      console.log('trouble signing in', error);
    }
  };
};

export const logout = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase.logout();
      dispatch({
        type: '@@reduxFirestore/CLEAR_DATA',
        preserve: { data: ['users'], ordered: ['users'] },
      });
      console.log('user successfully logged out');
    } catch (error) {
      console.log('trouble logging out', error);
    }
  };
};

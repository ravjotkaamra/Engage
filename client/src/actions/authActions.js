import { setNotification } from './noitifyActions';

export const login = (email, password) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    try {
      const userCredential = await firebase.login({ email, password });
      // set a notification for 5 seconds
      setNotification(
        {
          message: `Welcome ${firebase.auth.displayName}`,
          type: 'success',
        },
        5000
      );
      console.log('user information: >>', userCredential);
    } catch (error) {
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

import { setNotification } from '../notifyActions';

export const login = (email, password) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    try {
      // use firebase object to login with email and password
      console.log('firebase :>> ', firebase.login);
      console.log('typeof(firebase) :>> ', typeof(firebase));
      const userCredential = await firebase.login({ email, password });
      const notification = {
        message: `Welcome ${userCredential.user.user.displayName}!`,
        type: 'success',
        timeout: 5000,
      };
      dispatch(setNotification(notification));
      console.log('user information: >>', userCredential);
    } catch (error) {
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

import { setNotification } from '../notifyActions';

export const signup = (email, password, displayName) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    try {
      // use firebase object to create new account with email and password
      const userCredential = await firebase.createUser(
        { email, password },
        { displayName, email }
      );

      const notification = {
        message: 'Your account was registered',
        type: 'success',
        timeout: 5000,
      };
      dispatch(setNotification(notification));
      console.log('user information: >>', userCredential);
    } catch (error) {
      const notification = {
        message: 'Wrong email or password too weak',
        type: 'failure',
        timeout: 5000,
      };
      dispatch(setNotification(notification));
      console.log('trouble signup', error);
    }
  };
};

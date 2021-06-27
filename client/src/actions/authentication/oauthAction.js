import { setNotification } from '../notifyActions';

export const signInWithGoogle = () => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    try {
      await firebase.login({
        provider: 'google',
        type: 'popup',
      });
      const name = getState().firebase.profile.displayName;
      const notification = {
        message: `Welcome ${name}!`,
        type: 'success',
        timeout: 5000,
      };
      dispatch(setNotification(notification));
    } catch (error) {
      console.log('trouble google signin: >>', error);
    }
  };
};

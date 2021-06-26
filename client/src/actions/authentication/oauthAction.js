import { setNotification } from '../notifyActions';

export const signInWithGoogle = () => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    try {
      console.log('fine 1');
      await firebase.login({
        provider: 'google',
        type: 'popup',
      });
      console.log('fine 2');
      const name = getState().firebase.auth.displayName||"helloworld";
      console.log('fine every')
      const notification = {
        message: `Welcome ${name}!`,
        type: 'success',
        timeout: 5000,
      };
      setNotification(notification);
    } catch (error) {
      const notification = {
        message: "Sorry couldn't finish the login!",
        type: 'warning',
        timeout: 5000,
      };
      dispatch(setNotification(notification));
      console.log('trouble google signin: >>', error);
    }
  };
};

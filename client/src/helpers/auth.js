import { auth } from '../services/firebase';

export const signup = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const signin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signInWithGoogle = (firebase) => {
  return firebase.login({
    provider: 'google',
    type: 'popup',
  });
};

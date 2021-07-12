import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
const toast = createStandaloneToast({ theme });

// props for sending toasts
let toastProps = {
  position: 'top',
  duration: 4000,
  isClosable: true,
  variant: 'left-accent',
};

export const createNewTeam = (teamName, description) => {
  return async (dispatch, getState, { getFirestore }) => {
    // getting firestore object for accessing 'teams' collection
    const firestore = getFirestore();

    // getting user id of the logged in user
    const uid = getState().firebase.auth.uid;

    // send a post request to the firebase collection to create a new team
    try {
      const team = await firestore.collection('teams').add({
        name: teamName,
        description,
        isPrivate: false,
        createdBy: uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        members: [uid],
        recentMessage: {},
      });

      console.log('response :>> ', team.id);
      // indicate to the user that he is a part of a new team
      await firestore
        .collection('users')
        .doc(uid)
        .update({
          teams: firestore.FieldValue.arrayUnion(team.id),
        });

      // send a notification alert on to the screen
      toast({
        title: 'Created Successfully',
        description: 'New Team created, click on the team to get started',
        status: 'success',
        ...toastProps,
      });
    } catch (error) {
      console.log('error :>> ', error);
      toast({
        title: 'Error',
        description: 'Sorry an unexpected error orccured, please try again',
        status: 'error',
        ...toastProps,
      });
    }
  };
};

export const createPrivateChat = (friendId, history) => {
  return async (dispatch, getState, { getFirestore }) => {
    const state = getState();

    // getting firestore object for accessing 'teams' collection
    const firestore = getFirestore();

    // getting user id of the logged in user
    const uid = state.firebase.auth.uid;

    const { teams } = state.firestore.data;

    const privateChatRoom = teams
      ? Object.entries(teams)
          .map(([teamId, team]) => team)
          .filter((team) => team.isPrivate)
          .find(({ members }) => members.includes(friendId))
      : false;

    // if the private chat room already exists just take to the url
    if (privateChatRoom) {
      history.push(`/chat/${privateChatRoom.id}`);
      return;
    }

    // send a post request to the firebase collection to create a new team
    try {
      const privateChatRoom = await firestore.collection('teams').add({
        name: 'Personal Chat',
        isPrivate: true,
        createdBy: uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        members: [uid, friendId],
        recentMessage: {},
      });

      console.log('response :>> ', privateChatRoom.id);
      // indicate to the logged in user that he is a part of private chat
      await firestore
        .collection('users')
        .doc(friendId)
        .update({
          teams: firestore.FieldValue.arrayUnion(privateChatRoom.id),
        });

      // indicate to the friend too that he is a part of private chat
      await firestore
        .collection('users')
        .doc(uid)
        .update({
          teams: firestore.FieldValue.arrayUnion(privateChatRoom.id),
        });

      history.push(`/chat/${privateChatRoom.id}`);
    } catch (error) {
      console.log('error :>> ', error);
      toast({
        title: 'Error',
        description: 'Sorry an unexpected error orccured, please try again',
        status: 'error',
        ...toastProps,
      });
    }
  };
};

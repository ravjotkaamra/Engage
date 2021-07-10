export const sendMessageToTeam = (teamId, text) => {
  return async (dispatch, getState, { getFirestore }) => {
    // get redux global state
    const state = getState();
    // get current logged in user details
    const user = { ...state.firebase.auth, ...state.firebase.profile };
    const { uid, displayName, photoURL } = user;

    // get firestore object for sending message to database
    const firestore = getFirestore();

    // set the message object
    const message = {
      sentAt: firestore.FieldValue.serverTimestamp(),
      sentBy: {
        uid,
        photoURL,
        displayName,
      },
      text,
    };

    try {
      // update the message subcollection inside team doc
      await firestore
        .collection('teams')
        .doc(teamId)
        .collection('messages')
        .add(message);

      // update the teams collection for recent message
      await firestore.collection('teams').doc(teamId).update({
        recentMessage: message,
        modifiedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log('sorry message to the team could not be sent :>> ', error);
    }
  };
};

export const sendMessageToTeamMeeting = (teamId, meetId, text) => {
  return async (dispatch, getState, { getFirestore }) => {
    // get redux global state
    const state = getState();
    // get current logged in user details
    const user = { ...state.firebase.auth, ...state.firebase.profile };
    const { uid, displayName, photoURL } = user;

    // get firestore object for sending message to database
    const firestore = getFirestore();

    // set the message object
    const message = {
      sentAt: firestore.FieldValue.serverTimestamp(),
      sentBy: {
        uid,
        photoURL,
        displayName,
      },
      text,
    };

    try {
      // update the meeting's message subcollection inside team doc
      await firestore
        .collection('teams')
        .doc(teamId)
        .collection('meetings')
        .doc(meetId)
        .collection('messsages')
        .add(message);

      // update the meetings sub-collection for recent message
      await firestore
        .collection('teams')
        .doc(teamId)
        .collection('meetings')
        .doc(meetId)
        .update({
          recentMessage: message,
          modifiedAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.log('sorry message to the meeting could not be sent :>> ', error);
    }
  };
};

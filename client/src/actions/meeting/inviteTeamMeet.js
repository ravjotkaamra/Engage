import emailjs from 'emailjs-com';
import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
const toast = createStandaloneToast({ theme });

// emailjs configurations
const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const userID = process.env.REACT_APP_EMAILJS_USER_ID;

// props for sending toasts
let toastProps = {
  position: 'top',
  duration: 4000,
  isClosable: true,
  variant: 'left-accent',
};

export const inviteToTeamMeet = (teamId, meetId, to_email) => {
  return async (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const firestore = getFirestore();
    const { email: from_email, displayName: from_name } = state.firebase.auth;

    try {
      // check if email is correct
      const invitee = state.firestore.ordered.users?.find(
        (user) => user.email === to_email
      );
      if (!invitee) {
        throw new Error('email id of invitee is incorrect');
      }

      // email message content
      const url = window.location.href;
      const templateParams = {
        from_name,
        from_email,
        url,
        to_email,
      };

      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        userID
      );

      // send an alert to the user
      toast({
        title: 'Invite sent',
        description: `Invitation sent successfully to ${to_email}`,
        status: 'success',
        ...toastProps,
      });
      console.log('email sent successfully :>> ', response);

      // update the database to indicate that the user is invited
      await firestore
        .collection('teams')
        .doc(teamId)
        .collection('meetings')
        .doc(meetId)
        .update({
          invitees: firestore.FieldValue.arrayUnion(invitee.id),
        });
    } catch (error) {
      console.log('error :>> ', error);
      toast({
        title: 'Invite failed',
        description: 'Please check the email address',
        status: 'error',
        ...toastProps,
      });
    }
  };
};

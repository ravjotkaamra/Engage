import emailjs from 'emailjs-com';
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

// emailjs configurations
const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateID = 'template_1v83srn';
const userID = process.env.REACT_APP_EMAILJS_USER_ID;

export const sendTeamInvite = (team_id, invitees) => {
  return async (dispatch, getState, { getFirestore }) => {
    const state = getState();
    const { email: from_email, displayName: from_name } = {
      ...state.firebase.auth,
      ...state.firebase.profile,
    };
    const url = window.location.href;

    try {
      // send email to all ivnitees
      invitees.forEach(async (invitee) => {
        // email message content
        const templateParams = {
          from_name,
          from_email,
          to_email: invitee.email,
          team_id,
          url,
        };
        await emailjs.send(serviceID, templateID, templateParams, userID);
      });

      // send an alert to the user
      toast({
        title: 'Invite sent',
        description: `Team invitation succefully sent!`,
        status: 'success',
        ...toastProps,
      });
    } catch (error) {
      console.log('error :>> ', error);
      toast({
        title: 'Invite failed',
        description: 'Sorry an error occured please try again',
        status: 'error',
        ...toastProps,
      });
    }
  };
};

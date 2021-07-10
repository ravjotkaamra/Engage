import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { useHistory, useParams } from 'react-router-dom';
import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
import ChatRoom from './ChatRoom';
const toast = createStandaloneToast({ theme });

const ChatRouteHandler = () => {
  const { teamId } = useParams();
  const history = useHistory();

  // get all the teams which the current logged in user is a part of
  const { teams: teamsObj } = useSelector(({ firestore }) => firestore.data);
  if (!isLoaded(teamsObj)) {
    return <div>Loading...</div>;
  }
  
  // if there is no friend with the teamId send an alert
  const team = teamsObj ? teamsObj[teamId] : null;
  if (!team) {
    toast({
      title: 'Wrong Url',
      description: 'User does not exist, please check the url',
      status: 'info',
      position: 'top',
      duration: 4000,
      isClosable: true,
      variant: 'left-accent',
    });
    history.push('/chat');
    return null;
  }
  // convert the teams object into teams array for easy iteration
  const myTeams = Object.entries(teamsObj).map(([key, val]) => val);

  return <ChatRoom myTeams={myTeams} team={team} />;
};

export default ChatRouteHandler;

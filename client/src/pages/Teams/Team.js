import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatRoom from '../Chat/ChatRoom';
import JoinTeamAlert from './JoinTeamAlert';

const Team = () => {
  const { teamId } = useParams();

  // check whether the logged in user is a part of this team or not
  const myTeams = useSelector(({ firebase }) => firebase.profile.teams);
  console.log('myTeams :>> ', myTeams);
  const amIPartOfThisTeam = myTeams?.find((tid) => tid === teamId);

  // if the user is not a part of this team give him an option to join the team
  if (!amIPartOfThisTeam) {
    return <JoinTeamAlert teamId={teamId} />;
  }

  return <ChatRoom teamId={teamId} />;
};

export default Team;

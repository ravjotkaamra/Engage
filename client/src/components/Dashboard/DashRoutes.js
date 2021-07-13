import { Switch } from 'react-router';
import React from 'react';
import Meet from '../../pages/Meet';
import { Route } from 'react-router-dom';
import Teams from '../../pages/Teams/Main/Teams';
import TeamRoom from '../../pages/Teams/Main/TeamRoom';
import ChatRoom from '../../pages/Chat/ChatRoom';
import Profile from '../../pages/Profile/Profile';

const DashRoutes = () => {
  return (
    <Switch>
      <Route path="/meet">
        <Meet />
      </Route>
      <Route path="/chat" exact>
        <ChatRoom />
      </Route>
      <Route path="/chat/:teamId" exact>
        <ChatRoom />
      </Route>
      <Route path="/chat/:teamId/meet/:meetId" exact>
        <ChatRoom />
      </Route>
      <Route path="/teams" exact>
        <Teams />
      </Route>
      <Route path="/teams/:teamId" exact>
        <TeamRoom />
      </Route>
      <Route path="/profile/:profileId" exact>
        <Profile />
      </Route>
    </Switch>
  );
};

export default DashRoutes;

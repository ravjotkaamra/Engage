import { Switch } from 'react-router';
import React from 'react';
import Meet from '../../pages/Meet';
import { Route } from 'react-router-dom';
import Teams from '../../pages/Teams/Teams';
import TeamRoom from '../../pages/Teams/TeamRoom';
import ChatTemp from '../../pages/Chat/ChatTemp';
import Profile from '../../pages/Profile/Profile';

const DashRoutes = () => {
  return (
    <Switch>
      <Route path="/meet">
        <Meet />
      </Route>
      <Route path="/chat" exact>
        <ChatTemp />
      </Route>
      <Route path="/chat/:teamId" exact>
        <ChatTemp />
      </Route>
      <Route path="/chat/:teamId/meet/:meetId" exact>
        <ChatTemp />
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

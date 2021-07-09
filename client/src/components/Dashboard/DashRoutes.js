import { Switch } from 'react-router';
import React from 'react';
import Meet from '../../pages/Meet';
import { Route } from 'react-router-dom';
import Teams from '../../pages/Teams/Teams';
import TeamRoom from '../../pages/Teams/TeamRoom';
import ChatRoom from '../../pages/Chat/ChatRoom';

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
      <Route path="/teams" exact>
        <Teams />
      </Route>
      <Route path="/teams/:teamId" exact>
        <TeamRoom />
      </Route>
    </Switch>
  );
};

export default DashRoutes;

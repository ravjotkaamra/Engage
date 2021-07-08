import { Switch } from 'react-router';
import React from 'react';
import Meet from '../../pages/Meet';
import { Route } from 'react-router-dom';
import ChatRoom from '../../pages/Chat/ChatRoom';
import Teams from '../../pages/Teams/Teams';
import Team from '../../pages/Teams/Team';

const DashRoutes = () => {
  return (
    <Switch>
      <Route path="/meet">
        <Meet />
      </Route>
      <Route path="/chat">
        <ChatRoom teamId="oSxBnr3cKzREXcmEtOgV" />
      </Route>
      <Route path="/teams" exact>
        <Teams />
      </Route>
      <Route path="/teams/:teamId" exact>
        <Team />
      </Route>
    </Switch>
  );
};

export default DashRoutes;

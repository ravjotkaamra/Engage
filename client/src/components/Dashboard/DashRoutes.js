import { Switch } from 'react-router';
import React from 'react';
import Meet from '../../pages/Meet';
import { Route } from 'react-router-dom';
import ChatRoom from '../../pages/Chat/ChatRoom';
import Teams from '../../pages/Teams/Teams';

const DashRoutes = () => {
  return (
    <Switch>
      <Route path="/meet">
        <Meet />
      </Route>
      <Route path="/chat">
        <ChatRoom teamId="oSxBnr3cKzREXcmEtOgV" />
      </Route>
      <Route path="/teams">
        <Teams />
      </Route>
    </Switch>
  );
};

export default DashRoutes;

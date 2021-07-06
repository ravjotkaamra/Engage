import { Switch } from 'react-router';
import React from 'react';
import Meet from '../../pages/Meet';
import { Route } from 'react-router-dom';

const DashRoutes = () => {
  return (
    <Switch>
      <Route path="/meet">
        <Meet />
      </Route>
      <Route path="/chat">
        {/* <Chat /> */}i am the chat
        </Route>
      <Route path="/teams"> 
      {/* <Chat /> */}iteams here
      </Route>
    </Switch>
  );
};

export default DashRoutes;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';

import Home from './pages/Home';
import Skelton from './pages/Skelton';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import Conference from './pages/Video/Meeting/Conference';

import Navbar from './components/Header/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const authenticated = isLoaded(auth) && !isEmpty(auth);

  if (!isLoaded(auth)) {
    return <Skelton />;
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Box>
          <Navbar authenticated={authenticated} />
          <Home />
        </Box>
      </Route>
      <Route path="/about" exact>
        <Box>
          <Navbar authenticated={authenticated} />
          <Box>
            This project is made by Ravjot Singh under Microsoft Engage 2021
          </Box>
        </Box>
      </Route>
      
      <PublicRoute path="/login" authenticated={authenticated}>
        <Login />
      </PublicRoute>
      <PublicRoute path="/signup" authenticated={authenticated}>
        <Signup />
      </PublicRoute>
      <PublicRoute path="/reset" authenticated={authenticated}>
        <ForgotPassword />
      </PublicRoute>

      <PrivateRoute
        path="/join/meet/:meetId/teams/:teamId"
        authenticated={authenticated}
      >
        <Conference />
      </PrivateRoute>

      <PrivateRoute authenticated={authenticated}>
        <Dashboard />
      </PrivateRoute>
    </Switch>
  );
};

export default App;

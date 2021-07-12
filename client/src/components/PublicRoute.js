import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ children, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? children : <Redirect to="/teams" />
      }
    />
  );
};
export default PublicRoute;

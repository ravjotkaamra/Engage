import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authenticated === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.firebase.auth);
  const authenticated = isLoaded(auth) && !isEmpty(auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? children : <Redirect to="/meet" />
      }
    />
  );
};
export default PublicRoute;

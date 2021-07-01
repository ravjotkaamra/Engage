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

// import { createStandaloneToast } from '@chakra-ui/react';
// import theme from '../theme';

// const toast = createStandaloneToast({ theme });
//   if (!authenticated) {
//     toast({
//       title: 'You are not logged in',
//       description: 'Please login or create a new account to continue',
//       status: 'info',
//       position: 'top',
//       duration: 4000,
//       isClosable: true,
//       variant: 'top-accent',
//     });
//   }

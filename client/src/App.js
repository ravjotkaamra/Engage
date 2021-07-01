import React from 'react';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Meeting from './pages/Meeting';
import Meet from './pages/Meet';
import ForgotPassword from './pages/ForgotPassword';
import { Box, Heading } from '@chakra-ui/react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Skelton from './pages/Skelton';
// <Container maxW="xl" centerContent>
//   <Heading
//     bgGradient="linear(to-l, #7928CA,#FF0080)"
//     bgClip="text"
//     fontSize="6xl"
//     fontWeight="extrabold"
//   >
//     Video Chat
//   </Heading>
//   <Box className="join">
//     <ButtonGroup size={'lg'}>
//       <Button
//         onClick={() => dispatch(handleJoin())}
//         leftIcon={<PhoneIcon w={5} h={4} />}
//         colorScheme="pink"
//         variant="solid"
//       >
//         NEW MEETING
//       </Button>
//       <Button
//         onClick={() => dispatch(handleLeave())}
//         rightIcon={<CloseIcon w={5} h={3} />}
//         colorScheme="pink"
//         variant="outline"
//       >
//         LEAVE
//       </Button>
//     </ButtonGroup>
//   </Box>

//   <VideoConference />
// </Container>;
import Conference from './pages/Conference';
import Navbar from './components/Header/Navbar';
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
          <Heading> Hello World</Heading>
        </Box>
      </Route>
      <PrivateRoute path="/join/meet/:id" authenticated={authenticated}>
        <Conference />
      </PrivateRoute>
      <PrivateRoute path="/meet" authenticated={authenticated}>
        <Box>
          <Navbar authenticated={authenticated} />
          <Meet />
        </Box>
      </PrivateRoute>
      <PublicRoute path="/login" authenticated={authenticated}>
        <Login />
      </PublicRoute>
      <PublicRoute path="/signup" authenticated={authenticated}>
        <Signup />
      </PublicRoute>
      <PublicRoute path="/reset" authenticated={authenticated}>
        <ForgotPassword />
      </PublicRoute>
    </Switch>
  );
};

export default App;

import React from 'react';
import Navbar from './components/Header/Navbar';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import { Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Meeting from './pages/Meeting';
import Meet from './pages/Meet';
import ForgotPassword from './pages/ForgotPassword';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
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
const App = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const authenticated = isLoaded(auth) && !isEmpty(auth);

  return (
    <Switch>
      <PublicRoute path="/" exact authenticated={authenticated}>
        <Navbar authenticated={authenticated} />;
      </PublicRoute>
      <PrivateRoute path="/meet" authenticated={authenticated}>
        <Navbar authenticated={authenticated} />;
        <Meet />
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

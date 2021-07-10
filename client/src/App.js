import React from 'react';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';
// import Meeting from './pages/Meeting';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import { Box } from '@chakra-ui/react';
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
import Home from './pages/Home';
// import SidebarTemp from './components/Dashboard/SidebarTemporary';
// import Side from './components/Side';
import Dashboard from './components/Dashboard/Dashboard';
// import ChatRoom from './pages/Experimental/ChatRoom';
import ChatRoom from './pages/Chat/ChatRoom';
// import ChatRoom from './pages/Chat/ChatRoom';
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
        {/* <ChatRoom teamId="oSxBnr3cKzREXcmEtOgV" /> */}
        <>
          <ChatRoom />
          {/* <ChatRoom teamId="oSxBnr3cKzREXcmEtOgV" /> */}
          {/* <SidebarTemp /> */}
          {/* <Side /> */}
          {/* <Home /> */}
        </>
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

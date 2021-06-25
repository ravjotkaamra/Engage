import React from 'react';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meeting from './pages/Meeting';
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
  const authenticated = false;

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/meet" authenticated={authenticated}>
          <Meeting />
        </PrivateRoute>
        <PublicRoute path="/login" authenticated={authenticated}>
          <Login />
        </PublicRoute>
      </Switch>
    </Router>
  );
};

export default App;

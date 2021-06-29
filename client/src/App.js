import React from 'react';
import Navbar from './components/Navbar';
import PublicRoute from './components/PublicRoute';
// import PrivateRoute from './components/PrivateRoute';
import { Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Meeting from './pages/Meeting';
import Meet from './pages/Meet';
import ForgotPassword from './pages/ForgotPassword';
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
  return (
    <>
      <Navbar />
      <Switch>
        <PublicRoute path="/meet">
          <Meet />
        </PublicRoute>
        <PublicRoute path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute path="/signup">
          <Signup />
        </PublicRoute>
        <PublicRoute path="/reset">
          <ForgotPassword />
        </PublicRoute>
      </Switch>
    </>
  );
};

export default App;

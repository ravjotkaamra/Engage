import React from 'react';
import { HStack, Flex, useDisclosure } from '@chakra-ui/react';
import ChatHistorySidebar from './ChatHistory/ChatHistorySidebar';
import ChatBox from './ChatBox/ChatBox';
import ChatHistoryDrawer from './ChatHistory/ChatHistoryDrawer';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../../theme';
import {
  getChatRowsForSidebar,
  getFirestoreConnectMessageObj,
  getFriendChatHistory,
  getFriendInPrivateChat,
  getMeetsChatHistory,
} from './helpers';
const toast = createStandaloneToast({ theme });

const ChatTemp = () => {
  // 1. import react hooks
  const {
    isOpen: isChatHistoryOpen,
    onOpen: onChatHistoryOpen,
    onClose: onChatHistoryClose,
  } = useDisclosure();
  const { currTeamId, meetId: currMeetId } = useParams();
  const history = useHistory();

  // 2. get the data from the firebase
  // current logged in user
  const loggedInUser = useSelector((state) => state.firebase.auth);

  // get all the teams which the current logged in user is a part of
  // (here we need only the private ones since we are just chatting) (for sidebar)
  const { teams: teamsObj } = useSelector(({ firestore }) => firestore.data);

  // for accesing meetings subcollection
  const orderedData = useSelector(({ firestore }) => firestore.ordered);

  // 3. connect to firestore realtime messages

  useFirestoreConnect([getFirestoreConnectMessageObj(currMeetId, currTeamId)]);
  // get the users and messages from the redux store
  const { users, messages } = useSelector(({ firestore }) => firestore.ordered);
  console.log('messages :>> ', messages);

  if (!isLoaded(teamsObj)) {
    return <div>Loading...</div>;
  }
  // if there is no friend with the currTeamId send an alert
  const currTeam = teamsObj ? teamsObj[currTeamId] : null;
  // wrong url path
  if (currTeamId !== undefined && !currTeam) {
    toast({
      title: 'Wrong Url',
      description: 'User does not exist, please check the url',
      status: 'info',
      position: 'top',
      duration: 4000,
      isClosable: true,
      variant: 'left-accent',
    });
    history.push('/chat');
    return null;
  }

  // 4. clean the data up for rendering components
  // convert the teams object into teams array for easy iteration
  const myTeams = Object.entries(teamsObj).map(([key, val]) => val);

  const friendsChatHistory = getFriendChatHistory(
    currTeam,
    myTeams,
    loggedInUser,
    users
  );
  const meetsChatHistory = getMeetsChatHistory(orderedData, currMeetId);
  const chatRows = getChatRowsForSidebar(friendsChatHistory, meetsChatHistory);

  console.log('chatRows in chatroom :>> ', chatRows);

  const friend = getFriendInPrivateChat(currTeam, loggedInUser, users);

  return (
    <HStack h="80vh" spacing={0}>
      <Flex
        as="aside"
        h="full"
        maxW={{ base: 'xs', xl: 'sm' }}
        display={{ base: 'none', lg: 'flex' }}
        w="full"
        borderRightColor="gray.100"
        borderRightWidth={1}
        pt={8}
      >
        <ChatHistorySidebar
          chatHeading="Chat"
          chatSearchPlaceholder="Search for people or meeting"
          chatRows={chatRows}
        />
      </Flex>
      <Flex
        as="main"
        h="full"
        flex={1}
        borderRightColor="gray.100"
        borderRightWidth={1}
      >
        <ChatBox
          onChatHistoryOpen={onChatHistoryOpen}
          chatLabel="Chatting with"
          chatInfo={friend?.displayName}
          messages={messages}
        />
      </Flex>

      <ChatHistoryDrawer
        isOpen={isChatHistoryOpen}
        onClose={onChatHistoryClose}
        chatHeading="Chat"
        chatSearchPlaceholder="Search for people or meeting"
        chatRows={chatRows}
      />
    </HStack>
  );
};

export default ChatTemp;

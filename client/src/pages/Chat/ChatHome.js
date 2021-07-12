import React from 'react';
import { HStack, Flex, useDisclosure } from '@chakra-ui/react';
import ChatHistorySidebar from './ChatHistory/ChatHistorySidebar';
import ChatBox from './ChatBox/ChatBox';
import ChatHistoryDrawer from './ChatHistory/ChatHistoryDrawer';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

const ChatHome = () => {
  // current logged in user
  const loggedInUser = useSelector((state) => state.firebase.auth);

  const {
    isOpen: isChatHistoryOpen,
    onOpen: onChatHistoryOpen,
    onClose: onChatHistoryClose,
  } = useDisclosure();

  // get the users from the redux store
  const { users } = useSelector(({ firestore }) => firestore.ordered);

  // get all the teams which the current logged in user is a part of
  const { teams: teamsObj } = useSelector(({ firestore }) => firestore.data);

  // no teams
  if (teamsObj === undefined) {
    return <div>you dont have any team</div>
  }

  if (!isLoaded(teamsObj)) {
    return <div>Loading...</div>;
  }
  // convert the teams object into teams array for easy iteration
  const myTeams = Object.entries(teamsObj).map(([key, val]) => val);

  const chatRows = myTeams
    .filter((team) => team?.isPrivate === true)
    .map((team) => {
      console.log('team :>> ', team);
      let { sentAt, sentBy, text } = team.recentMessage;
      // if recent message is there, then
      // get date from seconds and nanoseconds
      if (sentAt) {
        const fireBaseTime = new Date(
          sentAt.seconds * 1000 + sentAt.nanoseconds / 1000000
        );
        sentAt = `${fireBaseTime.toDateString()} ${fireBaseTime.toLocaleTimeString()}`;
        text = `${sentBy.displayName.substr(
          0,
          sentBy.displayName.indexOf(' ')
        )}: ${text}`;
      }

      // get the user id of the friend
      const friendId = team.members.find(
        (memberId) => memberId !== loggedInUser.uid
      );
      // get the friend details from the firestore 'users'collection
      console.log('users :>> ', users);
      const friend = users?.find((user) => user.id === friendId);
      console.log('friend :>> ', friend);

      return {
        photoURL: friend?.avatarURL || friend?.photoURL,
        chatSender: friend?.displayName,
        chatText: text,
        chatURL: `/chat/${team.id}`,
        sentAt,
        key: team.id,
        highlight: false,
      };
    });

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
          chatLabel="Click on chat history or search bar to"
          chatInfo="Chat with your Friends"
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

export default ChatHome;

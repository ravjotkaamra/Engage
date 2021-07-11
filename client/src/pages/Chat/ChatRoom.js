import React from 'react';
import { HStack, Flex, useDisclosure } from '@chakra-ui/react';
import ChatHistorySidebar from './ChatHistory/ChatHistorySidebar';
import ChatBox from './ChatBox/ChatBox';
import ChatHistoryDrawer from './ChatHistory/ChatHistoryDrawer';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ChatRoom = ({ myTeams, team: currTeam }) => {
  const {
    isOpen: isChatHistoryOpen,
    onOpen: onChatHistoryOpen,
    onClose: onChatHistoryClose,
  } = useDisclosure();

  const { meetId: currMeetId } = useParams();

  // current logged in user
  const loggedInUser = useSelector((state) => state.firebase.auth);
  // connect to the firestore messages between two friends

  let firestoreConnectMessageObj = {
    collection: 'teams',
    doc: currTeam.id,
    subcollections: [{ collection: 'messages', orderBy: 'sentAt' }],
    storeAs: 'messages',
  };
  if (currMeetId) {
    firestoreConnectMessageObj.subcollections = [
      {
        collection: 'meetings',
        doc: currMeetId,
        subcollections: [{ collection: 'messages', orderBy: 'sentAt' }],
      },
    ];
  }

  useFirestoreConnect([firestoreConnectMessageObj]);
  // get the users and messages from the redux store
  const { users, messages } = useSelector(({ firestore }) => firestore.ordered);
  console.log('messages :>> ', messages);

  const friendsChatHistory = myTeams
    .filter((team) => team?.isPrivate === true)
    .map((team) => {
      console.log('team :>> ', team);
      let { sentAt = '', sentBy = '', text = '' } = team.recentMessage;
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
        highlight: team.id === currTeam.id,
      };
    });

  // get all the meetings which the logged in user is part of
  const meetings = useSelector(({ firestore }) => {
    return Object.entries(firestore.ordered)
      ?.filter(([key, val]) => key.startsWith('meetings') && val.length !== 0)
      ?.map(([key, val]) => val)
      ?.reduce((flatten, arr) => [...flatten, ...arr], []);
  });
  console.log('meetings  subcolections :>> ', meetings);

  const meetsChatHistory = meetings?.map((meet) => {
    console.log('meet chat room :>> ', meet);
    let { sentAt = '', sentBy = '', text = '' } = meet.recentMessage;

    // get sent date and time of message
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

    return {
      photoURL: 'https://image.flaticon.com/icons/png/512/3214/3214781.png',
      chatSender: meet.name,
      chatText: text,
      chatURL: `/chat/${meet.teamId}/meet/${meet.id}`,
      sentAt,
      key: meet.id,
      highlight: meet.id === currMeetId,
    };
  });

  const chatRows = [...friendsChatHistory, ...meetsChatHistory].sort(
    (chat_1, chat_2) => chat_2.sentAt?.localeCompare(chat_1.sentAt)
  );
  console.log('chatRows in chatroom :>> ', chatRows);

  // get the user id of the friend in the current chat
  const friendId = currTeam.members.find(
    (memberId) => memberId !== loggedInUser.uid
  );
  // get the friend details from the firestore 'users' collection
  const friend = users?.find((user) => user.id === friendId);
  console.log('friend current:>> ', friend);

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

export default ChatRoom;

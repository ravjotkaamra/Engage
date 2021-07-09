import { Flex, HStack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import JoinTeamAlert from './JoinTeamAlert';
import { isLoaded } from 'react-redux-firebase';
import ChatHistorySidebar from '../Chat/ChatHistory/ChatHistorySidebar';
import ChatHistoryDrawer from '../Chat/ChatHistory/ChatHistoryDrawer';
import ChatBox from '../Chat/ChatBox/ChatBox';
import ChatFilesDrawer from '../Chat/ChatFiles/ChatFilesDrawer';
import ChatFiles from '../Chat/ChatFiles/ChatFiles';

const Team = () => {
  const { teamId } = useParams();
  const {
    isOpen: isChatHistoryOpen,
    onOpen: onChatHistoryOpen,
    onClose: onChatHistoryClose,
  } = useDisclosure();
  const {
    isOpen: isChatFilesOpen,
    onOpen: onChatFilesOpen,
    onClose: onChatFilesClose,
  } = useDisclosure();

  // get all the teams which the current logged in user is a part of
  const { teams: teamsObj } = useSelector(({ firestore }) => firestore.data);
  if (!isLoaded(teamsObj)) {
    return <div>Loading...</div>;
  }
  // check whether the logged in user is a part of this team or not,
  // if the user is not a part of this team give him an option to join the team
  const team = teamsObj ? teamsObj[teamId] : null;
  if (!team) {
    return <JoinTeamAlert teamId={teamId} />;
  }

  // convert the teams object into teams array for easy iteration
  const myTeams = Object.entries(teamsObj).map(([key, val]) => val);
  console.log('myTeams :>> ', myTeams);

  const chatRows = myTeams.map((team) => {
    console.log('team :>> ', team);
    let { sentAt, sentBy, text } = team.recentMessage;

    // if recent message is there, then
    // get date from seconds and nanoseconds
    if (sentAt) {
      const fireBaseTime = new Date(
        sentAt.seconds * 1000 + sentAt.nanoseconds / 1000000
      );
      sentAt = `${fireBaseTime.toDateString()} ${fireBaseTime.toLocaleTimeString()}`;

      // since recent message is defined because of sent at
      // other fields will also be defined, so get the name of
      // the sender and text message
      text = `${sentBy.displayName}: ${text}`;
    }

    return {
      // photoURL: "",
      chatSender: team.name,
      chatText: text,
      chatURL: `/teams/${team.id}`,
      sentAt,
      key: team.id,
      highlight: team.id === teamId,
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
          chatHeading="Teams"
          chatSearchPlaceholder="Search for teams"
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
          onChatFilesOpen={onChatFilesOpen}
        />
      </Flex>
      <Flex
        as="aside"
        h="full"
        maxW={{ base: 'xs', xl: 'sm' }}
        display={{ base: 'none', lg: 'flex' }}
        w="full"
      >
        <ChatFiles />
      </Flex>

      <ChatHistoryDrawer
        isOpen={isChatHistoryOpen}
        onClose={onChatHistoryClose}
      />
      <ChatFilesDrawer isOpen={isChatFilesOpen} onClose={onChatFilesClose} />
    </HStack>
  );
};

export default Team;

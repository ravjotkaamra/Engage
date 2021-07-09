import { HStack, Flex, useDisclosure } from '@chakra-ui/react';
import ChatHistorySidebar from './ChatHistory/ChatHistorySidebar';
import ChatBox from './ChatBox/ChatBox';
// import ChatFiles from './ChatFiles/ChatFiles';
import ChatHistoryDrawer from './ChatHistory/ChatHistoryDrawer';
// import ChatFilesDrawer from './ChatFiles/ChatFilesDrawer';

const ChatRoom = () => {
  const {
    isOpen: isChatHistoryOpen,
    onOpen: onChatHistoryOpen,
    onClose: onChatHistoryClose,
  } = useDisclosure();
  // const {
  //   isOpen: isChatFilesOpen,
  //   onOpen: onChatFilesOpen,
  //   onClose: onChatFilesClose,
  // } = useDisclosure();
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
        <ChatHistorySidebar />
      </Flex>
      <Flex
        as="main"
        h="full"
        flex={1}
        borderRightColor="gray.100"
        borderRightWidth={1}
      >
        <ChatBox onChatHistoryOpen={onChatHistoryOpen} />
      </Flex>
      {/* <Flex
        as="aside"
        h="full"
        maxW={{ base: 'xs', xl: 'sm' }}
        display={{ base: 'none', lg: 'flex' }}
        w="full"
      >
        <ChatFiles />
      </Flex> */}

      <ChatHistoryDrawer
        isOpen={isChatHistoryOpen}
        onClose={onChatHistoryClose}
      />
      {/* <ChatFilesDrawer isOpen={isChatFilesOpen} onClose={onChatFilesClose} /> */}
    </HStack>
  );
};

export default ChatRoom;

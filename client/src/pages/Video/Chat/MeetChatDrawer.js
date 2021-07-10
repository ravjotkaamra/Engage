import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import ChatMessages from '../../Chat/ChatBox/ChatMessages';

const ChatMeetDrawer = ({ isOpen, onClose }) => {
  const { messages } = useSelector(({ firestore }) => firestore.ordered);
  console.log('messages :>> ', messages);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <DrawerHeader>Meeting chat</DrawerHeader>
          <DrawerBody>
            <Flex w="full" flexDirection="column">
              <VStack h="full" alignItems="left" w="full" spacing={6}>
                <ChatMessages messages={messages} />
              </VStack>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ChatMeetDrawer;

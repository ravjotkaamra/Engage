import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import ChatMessages from '../pages/Chat/ChatBox/ChatMessages';

const ChatMeetDrawer = ({ isOpen, onClose, ...rest }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent pt={8}>
          <DrawerCloseButton />
          <DrawerHeader>Chat with participants</DrawerHeader>
          <DrawerBody>
            <VStack h="full" alignItems="left" w="full" spacing={6}>
              <ChatMessages />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ChatMeetDrawer;

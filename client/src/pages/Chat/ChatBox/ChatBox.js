import {
  Flex,
  HStack,
  IconButton,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
} from '@chakra-ui/react';
import { HiChat } from 'react-icons/hi';
import { IoDocuments } from 'react-icons/io5';

import { useParams } from 'react-router-dom';
import chatImage from '../../../assets/chat-home.svg';
import ChatMessages from './ChatMessages';

const ChatBox = ({
  onChatHistoryOpen,
  onChatFilesOpen,
  chatLabel,
  chatInfo,
  messages,
}) => {
  const { teamId } = useParams();
  return (
    <Flex w="full" flexDirection="column">
      <HStack px={4} py={4} borderBottomColor="gray.100" borderBottomWidth={1}>
        <IconButton
          onClick={onChatHistoryOpen}
          display={{ base: 'inherit', lg: 'none' }}
          icon={<HiChat />}
          aria-label="Toggle Chat History Drawer"
        />
        {onChatFilesOpen ? (
          <IconButton
            onClick={onChatFilesOpen}
            display={{ base: 'inherit', lg: 'none' }}
            icon={<IoDocuments />}
            aria-label="Toggle Chat Files Drawer"
          />
        ) : null}
      </HStack>
      <VStack h="full" alignItems="left" w="full" spacing={6}>
        <Stat mt={6}>
          <StatLabel ml={3} color="gray.500">
            {chatLabel}
          </StatLabel>
          <StatNumber
            bgGradient="linear(to-r, #10155C, #167D5B)"
            bgClip="text"
            fontSize="3xl"
            fontWeight="bold"
            ml="3"
          >
            {chatInfo}
          </StatNumber>
        </Stat>
        {/* print chat messages */}
        {teamId ? (
          <ChatMessages messages={messages} />
        ) : (
          <Image
            w="full"
            alignSelf="center"
            boxSize="95vh"
            src={chatImage}
            alt="Teammates chatting using microsoft teams"
          />
        )}
      </VStack>
    </Flex>
  );
};

export default ChatBox;

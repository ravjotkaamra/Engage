import {
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
} from '@chakra-ui/react';
import { HiChat } from 'react-icons/hi';
import { IoDocuments } from 'react-icons/io5';
import chatImage from '../../../assets/chat-home.svg';
import ChatMessages from './ChatMessages';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createNewTeamMeeting } from '../../../actions/meeting/private';

const ChatBox = ({
  onChatHistoryOpen,
  onChatFilesOpen,
  chatLabel,
  chatInfo,
  messages,
}) => {
  // for creating new meetings
  const dispatch = useDispatch();
  const history = useHistory();
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
        <Spacer />
        <Flex alignSelf="right">
          <Button
            onClick={() => dispatch(createNewTeamMeeting(teamId, history))}
            leftIcon={<AiOutlineVideoCameraAdd />}
            transition="0.5s"
            bgGradient="linear(to-r, #2b5876 0%, #4e4376  51%, #2b5876  100%)"
            color="gray.100"
            p={3}
            fontWeight="semibold"
            rounded="sm"
            shadow="md"
            _hover={{
              color: 'white',
              bgPosition: ' right center',
            }}
          >
            Meet now
          </Button>
        </Flex>
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
        {/* print chat messages if it exists*/}
        {messages ? (
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

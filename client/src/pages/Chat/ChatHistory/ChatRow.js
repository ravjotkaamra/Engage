import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import UserAvatar from '../UserAvatar';

const ChatRow = ({
  chatSender,
  photoURL,
  chatText,
  sentAt,
  chatURL,
  highlight,
}) => {
  // get the information of recent message from props

  const history = useHistory();

  return (
    <Flex
      py={4}
      px={8}
      w="full"
      bgColor={highlight ? 'gray.100' : 'gray.50'}
      alignItems="center"
      borderBottomColor="gray.100"
      borderBottomWidth={1}
      style={{ transition: 'background 300ms' }}
      _hover={{ bg: 'gray.200', cursor: 'pointer' }}
      onClick={() => history.push(chatURL)}
    >
      <UserAvatar name={chatSender} photoURL={photoURL} />
      <VStack
        overflow="hidden"
        flex={1}
        ml={3}
        spacing={0}
        alignItems="flex-start"
      >
        <Heading fontSize={12} w="full">
          {chatSender}
        </Heading>
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          w="full"
          fontSize="xs"
          color="gray.500"
        >
          {chatText}
        </Text>
      </VStack>
      <Text ml={3} fontSize="xs" color="gray.500">
        {sentAt}
      </Text>
    </Flex>
  );
};

export default ChatRow;

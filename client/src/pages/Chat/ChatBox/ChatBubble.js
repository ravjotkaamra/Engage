import { VStack, Box, Text, HStack, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import UserAvatar from '../UserAvatar';

const ChatBubble = ({ message }) => {
  const auth = useSelector((state) => state.firebase.auth);

  let { sentAt, sentBy, text } = message;
  // if message is defined, then get date and time
  if (sentAt) {
    const fireBaseTime = new Date(
      sentAt.seconds * 1000 + sentAt.nanoseconds / 1000000
    );
    sentAt = `${fireBaseTime.toDateString()} ${fireBaseTime.toLocaleTimeString()}`;
  }

  const isMe = auth.uid === sentBy?.uid;
  const alignment = isMe ? 'flex-end' : 'flex-start';
  const bottomRightRadius = isMe ? 0 : 32;
  const bottomLeftRadius = isMe ? 32 : 0;

  return (
    <HStack mt={6} alignItems={alignment} alignSelf={alignment}>
      {isMe ? null : (
        <UserAvatar photoURL={sentBy.photoURL} name={sentBy?.displayName} />
      )}
      <VStack>
        <Box
          bg={isMe ? 'brand.100' : 'gray.100'}
          px={6}
          py={4}
          maxW={80}
          shadow="md"
          borderTopLeftRadius={32}
          borderTopRightRadius={32}
          borderBottomLeftRadius={bottomLeftRadius}
          borderBottomRightRadius={bottomRightRadius}
        >
          <Heading as="h3" fontSize="md">
            {isMe ? 'You' : sentBy?.displayName}
            <Text fontSize="xs" color="gray">
              {sentAt}
            </Text>
          </Heading>
          <Text mt={2}>{text}</Text>
        </Box>
      </VStack>
    </HStack>
  );
};

export default ChatBubble;

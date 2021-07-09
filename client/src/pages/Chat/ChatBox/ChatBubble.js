import { VStack, Box, Text, HStack, Heading } from '@chakra-ui/react';
import UserAvatar from '../UserAvatar';

const ChatBubble = ({ message, dateSent, from, photoURL}) => {
  const isMe = from === 'me';
  const alignment = isMe ? 'flex-end' : 'flex-start';
  const bottomRightRadius = isMe ? 0 : 32;
  const bottomLeftRadius = isMe ? 32 : 0;

  return (
    <HStack mt={6} alignItems={alignment} alignSelf={alignment}>
      {isMe ? null : <UserAvatar name={from} />}
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
          <Heading as="h3" fontSize="md" fontWeight="thin">
            {isMe ? 'You' : 'Dina'}
          </Heading>

          <Text>{message}</Text>
        </Box>
        <Text fontSize="xs" color="gray">
          {dateSent}
        </Text>
      </VStack>
    </HStack>
  );
};

export default ChatBubble;

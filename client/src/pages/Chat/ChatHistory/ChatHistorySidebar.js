import { VStack, Heading, Box, Input, List, ListItem } from '@chakra-ui/react';
import { useState } from 'react';
import ChatRow from './ChatRow';

const ChatHistorySidebar = ({
  chatHeading,
  chatSearchPlaceholder,
  chatRows,
}) => {
  const [searchText, setSearchText] = useState('');
  console.log('chatRows :>> ', chatRows);

  const checkIfStringMatches = (string) => {
    return string
      ?.toUpperCase()
      .includes(searchText.slice().trim().toUpperCase());
  };

  // filter the chat rows on the basis of text input
  const filteredChatRows = chatRows?.filter(
    ({ chatText, chatSender }) =>
      checkIfStringMatches(chatText) || checkIfStringMatches(chatSender)
  );
  console.log('filteredChatRows :>> ', filteredChatRows);

  return (
    <VStack h="full" alignItems="center" w="full" spacing={6}>
      <Box px={8} w="full">
        <Heading size="md" w="full">
          {chatHeading}
        </Heading>
        <Input
          variant="filled"
          mt={2}
          minH={10}
          value={searchText}
          rounded="full"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={chatSearchPlaceholder}
        />
      </Box>
      <Box w="full" overflowY="auto">
        <List w="full" spacing={0}>
          {filteredChatRows?.map((chatRow) => (
            <ListItem key={chatRow.key}>
              <ChatRow {...chatRow} />
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  );
};

export default ChatHistorySidebar;

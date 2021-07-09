import { VStack, Heading, Box, Input, List, ListItem } from '@chakra-ui/react';
import { useState } from 'react';
import ChatRow from './ChatRow';
// <UserAvatar name={friend} key={friend} />

/* 
 <Flex
        w="full"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Avatar name="Travis Taylor" size="2xl">
          <AvatarBadge bg="green.400" boxSize={8} borderWidth={4} />
        </Avatar>
        <VStack>
          <Heading size="md" mt={{ base: 0, lg: 3 }}>
            Travis Taylor
          </Heading>
          <HStack px={8} justifyContent="center" spacing={3} mt={6}>
            <IconButton
              icon={<RiDribbbleLine />}
              variant="ghost"
              rounded="full"
              color="gray.500"
              h={10}
              aria-label="Dribbble Account"
            />
            <IconButton
              icon={<RiInstagramLine />}
              variant="ghost"
              rounded="full"
              color="gray.500"
              h={10}
              aria-label="Instagram Account"
            />
            <IconButton
              icon={<RiTwitterFill />}
              variant="ghost"
              rounded="full"
              color="gray.500"
              h={10}
              aria-label="Twitter Account"
            />
          </HStack>
        </VStack>
      </Flex>
*/

/*
<Box px={8} w="full">
        <Divider color="gray.100" />
      </Box>

      <Box px={8} w="full">
        <Divider color="gray.100" />
      </Box>
*/

/*
chatRows is an array of objects
[{
    chatSender,
    photoURL,
    chatText,
    sentAt,
    chatURL,
    highlight,
}]
*/

const ChatHistorySidebar = ({
  chatHeading,
  chatSearchPlaceholder,
  chatRows,
}) => {
  const [searchText, setSearchText] = useState('');
  // const filteredChatRows = chatRows.filter(chatRow => chatRow);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  console.log(searchText);
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
          onChange={handleSearch}
          placeholder={chatSearchPlaceholder}
        />
      </Box>
      <Box w="full" overflowY="auto">
        <List w="full" spacing={0}>
          {chatRows.map((chatRow) => (
            <ListItem>
              <ChatRow {...chatRow} />
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  );
};

export default ChatHistorySidebar;

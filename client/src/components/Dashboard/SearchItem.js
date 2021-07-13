import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import UserAvatar from '../../pages/Chat/UserAvatar';

const SearchItem = ({ name, info, photoURL, url, onClose }) => {
  const history = useHistory();

  return (
    <Flex
      py={4}
      px={8}
      w="full"
      alignItems="center"
      borderBottomColor="gray.100"
      borderBottomWidth={1}
      style={{ transition: 'background 300ms' }}
      _hover={{ bg: 'gray.200', cursor: 'pointer' }}
      onClick={() => {
        onClose();
        history.push(url);
      }}
    >
      <UserAvatar name={name} photoURL={photoURL} />
      <VStack
        overflow="hidden"
        flex={1}
        ml={3}
        spacing={0}
        alignItems="flex-start"
      >
        <Heading fontSize={12} w="full">
          {name}
        </Heading>
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          w="full"
          fontSize="xs"
          color="gray.500"
        >
          {info}
        </Text>
      </VStack>
    </Flex>
  );
};

export default SearchItem;

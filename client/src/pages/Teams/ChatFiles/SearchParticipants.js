import React from 'react';
import { Avatar, Text, Flex } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { useSelector } from 'react-redux';

const SearchParticipants = () => {
  const { users } = useSelector(({ firestore }) => firestore.ordered);

  return (
    <Flex p={2} justifyContent="left">
      <AutoComplete rollNavigation>
        <AutoCompleteInput
          variant="outline"
          placeholder="Add new participant"
          autoFocus
        />
        <AutoCompleteList>
          {users.map(({ id, displayName, avatarUrl, photoURL }) => (
            <AutoCompleteItem
              key={id}
              value={displayName}
              textTransform="capitalize"
              align="center"
            >
              <Avatar
                size="sm"
                name={displayName}
                src={avatarUrl || photoURL}
              />
              <Text ml="4">{displayName}</Text>
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Flex>
  );
};

export default SearchParticipants;

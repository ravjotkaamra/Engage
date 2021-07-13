import React from 'react';
import { Avatar, Text, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const SearchParticipants = () => {
  const { users } = useSelector(({ firestore }) => firestore.ordered);
  console.log('search users :>> ', users);
  return <div>hello</div>
};

export default SearchParticipants;

import React from 'react';
import { Box, Divider, VStack, List } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Participant from './Participant';
import SearchParticipants from './SearchParticipants';

const Participants = ({ memberIds }) => {
  const { users } = useSelector(({ firestore }) => firestore.ordered);

  //  check for every user in microsoft teams whether he is
  //  a part of this particular team
  const members = users?.filter((user) => memberIds?.includes(user.id));
  console.log('members :>> ', members);

  return (
    <VStack spacing={6}>
      <SearchParticipants memberIds={memberIds} users={users} />
      <Divider />
      <List spacing={4} mt={6} w="full">
        {members?.map((member) => (
          <Participant
            key={member.id}
            profileURL={`/profile/${member.id}`}
            email={member.email}
            name={member.displayName}
            photoURL={member.avatarUrl || member.photoURL}
          />
        ))}
      </List>
      <Box px={8} w="full">
        <Divider mt={6} color="gray.100" />
      </Box>
    </VStack>
  );
};

export default Participants;

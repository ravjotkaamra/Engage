import React from 'react';
import { Box, Divider, VStack, List, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import MeetingLink from './MeetingLink';
import { useParams } from 'react-router-dom';
import MeetImage from '../../../assets/meet.svg';

const Meetings = ({ memberIds }) => {
  const { teamId } = useParams();
  // get all the meetings which the logged in user is part of
  // sort in descending order of creation time
  const meetings = useSelector(({ firestore }) => {
    return Object.entries(firestore.ordered)
      ?.filter(([key, val]) => key.startsWith('meetings') && val.length !== 0)
      ?.map(([key, val]) => val)
      ?.reduce((flatten, arr) => [...flatten, ...arr], [])
      ?.filter((meet) => meet.teamId === teamId)
      ?.sort(
        (m1, m2) =>
          m2.createdAt.seconds +
          m2.createdAt.nanoseconds -
          m1.createdAt.seconds -
          m1.createdAt.nanoseconds
      );
  });

  console.log('meetings :>> ', meetings);

  return (
    <VStack spacing={6}>
      <List spacing={4} mt={6} w="full">
        {meetings?.length !== 0 ? (
          meetings.map((meeting) => (
            <MeetingLink key={meeting.id} meeting={meeting} />
          ))
        ) : (
          <Box>
            <Image rounded={{ lg: 'lg' }} bgSize="cover" src={MeetImage} />
            <Text textAlign="center" p={6} color="gray.700">
              Click on the meet now button to create a new meeting
            </Text>
          </Box>
        )}
      </List>
      <Box px={8} w="full">
        <Divider mt={6} color="gray.100" />
      </Box>
    </VStack>
  );
};

export default Meetings;

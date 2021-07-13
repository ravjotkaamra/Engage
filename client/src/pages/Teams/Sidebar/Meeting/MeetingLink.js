import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const MeetingLink = ({ meeting }) => {
  const history = useHistory();
  const fireBaseTime = new Date(
    meeting?.createdAt?.seconds * 1000 +
      meeting?.createdAt?.nanoseconds / 1000000
  );
  const date = fireBaseTime.toDateString();
  const time = fireBaseTime.toLocaleTimeString();
  return (
    <HStack
      w="full"
      px={8}
      spacing={3}
      cursor="pointer"
      onClick={() =>
        history.push(`/join/meet/${meeting.id}/teams/${meeting.teamId}`)
      }
      _hover={{ shadow: '2xl', bgColor: 'gray.200' }}
      py={3}
      rounded="md"
    >
      <Image
        src="https://image.flaticon.com/icons/png/512/3214/3214781.png"
        w={14}
        h={12}
      />
      <VStack spacing={0} alignItems="flex-start" w="full">
        <HStack w="full" justifyContent="space-between">
          <Heading fontSize={12} size="sm">
            {meeting.name}
          </Heading>
          <Text fontSize={12} color="gray.400">
            {time}
          </Text>
        </HStack>
        <Text fontSize={12} color="gray.400">
          {date}
        </Text>
      </VStack>
    </HStack>
  );
};

export default MeetingLink;

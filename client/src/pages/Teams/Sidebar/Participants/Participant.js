import { HStack, VStack, Heading, Text, Avatar } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

const Participant = ({ name, email, photoURL, profileURL }) => {
  const history = useHistory();

  return (
    <HStack
      w="full"
      px={8}
      spacing={3}
      cursor="pointer"
      onClick={() => history.push(profileURL)}
    >
      <Avatar sz="xs" name={name} src={photoURL} />
      <VStack spacing={0} alignItems="flex-start" w="full">
        <Heading fontSize={12} w="full">
          {name}
        </Heading>
        <HStack w="full" justifyContent="space-between">
          <Text fontSize={12} color="gray.400">
            {email}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Participant;

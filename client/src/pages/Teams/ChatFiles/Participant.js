import { HStack, VStack, Heading, Text, Avatar } from '@chakra-ui/react';

const Participant = ({ name, email, photoURL }) => {
  return (
    <HStack w="full" px={8} spacing={3}>
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

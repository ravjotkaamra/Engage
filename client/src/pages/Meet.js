import React from 'react';
import { Container, Center } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
const Meet = () => {
  return (
    <Container maxW="xl" centerContent>
      <Center>
        <Button
          leftIcon={<AiOutlineVideoCameraAdd />}
          colorScheme="telegram"
          variant="solid"
        >
          New Meeting
        </Button>
      </Center>
    </Container>
  );
};

export default Meet;

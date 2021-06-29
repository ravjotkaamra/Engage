import React from 'react';
import { useDispatch } from 'react-redux';
import { createNewMeeting } from '../actions/meeting/create';
import { Container, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
const Meet = () => {
  const dispatch = useDispatch();
  return (
    <Container centerContent>
      <Box>
        <Button
          onClick={() => dispatch(createNewMeeting())}
          leftIcon={<AiOutlineVideoCameraAdd />}
          colorScheme="telegram"
          variant="solid"
        >
          New Meeting
        </Button>
      </Box>
    </Container>
  );
};

export default Meet;

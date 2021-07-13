import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Icon,
  Input,
  ModalBody,
  ModalFooter,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiTeamLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { joinTeam } from '../../../actions/teams/joinTeamAction';

const JoinTeamForm = ({ onClose }) => {
  const [teamId, setTeamId] = useState('');

  // for dispatching actions to the redux
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(joinTeam(teamId));
    setTeamId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Invite Code</FormLabel>
          <Input
            type="text"
            value={teamId}
            placeholder="Enter code"
            required
            focusBorderColor="brand.500"
            onChange={(e) => setTeamId(e.target.value)}
          />
        </FormControl>
        <Text p={2} color="gray.500" fontSize="sm">
          Got a code to join a team? Enter it above.
        </Text>
      </ModalBody>

      <ModalFooter>
        <ButtonGroup spacing="5">
          <Button
            leftIcon={<Icon as={RiTeamLine} boxSize={4} />}
            type="submit"
            bg={'brand.600'}
            color={'white'}
            _hover={{
              bg: '#1d3557',
            }}
          >
            Join
          </Button>

          <Button colorScheme="brand" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </form>
  );
};

export default JoinTeamForm;

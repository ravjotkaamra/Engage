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
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineFolderAdd } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { createNewTeam } from '../../actions/teams/newTeamAction';

const CreateTeamForm = ({ onClose }) => {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');

  // for dispatching actions to the redux
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createNewTeam(teamName, description));
    setTeamName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Team Name</FormLabel>
          <Input
            type="text"
            value={teamName}
            placeholder="Microsoft Engage Team"
            required
            minLength="3"
            focusBorderColor="brand.500"
            onChange={(e) => setTeamName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            placeholder="Enter team's information here (optional)"
            focusBorderColor="brand.500"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <Text p={2} color="gray.500" fontSize="sm">
          Bring everyone together and get to work!
        </Text>
      </ModalBody>

      <ModalFooter>
        <ButtonGroup spacing="5">
          <Button
            leftIcon={<Icon as={AiOutlineFolderAdd} boxSize={4} />}
            type="submit"
            bg={'brand.600'}
            color={'white'}
            _hover={{
              bg: '#1d3557',
            }}
          >
            Create
          </Button>

          <Button colorScheme="brand" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </form>
  );
};

export default CreateTeamForm;

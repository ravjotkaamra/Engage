import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  ButtonGroup,
  Icon,
  Textarea,
} from '@chakra-ui/react';
import { AiOutlineFolderAdd } from 'react-icons/ai';
import { MdGroupAdd } from 'react-icons/md';
import { createNewTeam } from '../../../actions/teams/newTeamAction';

const CreateBtn = ({ meetId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <>
      <Button
        variant="outline"
        border="1px"
        borderColor="brand.400"
        leftIcon={<Icon as={MdGroupAdd} boxSize={6} color="brand.600" />}
        onClick={onOpen}
        color="brand.500"
        p={2}
        fontSize="sm"
        fontWeight="semibold"
        rounded="sm"
        shadow="md"
        _hover={{ bg: 'gray.200' }}
      >
        Join or create a team
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Team Details</ModalHeader>
          <ModalCloseButton />
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
            </ModalBody>

            <ModalFooter>
              <ButtonGroup spacing="5">
                <Button
                  leftIcon={<Icon as={AiOutlineFolderAdd} boxSize={4} />}
                  type="submit"
                  bg={'brand.500'}
                  color={'white'}
                  _hover={{
                    bg: 'brand.600',
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBtn;

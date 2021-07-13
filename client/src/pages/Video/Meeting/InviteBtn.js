import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useDispatch } from 'react-redux';
import { inviteToTeamMeet } from '../../../actions/meeting/inviteTeamMeet';

const InviteBtn = ({ teamId, meetId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  useFirestoreConnect([
    {
      collection: 'users',
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(inviteToTeamMeet(teamId, meetId, email));
    setEmail('');
  };

  return (
    <>
      <Button
        variant="outline"
        border="2px"
        borderColor="whiteAlpha.400"
        leftIcon={<BsFillPlusSquareFill />}
        onClick={onOpen}
        color="green.300"
        px={6}
        py={6}
        fontSize="sm"
        fontWeight="semibold"
        rounded="md"
        _hover={{ bg: 'gray.700' }}
      >
        Invite
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add participants</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  placeholder="johndoe@microsoft.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <ButtonGroup spacing="5">
                <Button
                  leftIcon={<EmailIcon />}
                  type="submit"
                  bg={'brand.500'}
                  color={'white'}
                  _hover={{
                    bg: 'brand.600',
                  }}
                >
                  Send Invite
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

export default InviteBtn;

import {
  Button,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import UpdateProfileForm from './UpdateProfileForm';

const UpdateProfileButton = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        flex={1}
        variant="outline"
        border="1px"
        borderColor="brand.400"
        rightIcon={<Icon as={FaUserEdit} boxSize={5} color="brand.600" />}
        onClick={onOpen}
        color="brand.500"
        p={2}
        fontSize="sm"
        fontWeight="semibold"
        rounded="sm"
        shadow="md"
        _hover={{ bg: 'gray.200' }}
      >
        Update profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile Information</ModalHeader>
          <ModalCloseButton />
          <UpdateProfileForm onClose={onClose} user={user}/>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProfileButton;

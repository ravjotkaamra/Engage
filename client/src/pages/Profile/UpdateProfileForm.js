import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Icon,
  Input,
  ModalBody,
  ModalFooter,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiUserCheck } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../actions/authentication/updateAction';

const UpdateProfileForm = ({ user, onClose }) => {
  const [name, setName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  // for dispatching actions to the redux
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProfile(user.id, name, bio, avatarUrl));
    setName('');
    setBio('');
    setAvatarUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <ModalBody pb={6}>
        <FormControl p={2}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            placeholder="John Doe"
            required
            focusBorderColor="brand.500"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl p={2}>
          <FormLabel>Bio</FormLabel>
          <Textarea
            value={bio}
            placeholder="Write about yourself"
            focusBorderColor="brand.500"
            onChange={(e) => setBio(e.target.value)}
          />
        </FormControl>
        <FormControl p={2}>
          <FormLabel>Photo URL</FormLabel>
          <Input
            type="text"
            value={avatarUrl}
            placeholder="Enter code"
            focusBorderColor="brand.500"
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <ButtonGroup spacing="5">
          <Button
            leftIcon={<Icon as={FiUserCheck} boxSize={4} />}
            type="submit"
            bg={'brand.600'}
            color={'white'}
            _hover={{
              bg: '#1d3557',
            }}
          >
            Update
          </Button>

          <Button colorScheme="brand" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </form>
  );
};

export default UpdateProfileForm;

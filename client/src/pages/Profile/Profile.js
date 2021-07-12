import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createPrivateChat } from '../../actions/teams/newTeamAction';
import { createStandaloneToast } from '@chakra-ui/react';
import { MdChat } from 'react-icons/md';

import theme from '../../theme';
import { isLoaded } from 'react-redux-firebase';
import UpdateProfileButton from './UpdateProfileButton';
const toast = createStandaloneToast({ theme });

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { uid: loggedInUserId } = useSelector(({ firebase }) => firebase.auth);
  const { profileId } = useParams();

  const { users } = useSelector(({ firestore }) => firestore.ordered);
  const person = users?.find((user) => profileId === user.id);
  const isMe = profileId === loggedInUserId;

  if (!isLoaded(person)) {
    return <div>Loading...</div>;
  }

  if (!person) {
    toast({
      title: 'Wrong URL',
      description: 'User does not exist, please check the URL',
      status: 'error',
      position: 'top',
      duration: 4000,
      isClosable: true,
      variant: 'left-accent',
    });
    history.push('/teams');
  }

  const handleChatClick = () => {
    dispatch(createPrivateChat(person.id, history));
  };

  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('gray.50', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'xl'}
          name={person?.displayName}
          src={person?.avatarUrl}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {person?.displayName}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {person?.email}
        </Text>
        <Text
          textAlign={'center'}
          // eslint-disable-next-line react-hooks/rules-of-hooks
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          {person?.bio}
        </Text>

        <Stack mt={8} direction={'row'} spacing={4}>
          {isMe ? (
            <UpdateProfileButton user={person} />
          ) : (
            <Button
              flex={1}
              fontSize={'md'}
              _focus={{
                bg: 'brand.700',
              }}
              variant="solid"
              colorScheme="brand"
              onClick={handleChatClick}
              leftIcon={<MdChat />}
            >
              Message
            </Button>
          )}
        </Stack>
      </Box>
    </Center>
  );
};
export default Profile;

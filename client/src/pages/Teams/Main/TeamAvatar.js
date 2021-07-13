import { Avatar } from '@chakra-ui/react';

const TeamAvatar = (props) => {
  return (
    <Avatar
      size={'xl'}
      m={4}
      alt={'Microsoft Team Avatar'}
      pos={'relative'}
      {...props}
    />
  );
};

export default TeamAvatar;

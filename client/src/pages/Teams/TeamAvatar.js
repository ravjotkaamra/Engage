import { Avatar } from '@chakra-ui/react';

const TeamAvatar = (props) => {
  return (
    <Avatar
      size={'xl'}
      mb={4}
      alt={'Microsoft Team Avatar'}
      pos={'relative'}
      _after={{
        content: '""',
        w: 4,
        h: 4,
        bg: 'green.300',
        border: '2px solid white',
        rounded: 'full',
        pos: 'absolute',
        bottom: 0,
        right: 3,
      }}
      {...props}
    />
  );
};

export default TeamAvatar;

import { Avatar, Tooltip } from '@chakra-ui/react';

const UserAvatar = ({ name, photoURL }) => {
  return (
    <Tooltip label={name}>
      <Avatar src={photoURL} name={name} />
    </Tooltip>
  );
};

export default UserAvatar;

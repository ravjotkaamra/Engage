import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authentication/loginActions';
import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router-dom';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = () => {
    dispatch(logout());
    history.push('/');
  };
  return (
    <Button
      colorScheme="brand"
      variant="outline"
      size="sm"
      onClick={handleClick}
    >
      Log out
    </Button>
  );
};

export default LogoutBtn;

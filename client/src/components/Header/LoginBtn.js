import React from 'react';
import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router-dom';

const LoginBtn = () => {
  const history = useHistory();
  return (
    <Button
      colorScheme="brand"
      variant="ghost"
      size="sm"
      onClick={() => history.push('/login')}
    >
      Log in
    </Button>
  );
};

export default LoginBtn;

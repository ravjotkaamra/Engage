import React from 'react';
import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router-dom';

const SignupBtn = () => {
  const history = useHistory();
  return (
    <Button
      colorScheme="brand"
      variant="solid"
      size="sm"
      onClick={() => history.push('/signup')}
    >
      Sign up
    </Button>
  );
};

export default SignupBtn;

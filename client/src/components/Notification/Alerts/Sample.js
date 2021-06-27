import { Button, useToast } from '@chakra-ui/react';

import React from 'react';
import Success from './Success';

const Sample = () => {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          position: 'top',
          duration: 5000,
          isClosable: true,
          render: () => <Success message="Succefully created!" />,
        })
      }
    >
      Show Toast
    </Button>
  );
};

export default Sample;

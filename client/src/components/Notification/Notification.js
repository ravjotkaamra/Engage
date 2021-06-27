import React from 'react';
import { useSelector } from 'react-redux';
import Failure from './Alerts/Failure';
import Warning from './Alerts/Warning';
import Success from './Alerts/Success';
import Sample from './Alerts/Sample';
import { useToast } from '@chakra-ui/react';

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification);

  const toast = useToast();
  if (!message) {
    toast({
      duration: 1000,
      render: () => <Success message="Succefully created!" />,
      isClosable: true,
    });
  }
  if (!message) {
    return <Sample />;
  }

  switch (type) {
    case 'success':
      return <Success message={message} />;
    case 'failure':
      return <Failure message={message} />;
    case 'warning':
      return <Warning message={message} />;
    default:
      return null;
  }
};

export default Notification;

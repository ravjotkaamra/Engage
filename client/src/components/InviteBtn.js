import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  ButtonGroup,
} from '@chakra-ui/react';

import emailjs from 'emailjs-com';

// import { FaUserPlus } from 'react-icons/fa';

// const Util = () => {
//   return (
//     <Container centerContent>
//       <Box>
//         <Button
//           size="md"
//           leftIcon={<FaUserPlus />}
//           colorScheme="teal"
//           variant="solid"
//         >
//           Invite
//         </Button>
//       </Box>
//     </Container>
//   );
// };
import { createStandaloneToast } from '@chakra-ui/react';
import theme from '../theme';

import { EmailIcon } from '@chakra-ui/icons';
const InviteBtn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');

  const { email: from_email, displayName: from_name } = useSelector(
    ({ firebase }) => firebase.auth
  );
  const toast = createStandaloneToast({ theme });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // emailjs configurations
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const userID = process.env.REACT_APP_EMAILJS_USER_ID;
    // email message content
    const url = window.location.href;
    const templateParams = {
      from_name,
      from_email,
      url,
      to_email: email,
    };

    // for sending alerts to the user
    let toastObj;
    try {
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        userID
      );
      console.log('email sent successfully :>> ', response);

      toastObj = {
        title: 'Invite sent',
        description: `Invitation sent successfully to ${email}`,
        status: 'success',
      };
      setEmail('');
    } catch (error) {
      console.log('sorry email could not be sent', error);
      toastObj = {
        title: 'Invite failed',
        description: 'Please check the email address',
        status: 'error',
      };
    } finally {
      toast({
        ...toastObj,
        position: 'top',
        duration: 4000,
        isClosable: true,
        variant: 'left-accent',
      });
    }
  };

  return (
    <>
      <Button variant="outline" colorScheme="telegram" onClick={onOpen}>
        Invite
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add participants</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  placeholder="johndoe@microsoft.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <ButtonGroup spacing="5">
                <Button
                  leftIcon={<EmailIcon />}
                  type="submit"
                  bg={'brand.500'}
                  color={'white'}
                  _hover={{
                    bg: 'brand.600',
                  }}
                >
                  Send invite
                </Button>

                <Button colorScheme="brand" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InviteBtn;

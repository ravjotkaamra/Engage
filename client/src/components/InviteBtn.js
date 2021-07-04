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
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { useFirestore } from 'react-redux-firebase';

// emailjs configurations
const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const userID = process.env.REACT_APP_EMAILJS_USER_ID;

// props for sending toasts
let toastProps = {
  position: 'top',
  duration: 4000,
  isClosable: true,
  variant: 'left-accent',
};

const InviteBtn = ({ meetId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const firestore = useFirestore();

  const { email: from_email, displayName: from_name } = useSelector(
    ({ firebase }) => firebase.auth
  );
  const toast = createStandaloneToast({ theme });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // email message content
    const url = window.location.href;
    const templateParams = {
      from_name,
      from_email,
      url,
      to_email: email,
    };

    try {
      // use emailjs to send the invite
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        userID
      );

      // send an alert to the user
      toast({
        title: 'Invite sent',
        description: `Invitation sent successfully to ${email}`,
        status: 'success',
        ...toastProps,
      });
      console.log('email sent successfully :>> ', response);
      // update the database to indicate that the user is invited
      await firestore
        .collection('meetings')
        .doc(meetId)
        .update({
          participants: firestore.FieldValue.arrayUnion({ email }),
        });

      setEmail('');
    } catch (error) {
      console.log('sorry email could not be sent', error);
      toast({
        title: 'Invite failed',
        description: 'Please check the email address',
        status: 'error',
        ...toastProps,
      });
    }
  };

  return (
    <>
      <Button
        variant="outline"
        border="2px"
        borderColor="whiteAlpha.400"
        leftIcon={<BsFillPlusSquareFill />}
        onClick={onOpen}
        color="green.300"
        px={6}
        py={6}
        fontSize="sm"
        fontWeight="semibold"
        rounded="md"
        _hover={{ bg: 'gray.700' }}
      >
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
                  Send Invite
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

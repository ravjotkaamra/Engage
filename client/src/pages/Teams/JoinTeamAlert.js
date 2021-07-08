import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { joinTeam } from '../../actions/teams/joinTeamAction';
import { useHistory } from 'react-router-dom';

const JoinTeamAlert = ({ teamId }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const cancelRef = React.useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleJoinClick = () => {
    dispatch(joinTeam(teamId));
  };

  const handleCancelClick = () => {
    onClose();
    history.push('/teams');
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Join Team?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            You are not a part of this team. Do you wish to join it?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="brand" onClick={handleJoinClick}>
              Join
            </Button>
            <Button ref={cancelRef} ml={3} onClick={handleCancelClick}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default JoinTeamAlert;

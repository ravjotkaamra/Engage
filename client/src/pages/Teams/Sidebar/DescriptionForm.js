import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import FocusLock from 'react-focus-lock';
import { FiEdit } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateTeamDescription } from '../../../actions/teams/teamInfoAction';

// 1. Create a text input component
// const TextInput = React.forwardRef((props, ref) => {
//   const { id, formValue, setFormValue } = props;
//   return (
//     <FormControl>
//       <FormLabel htmlFor={id}>Enter team's info</FormLabel>
//       <Textarea
//         ref={ref}
//         id={id}
//         value={formValue}
//         onChange={(e) => setFormValue(e.target.value)}
//       />
//     </FormControl>
//   );
// });

// 2. Create the form
// const Form = ({ firstFieldRef, onCancel, defaultValue }) => {
//   const [formValue, setFormValue] = useState(defaultValue);
//   const { teamId } = useParams();
//   const dispatch = useDispatch();

//   const handleUpdate = (e) => {
//     console.log('formValue :>> ', formValue);
//     dispatch(updateTeamDescription(teamId, formValue));
//     onCancel();
//   };

//   return (
//     <Stack spacing={4}>
//       <TextInput
//         label="Enter team's info"
//         id="team-description"
//         ref={firstFieldRef}
//         defaultValue={defaultValue}
//         onCancel={onCancel}
//         formValue={formValue}
//         setFormValue={setFormValue}
//       />
//       <ButtonGroup d="flex" justifyContent="flex-end">
//         <Button variant="outline" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button
//           disabled={formValue === defaultValue || formValue === ''}
//           colorScheme="brand"
//           onClick={handleUpdate}
//         >
//           Update
//         </Button>
//       </ButtonGroup>
//     </Stack>
//   );
// };

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
const DescriptionForm = ({ defaultValue }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
  const TextInput = React.forwardRef((props, ref) => {
    const { id, formValue, setFormValue } = props;
    return (
      <FormControl>
        <FormLabel htmlFor={id}>Enter team's info</FormLabel>
        <Textarea
          ref={ref}
          id={id}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
      </FormControl>
    );
  });

  const Form = ({ firstFieldRef, onCancel, defaultValue }) => {
    const [formValue, setFormValue] = useState(defaultValue);
    const { teamId } = useParams();
    const dispatch = useDispatch();

    const handleUpdate = (e) => {
      console.log('formValue :>> ', formValue);
      dispatch(updateTeamDescription(teamId, formValue, onCancel));
    };

    return (
      <Stack spacing={4}>
        <TextInput
          label="Enter team's info"
          id="team-description"
          ref={firstFieldRef}
          defaultValue={defaultValue}
          onCancel={onCancel}
          formValue={formValue}
          setFormValue={setFormValue}
        />
        <ButtonGroup d="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={formValue === defaultValue || formValue === ''}
            colorScheme="brand"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </ButtonGroup>
      </Stack>
    );
  };

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <Tooltip
        label="edit description"
        aria-label="Button for editing description"
      >
        <Box display="inline-block">
          <PopoverTrigger>
            <IconButton
              icon={<FiEdit />}
              rounded="full"
              bgColor="gray.50"
              _hover={{ bgColor: 'gray.100' }}
            />
          </PopoverTrigger>
        </Box>
      </Tooltip>

      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Form
            firstFieldRef={firstFieldRef}
            onCancel={onClose}
            defaultValue={defaultValue}
          />
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default DescriptionForm;

import React from 'react';
import { Text, Flex, Avatar, Box, Button, VStack } from '@chakra-ui/react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { EmailIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { sendTeamInvite } from '../../../../actions/teams/sendInviteAction';
import { useParams } from 'react-router-dom';

const SearchParticipants = ({ users, memberIds }) => {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = React.useState([]);
  const notTeamMembers = users
    ?.filter((user) => !memberIds?.includes(user.id))
    .map((user) => ({ ...user, label: user.displayName, value: user.id }));
  console.log('notTeamMembers :>> ', notTeamMembers);

  const handleSendEmailInvite = () => {
    dispatch(sendTeamInvite(teamId, selectedItems));
    setSelectedItems([]);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  const customRender = (selected) => {
    return (
      <Flex flexDir="row" alignItems="center">
        <Avatar
          mr={2}
          size="sm"
          name={selected.label}
          src={selected.avatarUrl}
        />
        <Box>
          <Text>{selected.label}</Text>
          <Text fontSize="xs">{selected.email}</Text>
        </Box>
      </Flex>
    );
  };

  const optionFilterFunc = (items, input) => {
    console.log('input :>> ', items, input);
    input = input.slice().trim().toUpperCase();
    return items.filter(
      (item) =>
        item.email?.toUpperCase().includes(input) ||
        item.label?.toUpperCase().includes(input)
    );
  };

  return (
    <VStack w="full">
      <CUIAutoComplete
        tagStyleProps={{
          rounded: 'full',
        }}
        label="Invite your friends"
        placeholder="Enter your friend's name"
        items={notTeamMembers}
        itemRenderer={customRender}
        disableCreateItem="true"
        optionFilterFunc={optionFilterFunc}
        toggleButtonStyleProps={{ bg: 'red.100', _hover: { bg: 'red.200' } }}
        selectedItems={selectedItems}
        onSelectedItemsChange={(changes) =>
          handleSelectedItemsChange(changes.selectedItems)
        }
      />
      <Button
        variant="solid"
        colorScheme="brand"
        hidden={selectedItems.length === 0}
        onClick={handleSendEmailInvite}
        rightIcon={<EmailIcon />}
      >
        Send Invite
      </Button>
    </VStack>
  );
};

export default SearchParticipants;

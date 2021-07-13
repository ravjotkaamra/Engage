import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  Heading,
  Icon,
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import SearchItem from './SearchItem';

const Searchbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  const [searchText, setSearchText] = useState('');
  const { teams: teamsObj } = useSelector(({ firestore }) => firestore.data);
  const myTeams = teamsObj
    ? Object.entries(teamsObj).map(([key, val]) => val)
    : null;

  const { users } = useSelector(({ firestore }) => firestore.ordered);

  const cleanedSearchText = searchText.slice().trim().toUpperCase();
  const filteredUsers = users?.filter(
    (user) =>
      user.email?.toUpperCase().includes(cleanedSearchText) ||
      user.displayName?.toUpperCase().includes(cleanedSearchText)
  );

  const filteredTeams = myTeams
    ?.filter((team) => !team.isPrivate)
    .filter(
      (team) =>
        team.name?.toUpperCase().includes(cleanedSearchText) ||
        team.description?.toUpperCase().includes(cleanedSearchText)
    );

  return (
    <>
      <Button
        variant="outline"
        border="1px"
        colorScheme="twitter"
        leftIcon={<Icon as={FiSearch} boxSize={4} color="twitter.500" />}
        onClick={onOpen}
        p={2}
        fontSize="sm"
        fontWeight="semibold"
        rounded="sm"
        shadow="sm"
        _hover={{ bg: 'gray.200' }}
      >
        Search for people or teams
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent p={2}>
          <ModalBody pb={6}>
            <VStack>
              <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
                <InputLeftElement color="gray.500" children={<FiSearch />} />
                <Input
                  variant="flushed"
                  colorScheme="brand.500"
                  placeholder="Search for people or teams"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </InputGroup>
              <VStack h="full" alignItems="left" w="full" spacing={6}>
                <Box>
                  <Heading as="h3" fontSize={20}>
                    Teams
                  </Heading>
                  <List w="full" spacing={0}>
                    {filteredTeams?.map((team) => (
                      <ListItem key={team.id}>
                        <SearchItem
                          name={team.name}
                          info={team.description}
                          url={`/teams/${team.id}`}
                          onClose={onClose}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box>
                  <Heading as="h3" fontSize={20} textAlign="left">
                    People
                  </Heading>
                  <List w="full" spacing={0}>
                    {filteredUsers?.map((user) => (
                      <ListItem key={user.id}>
                        <SearchItem
                          name={user.displayName}
                          info={user.email}
                          url={`/profile/${user.id}`}
                          photoURL={user.avatarUrl}
                          onClose={onClose}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Searchbar;

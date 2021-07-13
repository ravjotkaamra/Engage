import {
  Button,
  Icon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { MdGroupAdd } from 'react-icons/md';
import CreateTeamForm from './CreateTeamForm';
import JoinTeamForm from './JoinTeamForm';

const JoinOrCreateBtn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant="outline"
        border="1px"
        borderColor="brand.400"
        leftIcon={<Icon as={MdGroupAdd} boxSize={6} color="brand.600" />}
        onClick={onOpen}
        color="brand.500"
        p={2}
        fontSize="sm"
        fontWeight="semibold"
        rounded="sm"
        shadow="md"
        _hover={{ bg: 'gray.200' }}
      >
        Join or create a team
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Details</ModalHeader>
          <ModalCloseButton />

          <Tabs isFitted variant="enclosed-colored" p={2}>
            <TabList>
              <Tab _selected={{ color: 'white', bg: '#1d3557', shadow: 'sm' }}>
                Join a team with a code
              </Tab>
              <Tab _selected={{ color: 'white', bg: '#1d3557', shadow: 'sm' }}>
                Create a team
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <JoinTeamForm onClose={onClose} />
              </TabPanel>
              <TabPanel>
                <CreateTeamForm onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JoinOrCreateBtn;

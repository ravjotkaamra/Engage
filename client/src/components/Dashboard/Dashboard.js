import React, { useState } from 'react';
import {
  Flex,
  IconButton,
  Avatar,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { FiMenu } from 'react-icons/fi';
import Sidebar from './Sidebar';
import DashRoutes from './DashRoutes';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import Searchbar from './Searchbar';

const Dashboard = () => {
  const [navSize, changeNavSize] = useState('small');
  const sidebar = useDisclosure();

  const user = useSelector(({ firebase }) => ({
    uid: firebase.auth.uid,
    photoURL: firebase.auth.photoURL,
    ...firebase.profile,
  }));

  const { teams: myTeamIds } = useSelector(({ firebase }) => firebase.profile);

  console.log('user dashboard:>> ', user);
  // populate whatever teams logged in user has joined with teams details
  const populates = [{ child: 'teams', root: 'teams' }];
  useFirestoreConnect([
    {
      collection: 'users',
      doc: user?.uid,
      populates,
      storeAs: 'loggedInUser',
    },
  ]);
  useFirestoreConnect([
    {
      collection: 'users',
    },
  ]);

  // get all the meetings of logged in user
  console.log('myTeamIds :>> ', myTeamIds);

  useFirestoreConnect(
    myTeamIds?.map((teamId) => ({
      collection: 'teams',
      doc: teamId,
      subcollections: [
        {
          collection: 'meetings',
          orderBy: 'createdAt',
        },
      ],
      storeAs: `meetings/${teamId}`,
    }))
  );

  return (
    <Box
      as="section"
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH="100vh"
    >
      <Sidebar
        user={user}
        navSize={navSize}
        changeNavSize={changeNavSize}
        display={{ base: 'none', md: 'unset' }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar
            user={user}
            navSize={navSize}
            changeNavSize={changeNavSize}
            w="small"
            borderRight="none"
          />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{ base: 0, md: navSize === 'small' ? 20 : 60 }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue('white', 'gray.800')}
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Searchbar />

          <Flex align="center">
            <Avatar
              ml="4"
              size="sm"
              name={user.displayName}
              src={user.photoURL || user.avatarUrl}
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          <DashRoutes />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

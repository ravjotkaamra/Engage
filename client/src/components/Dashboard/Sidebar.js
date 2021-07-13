import React from 'react';
import { FiMenu, FiHome, FiUser } from 'react-icons/fi';
import { SiMicrosoftteams } from 'react-icons/si';
import { MdChat } from 'react-icons/md';
import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import TeamsLogo from '../../assets/Microsoft_Office_Teams.svg';
import SideItem from './SideItem';

const Sidebar = ({ user, navSize, changeNavSize, ...rest }) => {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="brand.600"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      // w="60"
      w={navSize === 'small' ? '20' : '60'}
      {...rest}
    >
      <Flex
        flexDir="column"
        w="100%"
        px="5"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
      >
        <IconButton
          background="brand.500"
          color="white"
          mt={5}
          mb={5}
          _hover={{ background: 'brand.400' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === 'small') changeNavSize('large');
            else changeNavSize('small');
          }}
        />
      </Flex>
      <Flex px="4" py="5" align="center">
        <Image
          w="full"
          boxSize="7"
          src={TeamsLogo}
          alt="Microsoft Teams Logo"
        />
        {navSize === 'small' ? null : (
          <Heading
            bgGradient="linear(to-l, #799BC7, #32CFA5)"
            bgClip="text"
            fontSize="3xl"
            fontWeight="bold"
            ml="3"
          >
            Teams
          </Heading>
        )}
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize === 'small' ? 'center' : 'flex-start'}
          mb={4}
        >
          <Flex mt={4} align="center">
            <Avatar size="md" src={user.photoURL || user.avatarUrl} />
            <Flex
              flexDir="column"
              ml={4}
              display={navSize === 'small' ? 'none' : 'flex'}
            >
              <Heading as="h3" color="whiteAlpha.900" size="sm">
                {user.displayName}
              </Heading>
              <Text fontSize="xs" color="gray.300">
                {user.email}
              </Text>
            </Flex>
          </Flex>

          <SideItem navSize={navSize} name="" icon={FiHome} title="Home" />
          <SideItem navSize={navSize} name="chat" icon={MdChat} title="Chat" />
          <SideItem
            navSize={navSize}
            name="teams"
            icon={SiMicrosoftteams}
            title="Teams"
          />

          <SideItem
            navSize={navSize}
            name="profile"
            icon={FiUser}
            title="Profile"
            url={`/profile/${user.uid}`}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;

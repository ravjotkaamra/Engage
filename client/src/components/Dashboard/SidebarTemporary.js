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
  Icon,
  InputLeftElement,
  InputGroup,
  Input,
} from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';
/*
pos="sticky"
left={0.5}
h="95vh"
marginTop="2.5vh"
boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
borderRadius={navSize === 'small' ? '15px' : '30px'}
w={navSize === 'small' ? '75px' : '200px'}
flexDir="column"
bgColor="brand.500"
justifyContent="space-between"
*/

/*
<IconButton
  background="brand.400"
  color="white"
  mt={5}
  mb={5}
  _hover={{ background: 'brand.300' }}
  icon={<FiMenu />}
  onClick={() => {
    if (navSize === 'small') changeNavSize('large');
    else changeNavSize('small');
  }}
/> 
*/

import SidebarContent from './Sidebar';

export default function Sidebar() {
  const [navSize, changeNavSize] = useState('small');
  const sidebar = useDisclosure();

  return (
    <Box
      as="section"
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH="100vh"
    >
      <SidebarContent
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
          <SidebarContent w="small" borderRight="none" />
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
          <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
            <InputLeftElement color="gray.500" children={<FiSearch />} />
            <Input placeholder="Search for articles..." />
          </InputGroup>

          <Flex align="center">
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/30869823?v=4"
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96" />
        </Box>
      </Box>
    </Box>
  );
}

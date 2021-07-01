import React from 'react';
import {
  chakra,
  Box,
  useColorModeValue,
  Stack,
  Image,
  Flex,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';

import { MdCheckCircle, MdSettings } from 'react-icons/md';

const Home = () => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('brand.500')}
      px={8}
      py={24}
      mx="auto"
    >
      <Box
        w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        pr={{ md: 20 }}
      >
        <chakra.h2
          fontSize={{ base: '3xl', sm: '4xl' }}
          fontWeight="extrabold"
          lineHeight="shorter"
          color={useColorModeValue('white', 'gray.100')}
          mb={6}
        >
          <chakra.span display="block">Microsoft Teams</chakra.span>
          <chakra.span
            display="block"
            color={useColorModeValue('white', 'gray.500')}
          >
            Meet, chat, call, and collaborate in just one place.
          </chakra.span>
        </chakra.h2>
        <chakra.p
          mb={6}
          fontSize={{ base: 'lg', md: 'xl' }}
          color={useColorModeValue('gray.100', 'gray.300')}
        >
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Whether it’s chat, calls, or video, anyone can engage at any time,
              bringing everyone closer.
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Share your opinion and have fun with your team. Send GIFs,
              stickers, and emojis in a group chat or in one-to-one messages.
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
              Make and receive calls directly in Microsoft Teams with advanced
              features like group calling, cloud voicemail, and call transfers.
            </ListItem>
          </List>
        </chakra.p>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
        >
          <Box display="inline-flex" rounded="md" shadow="md">
            <chakra.a
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={3}
              border="solid transparent"
              fontWeight="bold"
              w="full"
              rounded="md"
              color={useColorModeValue('white')}
              bg={useColorModeValue('brand.600', 'brand.500')}
              _hover={{
                bg: useColorModeValue('brand.700', 'brand.600'),
              }}
            >
              Sign up for free
            </chakra.a>
          </Box>
        </Stack>
      </Box>
      <Box w={{ base: 'full', md: 10 / 12 }} mx="auto" textAlign="center">
        <Image
          w="full"
          rounded="lg"
          shadow="2xl"
          src="https://kutty.netlify.app/hero.jpg"
          alt="Hellonext feedback boards software screenshot"
        />
      </Box>
    </Flex>
  );
};

export default Home;

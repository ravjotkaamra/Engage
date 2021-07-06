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
  Spacer,
} from '@chakra-ui/react';

import { MdCheckCircle } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import landingImage from '../assets/team-meeting-colored.svg';

const Home = () => {
  const history = useHistory();
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('gray.50')}
      px={14}
      py={20}
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
          color={useColorModeValue('#3c4178', 'gray.100')}
          mb={6}
        >
          <chakra.span display="block">Microsoft Teams</chakra.span>
          <chakra.span
            display="block"
            color={useColorModeValue('gray.700', 'gray.500')}
          >
            Meet, chat, call, and collaborate in just one place.
          </chakra.span>
        </chakra.h2>
        <Box
          mb={6}
          fontSize={{ base: 'lg', md: 'xl' }}
          color={useColorModeValue('black.100', 'gray.300')}
        >
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="brand.500" />
              Whether it’s chat, calls, or video, anyone can engage at any time,
              bringing everyone closer.
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="brand.500" />
              Share your opinion and have fun with your team. Send GIFs,
              stickers, and emojis in a group chat or in one-to-one messages.
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="brand.500" />
              Make and receive calls directly in Microsoft Teams with advanced
              features like group calling, cloud voicemail, and call transfers.
            </ListItem>
          </List>
        </Box>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
        >
          <Box display="inline-flex" rounded="md" shadow="md" width="md">
            <chakra.button
              fontSize="xl"
              onClick={() => history.push('/meet')}
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
              Get Started
            </chakra.button>
          </Box>
        </Stack>
      </Box>
      <Spacer />
      <Box w={{ base: 'full', md: 10 / 12 }} mx="auto" textAlign="center">
        <Image
          w="full"
          rounded="lg"
          shadow="2xl"
          boxSize="480"
          src={landingImage}
          alt="Teammates talking over video conference"
        />
      </Box>
    </Flex>
  );
};

export default Home;

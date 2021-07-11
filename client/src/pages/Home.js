import React from 'react';
import {
  chakra,
  Box,
  useColorModeValue,
  Stack,
  Image,
  Flex,
  Spacer,
} from '@chakra-ui/react';

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
          Getting together with friends and family in Microsoft Teams is almost
          as fun and as real as it gets without being there in person. Whether
          it’s chat, calls, or video, anyone can engage at any time, bringing
          everyone closer.
        </Box>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
          py={{ base: 2, md: 4 }}
        >
          <Box
            display="inline-flex"
            rounded="md"
            shadow="md"
            w={['100', 'sm', 'md', 'lg']}
          >
            <chakra.button
              fontSize="xl"
              onClick={() => history.push('/teams')}
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
      <Box w={{ base: 'full', md: 10 / 12 }}  textAlign="center">
        <Image
          w="full"
          rounded="lg"
          shadow="xl"
          boxSize={{ base: 'sm', md: 'md', lg: 'lg' }}
          src={landingImage}
          alt="Teammates talking over video conference"
        />
      </Box>
    </Flex>
  );
};

export default Home;

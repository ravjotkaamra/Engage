import React from 'react';
import {
  chakra,
  Button,
  Box,
  Flex,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import meetImage from '../assets/meet.svg';
import { createNewMeeting } from '../actions/meeting/create';

const Meet = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Flex
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        mx={{ lg: 8 }}
        display={{ lg: 'flex' }}
        maxW={{ lg: '5xl' }}
        shadow={{ lg: 'lg' }}
        rounded={{ lg: 'lg' }}
      >
        <Box w={{ lg: '50%' }}>
          <Image rounded={{ lg: 'lg' }} bgSize="cover" src={meetImage} />
        </Box>

        <Box
          py={12}
          px={6}
          maxW={{ base: 'xl', lg: '5xl' }}
          w={{ lg: '50%' }}
          textAlign="center"
          borderLeft="2mm ridge rgb(102, 109, 179, 0.4)"
        >
          <chakra.h2
            fontSize={{ base: '2xl', md: '3xl' }}
            color={useColorModeValue('gray.800', 'white')}
            fontWeight="bold"
          >
            Meet Your{' '}
            <chakra.span color={useColorModeValue('brand.600', 'brand.400')}>
              Friends
            </chakra.span>
          </chakra.h2>
          <chakra.p mt={4} color={useColorModeValue('gray.600', 'gray.400')}>
            Start a meeting. Get everyone together without the need to create a
            team
          </chakra.p>

          <Box mt={8}>
            <Button
              onClick={() => dispatch(createNewMeeting(history))}
              leftIcon={<AiOutlineVideoCameraAdd />}
              bg="brand.600"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{ bg: 'brand.500' }}
            >
              New Meeting
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Meet;

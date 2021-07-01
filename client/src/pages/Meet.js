import React from 'react';
import {
  chakra,
  Button,
  Box,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

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
          <Box
            h={{ base: 64, lg: 'full' }}
            rounded={{ lg: 'lg' }}
            bgSize="cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80')",
            }}
          ></Box>
        </Box>

        <Box py={12} px={6} maxW={{ base: 'xl', lg: '5xl' }} w={{ lg: '50%' }}>
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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
            modi reprehenderit vitae exercitationem aliquid dolores ullam
            temporibus enim expedita aperiam mollitia iure consectetur dicta
            tenetur, porro consequuntur saepe accusantium consequatur.
          </chakra.p>

          <Box mt={8}>
            <Button
              // onClick={() => dispatch(createNewMeeting(history))}
              onClick={() => console.log('hello world')}
              leftIcon={<AiOutlineVideoCameraAdd />}
              bg="gray.900"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{ bg: 'gray.800' }}
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

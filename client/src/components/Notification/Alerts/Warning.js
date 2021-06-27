import React from 'react';
import { chakra, Box, Icon, Flex, useColorModeValue } from '@chakra-ui/react';

import { IoMdAlert } from 'react-icons/io';

const Warning = ({ message }) => {
  return (
    <Flex
      maxW="sm"
      w="full"
      mx="auto"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="md"
      rounded="lg"
      overflow="hidden"
    >
      <Flex justifyContent="center" alignItems="center" w={12} bg="yellow.500">
        <Icon as={IoMdAlert} color="white" boxSize={6} />
      </Flex>

      <Box mx={-3} py={2} px={4}>
        <Box mx={3}>
          <chakra.span
            color={useColorModeValue('yellow.400', 'yellow.300')}
            fontWeight="bold"
          >
            Warning
          </chakra.span>
          <chakra.p
            color={useColorModeValue('gray.600', 'gray.200')}
            fontSize="sm"
          >
            {message}
          </chakra.p>
        </Box>
      </Box>
    </Flex>
  );
};

export default Warning;

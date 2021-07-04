import { Box, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';

export default function SocialProfileSimple() {
  return (
    <SimpleGrid p={6} columns={2} spacing={0}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Box minBlockSize={200}>hello</Box>
        <Text fontWeight={600} color={'gray.500'}>
          Lindsey James
        </Text>
      </Box>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Box minBlockSize={200}>hello</Box>
        <Text fontWeight={600} color={'gray.500'}>
          Lindsey James
        </Text>
      </Box>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Box minBlockSize={200}>hello</Box>
        <Text fontWeight={600} color={'gray.500'}>
          Lindsey James
        </Text>
      </Box>
    </SimpleGrid>
  );
}

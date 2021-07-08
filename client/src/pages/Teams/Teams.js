import React from 'react';
import {
  chakra,
  SimpleGrid,
  Flex,
  useColorModeValue,
  Divider,
  Spacer,
} from '@chakra-ui/react';

import TeamCard from './TeamCard';
import JoinOrCreateBtn from './JoinOrCreateBtn';
import { useSelector } from 'react-redux';

const Teams = () => {
  // get the teams which the current logged in user has joined
  const { teams } = useSelector(({ firebase }) => firebase.profile);

  return (
    <Flex
      flexDir="column"
      bg={useColorModeValue('gray.50', 'gray.600')}
      justifyContent="center"
      alignItems="left"
    >
      <Flex w="auto">
        <chakra.h3
          fontSize={{ base: 'xl', sm: '2xl' }}
          lineHeight="8"
          py={3}
          alignSelf="left"
          bgGradient="linear(to right, #120B82 0%, #56C4BD 100%)"
          bgClip="text"
          fontWeight="bold"
        >
          Teams
        </chakra.h3>
        <Spacer />
        <JoinOrCreateBtn />
      </Flex>

      <Divider color="whiteAlpha.900" />

      <Flex
        bg={useColorModeValue('gray.50', 'gray.600')}
        w="auto"
        justifyContent="center"
        alignItems="center"
        p={4}
        mt={4}
        mx={5}
      >
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          alignItems="center"
          spacingX={{ base: 16, lg: 24 }}
          spacingY={20}
        >
          {teams?.map((team) => (
            <TeamCard teamName={team} />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Teams;

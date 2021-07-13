import React from 'react';
import {
  chakra,
  SimpleGrid,
  Flex,
  useColorModeValue,
  Divider,
  Spacer,
  Image,
  HStack,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

import TeamCard from './TeamCard';
import JoinOrCreateBtn from '../JoinOrCreate/JoinOrCreateBtn';
import { useSelector } from 'react-redux';
import TeamHomeImage from '../../../assets/team-home.svg';

const Teams = () => {
  const teams = useSelector(({ firestore }) => {
    // convert the teams object into teams array
    // for easy iteration
    const teams = firestore.data.teams;
    if (!teams) {
      return null;
    }
    return Object.entries(teams)
      .map(([teamId, team]) => team)
      .filter((team) => team.isPrivate === false);
  });
  console.log('teams :>> ', teams);
  console.log('teams home page :>> ', teams);
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
        {teams && teams.length ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            alignItems="center"
            spacingX={{ base: 16, lg: 24 }}
            spacingY={20}
          >
            {teams
              .filter((team) => !team.isPrivate)
              .map((team) => (
                <TeamCard teamName={team.name} teamId={team.id} key={team.id} />
              ))}
          </SimpleGrid>
        ) : (
          <HStack
            h={{
              base: '80%', // 0-48em
              md: '90%', // 48em-80em,
              xl: '95%', // 80em+
            }}
            justifyContent="space-around"
            w="full"
          >
            <Image
              w="full"
              alignSelf="center"
              boxSize="70vh"
              src={TeamHomeImage}
              alt="Teams landing page to create, join and view teams"
            />
            <Box boxSize="xs" alignSelf="right" p={4}>
              <Heading
                bgGradient="linear(to-l, #6D389C, #300B61)"
                bgClip="text"
                fontSize="3xl"
                fontWeight="bold"
                as="h3"
                textAlign="center"
                py={4}
              >
                Welcome to Microsoft Teams
              </Heading>
              <Text fontSize="xl" textAlign="center" color="gray.700">
                Create or join a team by clicking on the button above.
              </Text>
            </Box>
          </HStack>
        )}
      </Flex>
    </Flex>
  );
};

export default Teams;

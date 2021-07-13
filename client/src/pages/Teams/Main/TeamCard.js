import React from 'react';
import { chakra, Box, useColorModeValue } from '@chakra-ui/react';
import TeamAvatar from './TeamAvatar';
import { useHistory } from 'react-router-dom';

const TeamCard = ({ teamName, teamId }) => {
  const history = useHistory();

  return (
    <Box
      as="button"
      boxSize={200}
      shadow="xl"
      m="auto"
      p={6}
      bgColor={useColorModeValue('gray.50', 'brand.100')}
      _hover={{
        background: 'gray.200',
        color: 'teal.500',
      }}
      rounded="xl"
      onClick={() => history.push(`/teams/${teamId}`)}
    >
      <TeamAvatar name={teamName} />
      <chakra.h3
        mb={2}
        fontWeight="semibold"
        lineHeight="shorter"
        color={useColorModeValue('gray.900')}
      >
        {teamName}
      </chakra.h3>
    </Box>
  );
};

export default TeamCard;

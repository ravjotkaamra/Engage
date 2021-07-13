import {
  Flex,
  Box,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  HStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Meetings from './Meeting/Meetings';
import Participants from './Participants/Participants';
import DescriptionForm from './DescriptionForm';

const TeamSidebar = () => {
  const { teamId } = useParams();
  const team = useSelector(({ firestore }) => firestore.data.teams[teamId]);
  console.log('team :>> ', team);
  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <Flex alignSelf="left">
        <Stat>
          <HStack>
            <StatNumber fontSize="lg" fontWeight="bold" ml="3">
              Description
            </StatNumber>
            <DescriptionForm defaultValue={team.description} />
          </HStack>

          <StatLabel ml={3} mt={3} color="gray.700">
            {team.description}
          </StatLabel>
        </Stat>
      </Flex>
      <Box px={8} w="full">
        <Divider mt={6} color="gray.100" />
      </Box>

      <Flex w="full" overflowY="auto">
        <Tabs isFitted variant="enclosed-colored" p={2} w="full">
          <TabList>
            <Tab _selected={{ color: 'white', bg: '#1d3557', shadow: 'sm' }}>
              Meetings
            </Tab>
            <Tab _selected={{ color: 'white', bg: '#1d3557', shadow: 'sm' }}>
              Participants
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Meetings />
            </TabPanel>
            <TabPanel>
              <Participants memberIds={team.members} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default TeamSidebar;

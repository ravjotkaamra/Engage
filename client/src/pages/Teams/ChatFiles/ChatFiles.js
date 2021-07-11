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
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Meetings from './Meetings';
import Participants from './Participants';

const ChatFiles = () => {
  const { teamId } = useParams();
  const team = useSelector(({ firestore }) => firestore.data.teams[teamId]);
  console.log('team :>> ', team);
  return (
    <Flex h="full" flexDirection="column" alignItems="center" w="full" pt={8}>
      <Flex alignSelf="left">
        <Stat>
          <StatNumber
            bgGradient="linear(to-r, #10155C, #167D5B)"
            bgClip="text"
            fontSize="xl"
            fontWeight="bold"
            ml="3"
          >
            Description
          </StatNumber>
          <StatLabel ml={3} color="gray.700">
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

export default ChatFiles;

import React from 'react';
import { Link as ReachLink, useHistory } from 'react-router-dom';
import {
  chakra,
  HStack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  VStack,
  Button,
  useColorMode,
  SimpleGrid,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';
import LoginBtn from './LoginBtn';
import SignupBtn from './SignupBtn';
import LogoutBtn from './LogoutBtn';
import { SiMicrosoftteams, SiFirebase } from 'react-icons/si';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { MdChat } from 'react-icons/md';
import { AiFillHome, AiOutlineInbox, AiOutlineMenu } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Navbar({ authenticated }) {
  const history = useHistory();
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const bg = useColorModeValue('white', 'gray.800');
  const ref = React.useRef();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  const cl = useColorModeValue('gray.800', 'white');
  const mobileNav = useDisclosure();

  const Section = (props) => {
    const ic = useColorModeValue('brand.600', 'brand.50');
    const hbg = useColorModeValue('gray.50', 'brand.400');
    const tcl = useColorModeValue('gray.900', 'gray.50');
    const dcl = useColorModeValue('gray.500', 'gray.50');
    return (
      <Link
        m={-3}
        p={3}
        display="flex"
        alignItems="start"
        rounded="lg"
        _hover={{ bg: hbg }}
      >
        <Icon as={props.icon} color={ic} boxSize={6} />

        <Box ml={4}>
          <chakra.p fontSize="sm" fontWeight="700" color={tcl}>
            {props.title}
          </chakra.p>
          <chakra.p mt={1} fontSize="sm" color={dcl}>
            {props.children}
          </chakra.p>
        </Box>
      </Link>
    );
  };

  const Features = (props) => {
    return (
      <SimpleGrid
        columns={props.h ? { base: 1, md: 3, lg: 5 } : 1}
        pos="relative"
        gap={{ base: 6, sm: 8 }}
        px={5}
        py={6}
        p={{ sm: 8 }}
      >
        <Section title="Teams" icon={SiMicrosoftteams}>
          Whether it’s chat, calls, or video, anyone can engage at any time,
          bringing everyone closer.
        </Section>

        <Section title="Meet" icon={AiOutlineVideoCamera}>
          Make and receive calls directly in Microsoft Teams with advanced
          features like group calling, cloud voicemail, and call transfers.
        </Section>

        <Section title="Chat" icon={MdChat}>
          Share your opinion and have fun with your team. Send messages in a
          group chat or in one-to-one messages.
        </Section>

        <Section icon={SiFirebase} title="Firebase">
          Used firebase as database for real time chatting, creating teams and
          meetings.
        </Section>
      </SimpleGrid>
    );
  };
  const AuthButton = () => {
    if (authenticated) {
      return <LogoutBtn />;
    } else {
      return (
        <>
          <LoginBtn />
          <SignupBtn />
        </>
      );
    }
  };
  const MobileNavContent = () => {
    const history = useHistory();
    return (
      <VStack
        pos="absolute"
        top={0}
        left={0}
        right={0}
        display={mobileNav.isOpen ? 'flex' : 'none'}
        flexDirection="column"
        p={2}
        pb={4}
        m={2}
        bg={bg}
        spacing={3}
        rounded="sm"
        shadow="sm"
      >
        <CloseButton
          aria-label="Close menu"
          justifySelf="self-start"
          onClick={mobileNav.onClose}
        />
        <Button
          w="full"
          variant="ghost"
          leftIcon={<AiFillHome />}
          onClick={() => history.push('/meet')}
        >
          Dashboard
        </Button>
        <Button
          w="full"
          variant="solid"
          colorScheme="brand"
          leftIcon={<AiOutlineInbox />}
          onClick={() => history.push('/about')}
        >
          About
        </Button>
        <AuthButton />
      </VStack>
    );
  };
  return (
    <React.Fragment>
      <chakra.header
        ref={ref}
        shadow={y > height ? 'sm' : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        w="full"
        overflowY="hidden"
        borderBottomWidth={2}
        borderBottomColor={useColorModeValue('gray.200', 'gray.900')}
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex align="flex-start">
              <Link as={ReachLink} to="/">
                <HStack>
                  <Heading color="brand.600">Teams</Heading>
                </HStack>
              </Link>
            </Flex>
            <Flex>
              <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
                <Button
                  onClick={() => history.push('/teams')}
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: cl }}
                  _focus={{ boxShadow: 'none' }}
                >
                  Dashboard
                </Button>
                <Popover>
                  <PopoverTrigger>
                    <Button
                      bg={bg}
                      color="gray.500"
                      display="inline-flex"
                      alignItems="center"
                      fontSize="md"
                      _hover={{ color: cl }}
                      _focus={{ boxShadow: 'none' }}
                      rightIcon={<IoIosArrowDown />}
                    >
                      Features
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    w="100vw"
                    maxW="md"
                    _focus={{ boxShadow: 'md' }}
                  >
                    <Features />
                  </PopoverContent>
                </Popover>

                <Button
                  bg={bg}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: cl }}
                  _focus={{ boxShadow: 'none' }}
                  onClick={() => history.push('/about')}
                >
                  About
                </Button>
              </HStack>
            </Flex>
            <Flex justify="flex-end" align="center" color="gray.400">
              <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
                <AuthButton />
              </HStack>
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: '0', md: '3' }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue('gray.800', 'inherit')}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            </Flex>
          </Flex>
          <MobileNavContent />
        </chakra.div>
      </chakra.header>
    </React.Fragment>
  );
}

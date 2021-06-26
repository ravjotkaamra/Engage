import { useFirebase } from 'react-redux-firebase';
import { Link as ReachLink, useHistory } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Stack,
  Link,
  Button,
  IconButton,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { signInWithGoogle, signup } from '../helpers/auth';

export default function Login() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // firebase object from useFirebase hook
  const firebase = useFirebase();
  const history = useHistory();

  // if the user submits the signUp form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = `${firstName} ${lastName}`;
    try {
      const userCredential = await signup(email, password);
      // update the display name of the user
      await userCredential.user.updateProfile({
        displayName: name,
      });

      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    } catch (err) {
      console.log('trouble signing up :>> ', err);
    }
  };

  // if the user clicks the signup with google button
  const googleSignIn = async () => {
    try {
      await signInWithGoogle(firebase);
      history.push('/meet');
    } catch (err) {
      console.log('trouble signing up with google :>> ', err);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Create a new account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Already have an account{' '}
            <Link as={ReachLink} to="/login" color={'blue.400'}>
              login
            </Link>
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <FormControl id="first-name">
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    placeholder="John"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="last-name">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    placeholder="Doe (optional)"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  required
                  placeholder="johndoe@microsoft.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    required
                    minLength="6"
                    placeholder="Must have atleast 6 characters"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="hideOrShowPass"
                      icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Stack className="login-btns">
                  <Button
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Sign up
                  </Button>
                  <Text fontSize={'md'} color={'gray.600'} align={'center'}>
                    OR
                  </Text>
                  <Button
                    leftIcon={<FaGoogle />}
                    bg={'red.400'}
                    color={'white'}
                    _hover={{
                      bg: 'red.500',
                    }}
                    onClick={googleSignIn}
                  >
                    Sign up with Google
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

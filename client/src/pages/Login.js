import { useDispatch } from 'react-redux';
import { Link as ReachLink } from 'react-router-dom';
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
import { login } from '../actions/authentication/loginActions';
import { signInWithGoogle } from '../actions/authentication/oauthAction';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // const history = useHistory();
  const dispatch = useDispatch();

  // if the user submits the login form
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(login(email, password));
      setEmail('');
      setPassword('');
    } catch (err) {
      console.log('error signing in :>> ', err);
    }
  };

  // if the user clicks the signin with google button
  const googleSignIn = () => {
    dispatch(signInWithGoogle());
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
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Don't have an account{' '}
            <Link as={ReachLink} to="/signup" color={'blue.400'}>
              signup
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
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  required
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
                    Sign in
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
                    Sign in with Google
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

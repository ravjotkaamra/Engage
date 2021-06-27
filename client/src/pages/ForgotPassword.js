import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { EmailIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { HiLogin } from 'react-icons/hi';
import { useState } from 'react';
import { resetPasswordWithEmail } from '../actions/authentication/resetActions';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  // const history = useHistory();
  const dispatch = useDispatch();
  const history = useHistory();

  // if the user submits the login form
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPasswordWithEmail(email));
    setEmail('');
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
          <Heading align="center" fontSize={'4xl'}>Trouble Logging In?</Heading>
          <Text align="center" fontSize={'md'} color={'gray.600'}>
            Enter your email address and we'll send you a link to get back into
            your account.
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
                  placeholder="johndoe@microsoft.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <Stack spacing={10}>
                <Stack className="login-btns">
                  <Button
                    leftIcon={<EmailIcon />}
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Send Reset Link
                  </Button>
                  <Text fontSize={'md'} color={'gray.600'} align={'center'}>
                    OR
                  </Text>
                  <Button
                    leftIcon={<HiLogin />}
                    bg={'green.50'}
                    color={'blackAlpha.700'}
                    _hover={{
                      bg: 'green.100',
                    }}
                    onClick={() => history.push('/login')}
                  >
                    Back To Login
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

import {
  Input,
  Stack,
  InputRightElement,
  InputGroup,
  Button,
  Text,
} from '@chakra-ui/core';
import { useState, useContext } from 'react';
import { Container } from '../components/Container';
import { useRouter } from 'next/router';
import { getAgentByEmail } from '../firebase/queries';
import { FirebaseContext } from '../firebase/';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();
  const auth = useContext(FirebaseContext);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const emailChange = (e) => {
    setPasswordError('');
    setEmailError('');
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPasswordError('');
    setEmailError('');
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    await auth
      .loginInWithEmailAndPassword(email, password)
      .then(async () => {
        getAgentByEmail(email).then((snapshot) => {
          if (snapshot.size > 0) {
            snapshot.forEach(async (agent) => {
              const agentID = agent.ref.id;
              router.push(`/${agentID}/clients`);
            });
          }
        });
      })
      .catch((err) => {
        console.log(err.code);
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(
              "We weren't able to find an account with that email. Try again!"
            );
            break;
          case 'auth/wrong-password':
            setPasswordError(
              'Looks like your password is incorrect. Try again!'
            );
            break;
        }
      });
  };

  const disableButton = (!emailError && !passwordError && !email) || !password;

  return (
    <Container auth={auth} boxSize='medium'>
      <Stack mt='4em' spacing={4}>
        <InputGroup>
          <Input onChange={emailChange} type='email' placeholder='Email' />
        </InputGroup>
        <Text color='#de0b3a'> {emailError} </Text>
        <InputGroup>
          <Input
            onChange={passwordChange}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={togglePassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text color='#de0b3a'> {passwordError} </Text>
        <Button onClick={handleLogin} disabled={disableButton}>
          Log In
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;

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
import { addAgent } from '../firebase/queries';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../firebase/';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agentAlreadyExistsError, setAgentAlreadyExistsError] = useState('');
  const router = useRouter();
  const auth = useContext(FirebaseContext);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  const fnameChange = (e) => {
    setAgentAlreadyExistsError('');
    setFname(e.target.value);
  };
  const lnameChange = (e) => {
    setAgentAlreadyExistsError('');
    setLname(e.target.value);
  };
  const emailChange = (e) => {
    setAgentAlreadyExistsError('');
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setAgentAlreadyExistsError('');
    setPassword(e.target.value);
  };

  const handleSignup = async () => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await addAgent({
          fname: fname,
          lname: lname,
          email: email,
        }).then((docRef) => router.push(`/${docRef.id}/clients`));
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
        }
      });
  };

  return (
    <Container auth={auth} boxSize='medium'>
      <Stack mt='4em' spacing={4}>
        <InputGroup>
          <Input onChange={fnameChange} type='text' placeholder='First Name' />
        </InputGroup>
        <InputGroup>
          <Input onChange={lnameChange} type='text' placeholder='Last Name' />
        </InputGroup>
        <InputGroup>
          <Input onChange={emailChange} type='email' placeholder='Email' />
        </InputGroup>
        <InputGroup>
          <Input
            onChange={passwordChange}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text color='#de0b3a'> {agentAlreadyExistsError} </Text>
        <Button onClick={handleSignup}> Sign Up </Button>
      </Stack>
    </Container>
  );
};

export default Signup;

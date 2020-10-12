import { Box, Heading, Text, Button } from '@chakra-ui/core';
import NextLink from 'next/link';
import { getAgentByEmail } from '../firebase/queries';
import { useEffect, useState } from 'react';
import { useAuthUser } from '../session';

const AgentBox = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [agentID, setAgentID] = useState(null);
  const authUser = useAuthUser();

  useEffect(() => {
    if (!!authUser) {
      setIsUserLoggedIn(true);
      getAgentByEmail(authUser.email).then((snapshot) => {
        if (snapshot.size > 0) {
          snapshot.forEach((agent) => {
            const id = agent.ref.id;
            setAgentID(id);
          });
        }
      });
    }
  }, [authUser]);

  return (
    <Box
      boxShadow='0 0 1rem 0 rgba(100,110,140,.2)'
      padding='2em'
      borderRadius='6px'
      width='100%'
    >
      <Heading mb='.5em'> Agent </Heading>
      {!isUserLoggedIn ? (
        <>
          <Text>
            If you already have an account, login to view, edit, and add
            clients.
          </Text>
          <Text mb='2em'> Don't have an account yet? Sign up below! </Text>
          <a href='/login'>
            <Button w='200px' mb='.5em' mr='1em'>
              Log In
            </Button>
          </a>
          <a href='/signup'>
            <Button w='200px' mb='.5em'>
              Sign Up
            </Button>
          </a>
        </>
      ) : (
        <>
          <Text mb='2em'>
            Keep track of your clients and their progress here.
          </Text>
          <NextLink href={`/[agentID]/clients`} as={`/${agentID}/clients`}>
            <a>
              <Button w='200px' mb='.5em' mr='1em'>
                Go to my clients
              </Button>
            </a>
          </NextLink>
        </>
      )}
    </Box>
  );
};

export default AgentBox;

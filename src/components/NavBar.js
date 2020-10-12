import {
  Flex,
  Heading,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { useAuthUser } from '../session';
import { FirebaseContext } from '../firebase';
import { getAgentByEmail } from '../firebase/queries';

const NavBar = () => {
  const authUser = useAuthUser();
  const auth = useContext(FirebaseContext);
  const router = useRouter();
  const [agentName, setAgentName] = useState('');
  const [agentID, setAgentID] = useState('');
  const [arrowDown, setArrowDown] = useState(true);

  useEffect(() => {
    if (authUser) {
      getAgentByEmail(authUser.email).then((snapshot) => {
        if (snapshot.size > 0) {
          snapshot.forEach((agent) => {
            setAgentName(agent.data().fname);
            setAgentID(agent.id);
          });
        }
      });
    }
  }, [authUser]);

  const handleLogout = async () => {
    await auth.logout().then(() => {
      let forceReload = false;
      if (router.pathname === '/') forceReload = true;
      router.push('/');
      if (forceReload) router.reload();
    });
  };

  const goToClientsPage = () => {
    router.push(`/${agentID}/clients`);
  };

  const goToProfilePage = () => {
    router.push(`/${agentID}/profile`);
  };

  return (
    <Flex
      zIndex={1}
      position='sticky'
      top={0}
      bg='coolBlue'
      p={3}
      boxShadow='0 0 1rem 0 rgba(100,110,140,.2)'
    >
      <Flex flex={1} m='auto' ml='1em' align='center'>
        <a href='/'>
          <Heading size='lg' color='white'>
            Realtime
          </Heading>
        </a>
        <Flex ml='auto' alignItems='center'>
          {agentName && !!authUser && (
            <Popover usePortal>
              <PopoverTrigger>
                <Button
                  rightIcon={arrowDown ? 'chevron-down' : 'chevron-up'}
                  bg='coolBlue'
                  color='white'
                  mr='1em'
                  fontSize='md'
                  _hover={{ bg: 'coolBlue' }}
                  _active={{ bg: 'coolBlue' }}
                  onClick={() => setArrowDown(!arrowDown)}
                >
                  {agentName}
                </Button>
              </PopoverTrigger>
              <PopoverContent zIndex={4}>
                <PopoverBody>
                  <Button
                    leftIcon='plus-square'
                    mb='.5em'
                    w='100%'
                    size='sm'
                    onClick={goToClientsPage}
                  >
                    Clients
                  </Button>
                  <Button
                    mb='.5em'
                    leftIcon='settings'
                    w='100%'
                    size='sm'
                    onClick={goToProfilePage}
                  >
                    Profile
                  </Button>
                  <Button
                    leftIcon='lock'
                    w='100%'
                    size='sm'
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;

import { Alert, AlertIcon, AlertTitle, Button } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const AlertError = () => {
  const router = useRouter();
  const goHome = () => {
    router.replace('/');
  };

  return (
    <Alert
      status='warning'
      variant='top-accent'
      flexDirection='column'
      justifyContent='center'
      textAlign='center'
      height='200px'
      borderRadius='6px'
      mt='2em'
    >
      <AlertIcon size='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        This ID is not valid. Please check with your agent to make sure you have
        the right ID.
      </AlertTitle>
      <NextLink href='/'>
        <a>
          <Button onClick={goHome}> Ok </Button>
        </a>
      </NextLink>
    </Alert>
  );
};

export default AlertError;

import {
  Flex,
  Button,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useClipboard,
} from '@chakra-ui/core';

const AlertSuccess = ({ url, title, description }) => {
  const { onCopy, hasCopied } = useClipboard(url);

  return (
    <Alert
      status='success'
      variant='top-accent'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      textAlign='center'
      height='200px'
      borderRadius='6px'
      mt='2em'
    >
      <AlertIcon size='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        {title}
      </AlertTitle>
      <AlertDescription maxWidth='sm' mb='1em'>
        {description}
      </AlertDescription>
      <Flex mb={2}>
        <Input value={url} />
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </Flex>
    </Alert>
  );
};

export default AlertSuccess;

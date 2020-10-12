import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Text,
  Badge,
  useClipboard,
  Input,
} from '@chakra-ui/core';
import NextLink from 'next/link';
import { Status } from './Status';
import { deleteClientByID } from '../firebase/queries';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ClientCard = ({ client, openEditModal, setEditingClient }) => {
  const router = useRouter();
  const [value, setValue] = useState(
    `${window.location.origin}/status/${client.clientID}`
  );
  const { onCopy } = useClipboard(value);
  const deleteClient = async (client) => {
    await deleteClientByID(client.clientID).then(() => router.reload());
  };

  const handleEditClick = () => {
    openEditModal();
    setEditingClient(client);
  };

  const isNewClient = (client) => {
    return (Date.now() - client.createdAt) / (1000 * 60 * 60 * 24) < 1;
  };

  return (
    <Box
      boxShadow='0 0 1rem 0 rgba(100,110,140,.2)'
      padding='1em'
      my='1em'
      borderRadius='6px'
      key={client.clientID}
    >
      <Flex alignItems='center'>
        <NextLink href='/status/[clientID]' as={`/status/${client.clientID}`}>
          <a>
            <Heading mb='.2em' fontSize='2xl'>
              {client.fname} {client.lname}
            </Heading>
            <Text mb='.5em'> {client.property} </Text>
            <Badge fontSize='.8em' variant='subtle' variantColor='purple'>
              {client.status.toFixed(1)}%
            </Badge>
            {client.createdAt && isNewClient(client) && (
              <Badge
                ml='.8em'
                fontSize='sm'
                variant='subtle'
                variantColor='blue'
              >
                New
              </Badge>
            )}
          </a>
        </NextLink>
        <Box ml='auto'>
          <Input display='none' value={value} isReadOnly />
          <Button onClick={onCopy} w='40px' bg='white'>
            <Icon name='copy' size='20px' />
          </Button>
          <Button onClick={handleEditClick} w='40px' bg='white'>
            <Icon name='edit' size='20px' />
          </Button>
          <Button w='40px' bg='white' onClick={() => deleteClient(client)}>
            <Icon m='1em' name='delete' size='20px' />
          </Button>
        </Box>
      </Flex>
      <Status status={client.status} mt='2em' mb='1em' />
    </Box>
  );
};

export default ClientCard;

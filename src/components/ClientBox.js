import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Icon,
  Flex,
  Tooltip,
} from '@chakra-ui/core';
import { useState } from 'react';
import { getClientByID } from '../firebase/queries';
import { useRouter } from 'next/router';

const ClientBox = () => {
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [clientID, setClientID] = useState('');
  const [wrongIdMessage, setWrongIdMessage] = useState('');

  const router = useRouter();

  const goToStatus = () => {
    router.push(`/status/${clientID}`);
  };

  const searchForClient = async (e) => {
    // TODO: sanitize input
    let inputID = e.target.value;
    if (!inputID.length) {
      setWrongIdMessage('');
      return;
    }
    inputID = inputID.replace(/\/||./g, '');
    setClientID(inputID);
    // TODO: This is getting called too many times
    if (inputID.length > 0) {
      await getClientByID(inputID).then((docSnap) => {
        if (docSnap.data() !== undefined) {
          setWrongIdMessage('');
          setClientID(inputID);
          setDisableSubmit(false);
        } else {
          setWrongIdMessage("Sorry, we can't find that ID.");
        }
      });
    } else {
      setWrongIdMessage("Sorry, we can't find that ID.");
    }
  };

  return (
    <Box
      boxShadow='0 0 1rem 0 rgba(100,110,140,.2)'
      padding='2em'
      borderRadius='6px'
      width='100%'
    >
      <Heading mb='.5em'> Renter or Buyer </Heading>
      <label>
        <Flex justifyContent='space-between' alignItems='center'>
          <Text mb='.5em'> Enter your Realtime ID </Text>
          <Tooltip
            hasArrow
            label="If you don't know your Realtime ID, please ask your Real Estate Agent."
            placement='top'
          >
            <Icon name='info' />
          </Tooltip>
        </Flex>
      </label>
      <Input onChange={searchForClient} mb='1em' />
      <Text mb='1em' color='#de0b3a'>
        {wrongIdMessage}
      </Text>
      <Button onClick={goToStatus} disabled={disableSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default ClientBox;

import { Heading, Text, Stack } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import AlertWarning from '../../components/AlertWarning';
import { Status } from '../../components/Status';
import { getClientByID } from '../../firebase/queries';
import CompletedTasks from '../../components/CompletedTasks';
import TodoTasks from '../../components/TodoTasks';

const StatusPage = () => {
  const router = useRouter();
  const { clientID } = router.query;
  const [showAlert, setShowAlert] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (clientID) {
      getClientByID(clientID).then((docSnap) => {
        let clientData;
        if ((clientData = docSnap.data()) !== undefined) {
          setClient(clientData);
        } else {
          setShowAlert(true);
        }
      });
    }
  }, [clientID]);

  const completed =
    client && client.tasks.filter((task) => task.status === 'C');
  const todos =
    client &&
    client.tasks.filter(
      (task) => task.status === 'NYS' || task.status === 'IP'
    );

  return (
    <Container>
      {showAlert ? (
        <AlertWarning />
      ) : (
        <>
          {client && (
            <Stack my='4em'>
              <Heading>
                {client.fname} {client.lname}
              </Heading>
              <Text>{client.property}</Text>
            </Stack>
          )}
          <Status status={client ? client.status : 0} mb='5em' />
          <Stack>
            <CompletedTasks completed={completed} />
            <TodoTasks todos={todos} client={client} />
          </Stack>
        </>
      )}
    </Container>
  );
};

export default StatusPage;

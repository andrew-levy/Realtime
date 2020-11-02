import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ClientFormContent from './ClientFormContent';
import useFormInputStates from '../utils/useFormInputStates';
import { updateClientByID } from '../firebase/queries';
import { getStatus } from '../utils/getStatus';
import { useToast } from '@chakra-ui/core';

const EditClientForm = ({ client, setFormSubmitted }) => {
  const router = useRouter();
  const { agentID } = router.query;
  const inputStates = useFormInputStates();
  const toast = useToast();

  useEffect(() => {
    inputStates.setFname(client.fname);
    inputStates.setLname(client.lname);
    inputStates.setEmail(client.email);
    inputStates.setProperty(client.property);
    inputStates.setTasks(client.tasks);
  }, [client]);

  const updateClient = async () => {
    const now = Date.now();
    await updateClientByID(
      {
        fname: inputStates.fname,
        lname: inputStates.lname,
        email: inputStates.email,
        property: inputStates.property,
        tasks: inputStates.tasks,
        status: getStatus(inputStates.tasks),
        agentID: agentID,
        updatedAt: now,
      },
      client.clientID
    ).then(() => {
      setFormSubmitted(true);
      toast({
        title: 'Client successfully edited!',
        description: ``,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    });
  };

  return (
    <>
      <ClientFormContent
        onSubmit={updateClient}
        buttonText='Update Client'
        data={null}
        inputStates={inputStates}
      />
    </>
  );
};

export default EditClientForm;

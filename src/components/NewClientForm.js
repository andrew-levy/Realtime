import { useState } from 'react';
import { addClient } from '../firebase/queries';
import { useRouter } from 'next/router';
import ClientFormContent from './ClientFormContent';
import useFormInputStates from '../utils/useFormInputStates';
import { getStatus } from '../utils/getStatus';
import { useToast } from '@chakra-ui/core';

const NewClientForm = ({ setFormSubmitted }) => {
  const inputStates = useFormInputStates();
  const router = useRouter();
  const { agentID } = router.query;
  const toast = useToast();

  const addNewClient = async () => {
    const now = Date.now();
    await addClient({
      fname: inputStates.fname,
      lname: inputStates.lname,
      email: inputStates.email,
      property: inputStates.property,
      tasks: inputStates.tasks,
      status: getStatus(inputStates.tasks),
      agentID: agentID,
      createdAt: now,
      updatedAt: now,
    }).then((docRef) => {
      setFormSubmitted(true);
      toast({
        title: 'Client successfully added!',
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
        onSubmit={addNewClient}
        buttonText='Add Client'
        inputStates={inputStates}
      />
    </>
  );
};

export default NewClientForm;

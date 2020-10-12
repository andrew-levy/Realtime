import { Heading, Button, Flex, Icon, Box } from '@chakra-ui/core';
import { Container } from '../../components/Container';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getClientsByAgent, getAgentByID } from '../../firebase/queries';
import ClientCard from '../../components/ClientCard';
import ClientModal from '../../components/ClientModal';
import NewClientForm from '../../components/NewClientForm';
import EditClientForm from '../../components/EditClientForm';
import { withAuthorization, useAuthUser } from '../../session';

const ClientsPage = () => {
  const router = useRouter();
  const { agentID } = router.query;
  const [clients, setClients] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [agent, setAgent] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const authUser = useAuthUser();

  useEffect(() => {
    const getClients = () => {
      getClientsByAgent(agentID).then((snapashot) => {
        if (snapashot.size > 0) {
          let clientList = [];
          snapashot.forEach((client) => {
            let clientObj = {
              ...client.data(),
              clientID: client.ref.id,
            };
            clientList.push(clientObj);
          });
          setClients(
            clientList.sort((c1, c2) => (c1.createdAt > c2.createdAt ? 1 : -1))
          );
        }
      });
    };

    const getAgent = () => {
      getAgentByID(agentID).then((docSnap) => {
        let agentData;
        if ((agentData = docSnap.data()) !== undefined) {
          if (agentData.email !== authUser.email) {
            router.replace('/');
          } else {
            setAgent(agentData);
          }
        } else {
          router.replace('/');
        }
      });
    };

    if (agentID && authUser) {
      getAgent();
      getClients();
    }
  }, [agentID, authUser]);

  const openNewClientModal = () => {
    setIsNewModalOpen(true);
  };
  const closeNewModal = () => {
    if (formSubmitted) {
      setIsNewModalOpen(false);
      if (formSubmitted) router.reload();
    } else {
      // alert('Any unsaved changed will be lost. Are you sure you want to quit?');
      setIsNewModalOpen(false);
    }
  };
  const openEditClientModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    // alert('Any unsaved changed will be lost. Are you sure you want to quit?');
    setIsEditModalOpen(false);
    if (formSubmitted) router.reload();
  };

  return (
    <Container>
      <Flex justifyContent='space-between' my='2em'>
        <Heading fontSize='3xl'> Clients </Heading>
        <Box ml='auto'>
          <Button onClick={openNewClientModal}>
            <Icon name='add' />
          </Button>
        </Box>
      </Flex>
      {clients ? (
        clients.map((client) => (
          <ClientCard
            client={client}
            agentID={agentID}
            openEditModal={openEditClientModal}
            setEditingClient={setEditingClient}
          />
        ))
      ) : (
        <Flex
          boxShadow='0 0 1rem 0 rgba(100,110,140,.2)'
          padding='1em'
          my='1em'
          borderRadius='6px'
          justifyContent='center'
          alignItems='center'
        >
          <Heading my={3} size='lg'>
            No clients yet
          </Heading>
        </Flex>
      )}
      <ClientModal
        isOpen={isNewModalOpen}
        onClose={closeNewModal}
        modalHeader='New Client'
      >
        <NewClientForm setFormSubmitted={setFormSubmitted} />
      </ClientModal>
      <ClientModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        modalHeader='Edit Client'
      >
        <EditClientForm
          client={editingClient}
          setFormSubmitted={setFormSubmitted}
        />
      </ClientModal>
    </Container>
  );
};

export default withAuthorization(ClientsPage);

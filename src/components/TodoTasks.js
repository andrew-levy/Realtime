import {
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/core';
import sendEmail from '../utils/clientApi';
import { useState, useEffect } from 'react';
import { getAgentByID } from '../firebase/queries';

const TodoTasks = ({ todos, client }) => {
  const toast = useToast();
  const [notified, setNotified] = useState([]);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    let notifiedFromStorage;
    if ((notifiedFromStorage = localStorage.getItem('notified'))) {
      setNotified(JSON.parse(notifiedFromStorage));
    }
  }, []);

  useEffect(() => {
    console.log('new', notified);
    localStorage.setItem('notified', JSON.stringify(notified));
  }, [notified]);

  useEffect(() => {
    if (client) {
      const agentID = client.agentID;
      getAgentByID(agentID).then((docSnap) => {
        let agentData;
        if ((agentData = docSnap.data()) !== undefined) {
          setAgent(agentData);
        }
      });
    }
  }, [client]);

  const getEmailHTML = (taskCompleted) =>
    agent &&
    client &&
    `<h1>Hello ${agent.fname},</h1>
    <p>Your client, ${client.fname} ${client.lname}, has completed a task: <b>${taskCompleted}</b> </p>`;

  const notifyAgentCompleted = (e) => {
    console.log('button pushed', e.target.value);
    setNotified(...notified, e.target.value);
    if (agent) {
      // sendEmail(
      //   agent.email,
      //   'Task Completed',
      //   getEmailHTML(e.target.value)
      // ).then(() => {
      //   toast({
      //     title: 'Notified your agent!',
      //     description: ``,
      //     status: 'success',
      //     duration: 9000,
      //     isClosable: true,
      //     position: 'top',
      //   });
      // });
    }
  };

  return (
    <Stack
      p='1em'
      my={5}
      borderRadius={6}
      boxShadow='0 0 1rem 0 rgba(100,110,140,.2)'
    >
      <Heading size='lg' pb={3}>
        To Do {todos && todos.length ? `(${todos.length})` : ''}
      </Heading>
      <List>
        {todos && todos.length ? (
          todos.map((task, i) => (
            <ListItem
              bg='coolGrey'
              p='.5em'
              borderRadius={6}
              mb={3}
              alignItems='center'
              id={task.name}
            >
              <Accordion defaultIndex={[]} allowToggle>
                <AccordionItem border='none'>
                  <AccordionHeader>
                    <Flex textAlign='left' flex='1'>
                      <Text fontWeight='bold'> {task.label} </Text>
                    </Flex>
                    <AccordionIcon />
                  </AccordionHeader>
                  <AccordionPanel>
                    <Stack>
                      <Text mr='1em'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                      </Text>
                      <Button
                        value={task.label}
                        onClick={notifyAgentCompleted}
                        color='white'
                        bg='coolBlue'
                        width='50%'
                        mt='1em'
                        // isDisabled={notified.includes(task.label)}
                      >
                        Mark as Done
                      </Button>
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </ListItem>
          ))
        ) : (
          <Text> No Tasks </Text>
        )}
      </List>
    </Stack>
  );
};
export default TodoTasks;

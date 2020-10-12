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
  const agentEmail = '';
  const toast = useToast();
  const [isDisabled, setIsDisabled] = useState(false);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    if (client) {
      const agentID = client.agentID;
      getAgentByID(agentID).then((docSnap) => {
        let agentData;
        if ((agentData = docSnap.data()) !== undefined) {
          setAgent(agentData);
          console.log(agentData);
        }
      });
    }
  }, [client]);

  // need agent email and name, client name, and task label
  const emailHTML = `
    <h1>Hello AGENT,</h1>
    <p>Your client, CLIENT, has completed a task: TASK </p>
  `;

  const notifyAgentCompleted = () => {
    sendEmail(agentEmail, ``).then(
      toast({
        title: 'Notified your agent!',
        description: ``,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      })
    );
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
                        onClick={notifyAgentCompleted}
                        color='white'
                        bg='coolBlue'
                        width='50%'
                        mt='1em'
                        isDisabled={isDisabled}
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

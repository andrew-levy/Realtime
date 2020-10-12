import {
  Heading,
  Flex,
  Text,
  Stack,
  Icon,
  List,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/core';

const CompletedTasks = ({ completed }) => {
  return (
    <Stack
      p='1em'
      my={5}
      borderRadius={6}
      boxShadow='0 0 1rem 0 rgba(100,110,140,.2)'
    >
      <Heading size='lg' pb={3}>
        Completed {completed && completed.length ? `(${completed.length})` : ''}
      </Heading>
      <List>
        {completed && completed.length ? (
          completed.map((task, i) => (
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
                    <Flex flex='1' alignItems='center'>
                      <Icon
                        color='green.500'
                        name='check-circle'
                        mr='.5em'
                        size={5}
                      />
                      <Text fontWeight='bold' textAlign='left'>
                        {task.label}
                      </Text>
                    </Flex>
                    <AccordionIcon />
                  </AccordionHeader>
                  <AccordionPanel>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
export default CompletedTasks;

import { Text, Flex, Heading, Stack } from '@chakra-ui/core';
import { Container } from '../components/Container';
import AgentBox from '../components/AgentBox';
import ClientBox from '../components/ClientBox';

const Index = () => {
  return (
    <Container boxSize='large'>
      <Stack>
        <Stack mt='2em' textAlign='center'>
          <Heading size='2xl'>
            Realty in{' '}
            <Text display='inline' color='coolBlue'>
              Realtime
            </Text>
          </Heading>
          <Text> Which best describes you? </Text>
        </Stack>
        <Flex alignItems='center' my='2em' flexBasis='0' direction='column'>
          <ClientBox />
          <Heading m='2em' size='sm'>
            or
          </Heading>
          <AgentBox />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Index;

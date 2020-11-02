import { useColorMode, SimpleGrid, Box } from '@chakra-ui/core';
import NavBar from './NavBar';

export const Container = (props) => {
  return (
    <>
      <NavBar />
      <SimpleGrid
        columns={1}
        margin='1em'
        mx='auto'
        maxW={props.boxSize === 'medium' ? '500px' : '800px'}
        bg='white'
        color='black'
        {...props}
      >
        <Box mx={['1em', '0em']}>{props.children}</Box>
      </SimpleGrid>
    </>
  );
};

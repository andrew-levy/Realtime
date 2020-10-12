import { useColorMode, SimpleGrid, Box } from '@chakra-ui/core';
import NavBar from './NavBar';
import { Footer } from './Footer';

export const Container = (props) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'blue', dark: 'gray.900' };
  const color = { light: 'black', dark: 'white' };

  return (
    <>
      <NavBar />
      <SimpleGrid
        columns={1}
        margin='1em'
        mx='auto'
        maxW={props.boxSize === 'medium' ? '500px' : '800px'}
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        {...props}
      >
        <Box mx={['1em', '0em']}>{props.children}</Box>
      </SimpleGrid>
      {/* <Footer /> */}
    </>
  );
};

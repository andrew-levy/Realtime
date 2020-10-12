import { Flex } from '@chakra-ui/core';

export const Footer = (props) => (
  <Flex
    w='100%'
    zIndex={1}
    bottom={0}
    p={3}
    boxShadow='0 0 1rem 0 rgba(100,110,140,.2)'
  >
    <Flex flex={1} m='auto' justify='center' align='center'>
      Andrew Levy
    </Flex>
  </Flex>
);

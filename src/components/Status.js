import { Progress } from '@chakra-ui/core';

export const Status = (props) => {
  return (
    <Progress
      hasStripe
      isAnimated
      value={props.status}
      color={props.status === 100 ? 'green' : 'blue'}
      borderRadius={6}
      height={3}
      {...props}
    />
  );
};

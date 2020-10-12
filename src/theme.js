import { theme as chakraTheme } from '@chakra-ui/core';

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` };
const breakpoints = ['40em', '52em', '64em'];

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: '#16161D',
    coolBlue: '#3972f4',
    coolGrey: '#edf2f7',
  },
  fonts,
  breakpoints,
};

export default theme;

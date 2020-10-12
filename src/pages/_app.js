import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import theme from '../theme';
import Firebase, { FirebaseContext } from '../firebase';
import '../styles/transitions.css';
import '../styles/global.css';
import 'react-datepicker/dist/react-datepicker.css';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <FirebaseContext.Provider value={new Firebase()}>
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </ThemeProvider>
  );
}

export default App;

import { useContext, useEffect } from 'react';
import useAuthUser from './useAuthUser';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../firebase';

const withAuthorization = (Component) => {
  function WithAuthorization(props) {
    const user = useAuthUser();
    const router = useRouter();
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
      const releaseAuthListener = firebase.onAuthUserListener(
        (authUser) => {
          console.log('Allowed on page: user found', authUser);
        },
        () => {
          console.log('Not allowed on page: user not found');
          router.push('/');
        }
      );
      return () => releaseAuthListener();
    }, []);

    return <Component {...props} />;
  }

  return WithAuthorization;
};

export default withAuthorization;

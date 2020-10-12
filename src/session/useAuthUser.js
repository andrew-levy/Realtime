import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase';

function useAuthUser() {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const releaseAuthListener = firebase.onAuthUserListener(
      (authUser) => {
        console.log('User data needed on page: user found', authUser);
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setAuthUser(authUser);
      },
      () => {
        console.log('User data needed on page: No user found');
        localStorage.removeItem('authUser');
        setAuthUser(null);
      }
    );

    return () => releaseAuthListener();
  }, []);

  return authUser;
}

export default useAuthUser;

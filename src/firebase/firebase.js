import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
// import config from './config';

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp({
        apiKey: 'AIzaSyCnfjb8nq-MvgjV5Qt26m0Iw7lJ0O1z0D4',
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DB_URL,
        projectId: 'realtime-f5b82',
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      });
    }
    this.auth = app.auth();
    this.firestore = app.firestore();
  }

  // *** Auth API ***
  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  loginInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  logout = () => this.auth.signOut();

  sendPasswordResetEmail = (email) => this.auth.sendPasswordResetEmail(email);

  updatePassword = (password) => this.auth.currentUser.updatePassword(password);

  onAuthUserListener = (userFound, userNotFound) =>
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        userFound(user);
      } else {
        userNotFound();
      }
    });
}

export default Firebase;

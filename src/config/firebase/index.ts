// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyB7jYV6hOGW65ZdT8WXyLmVawNPOsij-lE',
  authDomain: 'votesub-kiranbansode.firebaseapp.com',
  projectId: 'votesub-kiranbansode',
  storageBucket: 'votesub-kiranbansode.appspot.com',
  messagingSenderId: '436389693520',
  appId: '1:436389693520:web:1d5e0cffa5c16a4a152955',
  measurementId: 'G-9D6LESEQ6F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();
const functions = getFunctions(app);

// automatically connect to Firebase Emulators in localhost
if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(firestore, 'localhost', 9000);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

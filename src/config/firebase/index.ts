// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
    apiKey: 'AIzaSyBpXpz4rghVJIx-FJSsuTxrhLJrNbOm4Co',
    authDomain: 'kiranbansode-votesub.firebaseapp.com',
    projectId: 'kiranbansode-votesub',
    storageBucket: 'kiranbansode-votesub.appspot.com',
    messagingSenderId: '932399851612',
    appId: '1:932399851612:web:cde57ec475008b554d1e99',
    measurementId: 'G-QNMMM5XC5L',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();
export const storage = getStorage();
export const functions = getFunctions(app, 'asia-south1');

// automatically connect to Firebase Emulators in localhost
if (window.location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
    connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
    connectStorageEmulator(storage, '127.0.0.1', 9199);
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

/* ----------------------------- Cloud Functions ---------------------------- */
export const createNewUserCLF = httpsCallable(functions, 'createNewUser');
export const addNewSubjectCLF = httpsCallable(functions, 'addNewSubject');
export const getSubjectsListCLF = httpsCallable(functions, 'getSubjectsList');
export const getTotalVotesCLF = httpsCallable(functions, 'getTotalVotes');
export const voteNowCLF = httpsCallable(functions, 'voteNow');
export const reduceVotesCLF = httpsCallable(functions, 'reduceVotes');

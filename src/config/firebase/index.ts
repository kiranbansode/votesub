// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

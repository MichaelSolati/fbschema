import {initializeApp} from 'firebase/app';
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
  apiKey: 'test',
  authDomain: 'test',
  projectId: 'test',
  storageBucket: 'test',
  messagingSenderId: 'test',
  appId: 'test',
});

export const firestore = getFirestore();
connectFirestoreEmulator(firestore, 'localhost', 8080);

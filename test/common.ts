import {initializeApp} from 'firebase/app';
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
  apiKey: 'AIzaSyA1EAFq5-MBH9xvInxFc132qpez6EsVNuU',
  authDomain: 'fbschema-87b06.firebaseapp.com',
  projectId: 'fbschema-87b06',
  storageBucket: 'fbschema-87b06.appspot.com',
  messagingSenderId: '667699174963',
  appId: '1:667699174963:web:1885e9f89db704b7aa0d46',
});

export const firestore = getFirestore();
connectFirestoreEmulator(firestore, 'localhost', 8080);

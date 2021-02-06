import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyA1EAFq5-MBH9xvInxFc132qpez6EsVNuU',
  authDomain: 'fbschema-87b06.firebaseapp.com',
  projectId: 'fbschema-87b06',
  storageBucket: 'fbschema-87b06.appspot.com',
  messagingSenderId: '667699174963',
  appId: '1:667699174963:web:1885e9f89db704b7aa0d46',
});

export const firestore = firebase.firestore();
firestore.useEmulator('localhost', 8080);

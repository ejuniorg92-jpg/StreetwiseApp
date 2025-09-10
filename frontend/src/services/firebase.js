// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD9TQiQ8geWfNExsPaPTkTn0WcNPjDt9ok',
  authDomain: 'streetwise-b13be.firebaseapp.com',
  projectId: 'streetwise-b13be',
  storageBucket: 'streetwise-b13be.appspot.com',
  messagingSenderId: '109132040871',
  appId: '1:109132040871:web:409d816a419e4f1c0a6d01',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };







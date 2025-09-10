// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'demo',
  authDomain: 'localhost',
  projectId: 'streetwise-b13be',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
export async function register(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}
export async function logout() {
  return await signOut(auth);
}

export { auth };







import { db } from './firebase';
const firebaseConfig = {
  // Uses your existing front-end config if present in src/firebase.{js/json}
  // Fallbacks below let this file work by itself.
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'streetwise-b13be',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Toggle emulator via VITE_USE_EMULATORS=1
if ((import.meta.env.VITE_USE_EMULATORS || '0') === '1') {
  connectFirestoreEmulator(db, '127.0.0.1', 8081);
}

export { db };




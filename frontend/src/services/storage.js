// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  connectStorageEmulator,
} from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'demo',
  authDomain: 'localhost',
  projectId: 'streetwise-b13be',
  storageBucket: 'streetwise-b13be.appspot.com',
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

if (window.location.hostname === 'localhost') {
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}

export async function uploadFile(file, path = 'uploads/test.txt') {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}







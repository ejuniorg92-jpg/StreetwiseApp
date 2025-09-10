// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { db } from './firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// Logs and analyzes police encounters
export const logPoliceEncounter = async (details) => {
  try {
    await addDoc(collection(db, 'policeEncounters'), {
      ...details,
      createdAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (err) {
    console.error('Error logging encounter:', err);
    return { ok: false, error: err };
  }
};







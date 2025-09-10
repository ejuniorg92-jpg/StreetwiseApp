// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getIncidents = async () => {
  const snap = await getDocs(collection(db, 'incidents'));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};







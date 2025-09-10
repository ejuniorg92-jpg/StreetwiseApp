import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getMissions = async () => {
  const snap = await getDocs(collection(db, 'missions'));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};




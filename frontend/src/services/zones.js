import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getZones = async () => {
  const zonesSnap = await getDocs(collection(db, 'zones'));
  return zonesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};




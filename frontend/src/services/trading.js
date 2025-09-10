import { db } from './firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// Simulated buy/sell trades  replace with Coinbase/KU API later
export const executeTrade = async (type, coin, amount) => {
  try {
    await addDoc(collection(db, 'trades'), {
      type,
      coin,
      amount,
      createdAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (err) {
    console.error('Trade error:', err);
    return { ok: false, error: err };
  }
};




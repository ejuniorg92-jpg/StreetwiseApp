import { db } from './firebase';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function ConnectionCheck() {
  const [status, setStatus] = useState('Checking...');

  useEffect(() => {
    async function testFirestore() {
      try {
        const snap = await getDocs(collection(db, 'test'));
        setStatus(' Firebase Connected (' + snap.size + " docs in 'test')");
      } catch (err) {
        setStatus(' Firebase Connection Failed: ' + err.message);
      }
    }
    testFirestore();
  }, []);

  return (
    <div style={{ padding: '20px', fontSize: '20px' }}>
      <h2>Firestore Connection Check</h2>
      <p>{status}</p>
    </div>
  );
}




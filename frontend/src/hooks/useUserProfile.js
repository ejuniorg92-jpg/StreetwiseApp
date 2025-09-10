// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import * as React from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Ensures the user doc exists with a default tier if missing
async function ensureUserDoc(uid) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(
      ref,
      {
        tier: 'streetwise',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  }
}

export function useUserProfile(uid) {
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(!!uid);

  React.useEffect(() => {
    if (!uid) {
      setProfile(null);
      setLoading(false);
      return;
    }
    (async () => {
      try {
        await ensureUserDoc(uid);
      } catch (e) {
        console.warn(e);
      }
    })();

    const ref = doc(db, 'users', uid);
    const unsub = onSnapshot(ref, (snap) => {
      setProfile(snap.exists() ? snap.data() : null);
      setLoading(false);
    });
    return () => unsub && unsub();
  }, [uid]);

  return { profile, loading };
}







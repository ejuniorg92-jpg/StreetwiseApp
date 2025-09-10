// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { auth } from './firebase';
import * as React from 'react';
import { auth, googleProvider } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = React.useCallback(async () => {
    await signInWithPopup(auth, googleProvider);
  }, []);

  const logout = React.useCallback(async () => {
    await signOut(auth);
  }, []);

  return { user, loading, login, logout };
}







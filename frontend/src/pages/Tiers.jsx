import React from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';

const functions = getFunctions(app);

export default function Tiers({ uid }) {
  const chooseTier = async (tier) => {
    try {
      const upgrade = httpsCallable(functions, 'upgradeTier');
      const res = await upgrade({ uid, tier });
      alert(`Welcome to ${res.data.newTier}!`);
    } catch (err) {
      console.error('Tier upgrade failed', err);
      alert('Tier upgrade failed.');
    }
  };

  return (
    <div className="tiers">
      <button onClick={() => chooseTier('Streetwise')}>Streetwise</button>
      <button onClick={() => chooseTier('Hustler')}>Hustler</button>
      <button onClick={() => chooseTier('Godmode')}>Godmode</button>
    </div>
  );
}




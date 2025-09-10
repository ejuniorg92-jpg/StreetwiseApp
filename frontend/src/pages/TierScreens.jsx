// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState } from 'react';

export default function TierScreens() {
  const [tier, setTier] = useState('streetwise');

  return (
    <div>
      <div>
        <button onClick={() => setTier('streetwise')}>Streetwise</button>
        <button onClick={() => setTier('hustler')}>Hustler</button>
        <button onClick={() => setTier('godmode')}>Godmode</button>
      </div>

      {tier === 'streetwise' && <h2>Streetwise Mode: Chill motivation</h2>}
      {tier === 'hustler' && <h2>Hustler Mode: Daily grind missions</h2>}
      {tier === 'godmode' && <h2>Godmode: The All-Seeing Eye awakens</h2>}
    </div>
  );
}







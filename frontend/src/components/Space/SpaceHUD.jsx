// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React from 'react';
import { useTier } from '../../context/TierContext';

const SpaceHUD = () => {
  const { tier } = useTier();

  return (
    <div className="absolute top-2 left-2 z-20 p-2 bg-black bg-opacity-60 text-green-400 rounded-xl">
      {tier === 'godmode' && <div> Godmode HUD Online</div>}
      {tier === 'hustler' && <div> Hustler HUD Activated</div>}
      {tier === 'streetwise' && <div> Streetwise HUD Ready</div>}
    </div>
  );
};

export default SpaceHUD;







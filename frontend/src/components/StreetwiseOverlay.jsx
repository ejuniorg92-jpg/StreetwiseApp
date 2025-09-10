import React from 'react';
import { useTier } from '../context/TierContext';

const StreetwiseOverlay = () => {
  const { tier } = useTier();

  return (
    <div className="absolute top-0 left-0 w-full flex justify-center items-center pointer-events-none">
      {tier === 'godmode' && (
        <div className="text-yellow-400 text-4xl animate-bounce">
          $ Immortalized Vision $
        </div>
      )}
      {tier === 'hustler' && (
        <div className="text-green-400 text-2xl animate-pulse">
          Hustler Grind Activated
        </div>
      )}
      {tier === 'streetwise' && (
        <div className="text-gray-300 text-lg">
          Stay sharp. Stay Streetwise.
        </div>
      )}
    </div>
  );
};

export default StreetwiseOverlay;




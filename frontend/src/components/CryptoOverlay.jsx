import React, { useState, useEffect } from 'react';
import { useTier } from '../context/TierContext';

const CryptoOverlay = () => {
  const { tier } = useTier();
  const [prices, setPrices] = useState({ BTC: 0, ETH: 0 });

  useEffect(() => {
    // Placeholder  replace with live API later
    setPrices({ BTC: 68000, ETH: 3400 });
  }, []);

  if (tier === 'streetwise') return null;

  return (
    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-yellow-400 p-2 rounded-md z-30">
      <div> BTC: ${prices.BTC}</div>
      <div>Ξ ETH: ${prices.ETH}</div>
    </div>
  );
};

export default CryptoOverlay;




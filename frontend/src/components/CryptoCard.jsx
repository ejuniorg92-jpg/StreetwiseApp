// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState } from 'react';
import { Api } from '../services/api';

export default function CryptoCard() {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadPrices() {
    setLoading(true);
    const data = await Api.getCryptoPrices();
    setPrices(data);
    setLoading(false);
  }

  return (
    <div className="p-4 bg-yellow-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Crypto Prices</h2>
      <button onClick={loadPrices} className="px-4 py-2 bg-yellow-600 rounded">
        Refresh Prices
      </button>
      {loading && <p>Loading...</p>}
      {prices && (
        <ul className="mt-2">
          {Object.entries(prices).map(([coin, val]) => (
            <li key={coin}>
              {coin}: ${val}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}







// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';

const functions = getFunctions(app);

export default function CryptoPrices() {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const getPrices = httpsCallable(functions, 'getCryptoPrices');
        const res = await getPrices();
        setPrices(res.data.prices);
      } catch (err) {
        console.error('Failed to fetch crypto prices', err);
      }
    };
    fetchPrices();
  }, []);

  if (!prices) return <p>Loading crypto prices...</p>;

  return (
    <div className="crypto-prices">
      <h2>Crypto Prices</h2>
      <p>BTC: ${prices.bitcoin.usd}</p>
      <p>ETH: ${prices.ethereum.usd}</p>
    </div>
  );
}







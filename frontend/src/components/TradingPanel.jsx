// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState } from 'react';
import { executeTrade } from '../services/trading';

const TradingPanel = () => {
  const [coin, setCoin] = useState('BTC');
  const [amount, setAmount] = useState(0);

  const handleTrade = async (type) => {
    await executeTrade(type, coin, amount);
    alert(` ${type} order placed for ${amount} ${coin}`);
  };

  return (
    <div className="absolute top-20 right-4 bg-black bg-opacity-80 p-3 text-yellow-300 rounded-md z-30 w-72">
      <h3 className="font-bold mb-2"> Trading Panel</h3>
      <select
        value={coin}
        onChange={(e) => setCoin(e.target.value)}
        className="w-full mb-2 text-black p-1 rounded"
      >
        <option>BTC</option>
        <option>ETH</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-2 p-1 rounded text-black"
      />
      <div className="flex justify-between">
        <button
          onClick={() => handleTrade('BUY')}
          className="bg-green-600 px-2 py-1 rounded hover:bg-green-800"
        >
          BUY
        </button>
        <button
          onClick={() => handleTrade('SELL')}
          className="bg-red-600 px-2 py-1 rounded hover:bg-red-800"
        >
          SELL
        </button>
      </div>
    </div>
  );
};

export default TradingPanel;







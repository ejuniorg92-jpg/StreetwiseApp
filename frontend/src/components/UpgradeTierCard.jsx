// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState } from 'react';
import { Api } from '../services/api';

export default function UpgradeTierCard() {
  const [result, setResult] = useState(null);

  async function upgrade() {
    const data = await Api.upgradeTier();
    setResult(data);
  }

  return (
    <div className="p-4 bg-red-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Tier Upgrade</h2>
      <button onClick={upgrade} className="px-4 py-2 bg-red-600 rounded">
        Upgrade Tier
      </button>
      {result && (
        <p className="mt-2">
          {result.success ? 'Tier upgraded!' : 'Upgrade failed'}
        </p>
      )}
    </div>
  );
}







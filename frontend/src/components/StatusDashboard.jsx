// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState, useEffect } from 'react';

export default function StatusDashboard() {
  const [status, setStatus] = useState({});

  useEffect(() => {
    async function checkStatus() {
      const endpoints = [
        'ping',
        'getDailyMission',
        'aiRespondSecure',
        'getCryptoPrices',
        'getZones',
        'upgradeTier',
      ];
      const results = {};
      for (const ep of endpoints) {
        try {
          const res = await fetch(
            `http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/${ep}`
          );
          results[ep] = res.ok ? ' OK' : ' FAIL';
        } catch {
          results[ep] = ' FAIL';
        }
      }
      setStatus(results);
    }
    checkStatus();
  }, []);

  return (
    <div className="p-4 bg-gray-700 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">System Status</h2>
      <ul>
        {Object.entries(status).map(([k, v]) => (
          <li key={k}>
            {k}: {v}
          </li>
        ))}
      </ul>
    </div>
  );
}







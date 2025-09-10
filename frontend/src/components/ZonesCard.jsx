// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState } from 'react';
import { Api } from '../services/api';

export default function ZonesCard() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadZones() {
    setLoading(true);
    const data = await Api.getZones();
    setZones(data.zones || []);
    setLoading(false);
  }

  return (
    <div className="p-4 bg-green-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Street Zones</h2>
      <button onClick={loadZones} className="px-4 py-2 bg-green-600 rounded">
        Refresh Zones
      </button>
      {loading && <p>Loading zones...</p>}
      {zones.length > 0 && (
        <ul className="mt-2 list-disc list-inside">
          {zones.map((z, i) => (
            <li key={i}>{z}</li>
          ))}
        </ul>
      )}
    </div>
  );
}







// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState } from 'react';

export default function MissionLog() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMission = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/getDailyMission'
      );
      const json = await res.json();
      if (json.ok) {
        const newMission = {
          task: json.mission,
          ts: json.ts,
        };
        setMissions((prev) => [newMission, ...prev]);
      }
    } catch (err) {
      console.error('Mission load failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Mission Log</h2>
      <button
        onClick={fetchMission}
        disabled={loading}
        className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Get New Mission'}
      </button>

      <div className="mt-4 space-y-3">
        {missions.length === 0 && (
          <p className="text-gray-400">No missions yet. Hustle starts now!</p>
        )}
        {missions.map((m, idx) => (
          <div
            key={idx}
            className="p-3 bg-gray-800 rounded border border-green-700"
          >
            <h3 className="text-green-300 font-semibold">{m.task}</h3>
            <p className="text-xs text-gray-400">{m.ts}</p>
          </div>
        ))}
      </div>
    </div>
  );
}







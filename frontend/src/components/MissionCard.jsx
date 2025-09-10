import React, { useEffect, useState } from 'react';
import { Api } from '../services/api';

export default function MissionCard() {
  const [mission, setMission] = useState(null);

  useEffect(() => {
    Api.getDailyMission().then(setMission);
  }, []);

  if (!mission) return <div className="p-4">Loading mission...</div>;

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Daily Mission</h2>
      <p>{mission.mission || 'No mission available'}</p>
      <span className="text-sm opacity-70">
        Updated: {mission.ts || 'unknown'}
      </span>
    </div>
  );
}




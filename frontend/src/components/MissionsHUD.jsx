// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useState } from 'react';
import { getMissions } from '../services/missions';

const MissionsHUD = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getMissions();
      setMissions(data);
    };
    load();
  }, []);

  return (
    <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-green-400 p-3 rounded-md z-30 w-64">
      <h3 className="font-bold mb-2"> Missions</h3>
      <ul>
        {missions.map((m) => (
          <li key={m.id} className="mb-1">
            - {m.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionsHUD;







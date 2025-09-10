// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useState } from 'react';
import { getZones } from '../services/zones';
import { getIncidents } from '../services/incidents';
import { getMissions } from '../services/missions';

const MapFeed = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const load = async () => {
      const zones = await getZones();
      const incidents = await getIncidents();
      const missions = await getMissions();

      const zoneEvents = zones.map((z) => ` Zone unlocked: ${z.name}`);
      const incidentEvents = incidents.map(
        (i) => ` Incident: ${i.description}`
      );
      const missionEvents = missions.map((m) => ` Mission: ${m.title}`);

      const aiEvents = [
        ' Godmode tip: Stay alert, crypto spike detected.',
        ' Hustler grind pays off in downtown core.',
      ];

      setEvents([
        ...zoneEvents,
        ...incidentEvents,
        ...missionEvents,
        ...aiEvents,
      ]);
    };
    load();
  }, []);

  return (
    <div className="w-72 bg-black bg-opacity-70 text-green-400 p-4 overflow-y-auto z-20">
      <h2 className="font-bold text-lg mb-2">Street Feed</h2>
      <ul>
        {events.map((e, idx) => (
          <li key={idx} className="mb-2">
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapFeed;







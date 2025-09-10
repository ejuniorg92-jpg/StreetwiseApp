// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState } from 'react';

import MissionCard from './MissionCard';
import AuthCard from './AuthCard';
import StorageCard from './StorageCard';
import CryptoCard from './CryptoCard';
import ZonesCard from './ZonesCard';
import UpgradeTierCard from './UpgradeTierCard';
import StatusDashboard from './StatusDashboard';
import AvatarCard from './AvatarCard';
import MapTab from './MapTab';

const tabs = [
  { id: 'missions', label: 'Missions', component: <MissionCard /> },
  { id: 'auth', label: 'Auth', component: <AuthCard /> },
  { id: 'storage', label: 'Storage', component: <StorageCard /> },
  { id: 'crypto', label: 'Crypto', component: <CryptoCard /> },
  { id: 'zones', label: 'Zones', component: <ZonesCard /> },
  { id: 'upgrade', label: 'Upgrade', component: <UpgradeTierCard /> },
  { id: 'status', label: 'Status', component: <StatusDashboard /> },
  { id: 'avatar', label: 'Avatar', component: <AvatarCard /> },
  { id: 'map', label: 'Map', component: <MapTab /> },
];

export default function DashboardTabs() {
  const [active, setActive] = useState(tabs[0].id);

  const current = tabs.find((t) => t.id === active);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex gap-2 mb-4 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-3 py-2 rounded ${
              active === t.id ? 'bg-green-600' : 'bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{current.component}</div>
    </div>
  );
}







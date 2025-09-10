import React from 'react';
import MapTab from './MapTab';
import MissionsTab from './MissionsTab';
import ProfileTab from './ProfileTab';
import LawTab from './LawTab';
import AIProbeTab from './AIProbeTab';
import TierTab from './TierTab';

export default function Tabs() {
  return (
    <div className="tabs">
      <MapTab />
      <MissionsTab />
      <ProfileTab />
      <LawTab />
      <AIProbeTab />
      <TierTab />
    </div>
  );
}




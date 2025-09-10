// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React from 'react';
import StreetwiseScreen from './StreetwiseScreen';
import HustlerScreen from './HustlerScreen';
import GodmodeScreen from './GodmodeScreen';

export default function TierTab() {
  return (
    <div className="space-y-4">
      <StreetwiseScreen />
      <HustlerScreen />
      <GodmodeScreen />
    </div>
  );
}







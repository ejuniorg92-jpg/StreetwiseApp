// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React from 'react';

export default function ExpHUD() {
  return (
    <div className="absolute top-4 left-4 z-20 p-2 bg-black bg-opacity-50 rounded-xl shadow-lg">
      <div className="text-sm">
        EXP: <span className="text-green-400 font-bold">1412</span>
      </div>
      <div className="text-xs mt-1 text-gray-400">Tier: Hustler</div>
    </div>
  );
}







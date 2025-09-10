// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React from 'react';

const SpaceTips = () => {
  const tips = [
    'Stay consistent. Grind daily.',
    'Every mission completed is XP earned.',
    'Free tier is training. Hustler is rising. Godmode is destiny.',
  ];

  return (
    <div className="absolute bottom-8 right-8 bg-white/10 text-white p-4 rounded-lg shadow-lg max-w-xs backdrop-blur-sm">
      <h3 className="font-bold mb-2 text-yellow-300">$TREET TIP</h3>
      <p>{tips[Math.floor(Math.random() * tips.length)]}</p>
    </div>
  );
};

export default SpaceTips;







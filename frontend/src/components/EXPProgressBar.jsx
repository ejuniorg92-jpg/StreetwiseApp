// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React from 'react';

const EXPProgressBar = ({ level = 1, exp = 0, nextLevel = 100 }) => {
  const percent = Math.min((exp / nextLevel) * 100, 100);
  return (
    <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-white/20">
      <div
        className="bg-yellow-400 h-4 transition-all duration-500 ease-out"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default EXPProgressBar;







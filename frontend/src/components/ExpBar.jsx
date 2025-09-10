import React from 'react';

export default function ExpBar({ exp }) {
  const level = Math.floor(exp / 100);
  const progress = exp % 100;
  return (
    <div className="exp-bar">
      <div className="exp-progress" style={{ width: `${progress}%` }}></div>
      <span>Level {level}</span>
    </div>
  );
}




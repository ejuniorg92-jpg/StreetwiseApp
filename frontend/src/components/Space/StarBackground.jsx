import React from 'react';

export default function StarBackground() {
  const stars = Array.from({ length: 150 }, (_, i) => (
    <div
      key={i}
      className="absolute rounded-full bg-white opacity-50 animate-pulse"
      style={{
        top: ${Math.random() * 100}%,
        left: ${Math.random() * 100}%,
        width: ${Math.random() * 3 + 1}px,
        height: ${Math.random() * 3 + 1}px,
      }}
    />
  ));

  return <div className="absolute w-full h-full z-0">{stars}</div>;
}





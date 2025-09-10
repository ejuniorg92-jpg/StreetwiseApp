// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useState } from 'react';

export default function ParticleDollarRain() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 24 + 12,
        duration: Math.random() * 4 + 3,
      };
      setParticles(prev => [...prev.slice(-90), newParticle]);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute text-green-400 animate-float-down"
          style={{
            left: ${p.left}%,
            fontSize: ${p.size}px,
            animationDuration: ${p.duration}s,
            top: '-10%'
          }}
        >
          $
        </div>
      ))}
    </div>
  );
}








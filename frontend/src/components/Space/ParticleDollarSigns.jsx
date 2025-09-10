// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useState } from 'react';

const ParticleDollarSigns = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const spawn = () => {
      setParticles((p) => [
        ...p,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight,
        },
      ]);
    };
    const interval = setInterval(spawn, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animate = setInterval(() => {
      setParticles((p) =>
        p.map((pt) => ({ ...pt, y: pt.y - 2 })).filter((pt) => pt.y > -50)
      );
    }, 50);
    return () => clearInterval(animate);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {particles.map((pt) => (
        <div
          key={pt.id}
          style={{ left: pt.x, top: pt.y }}
          className="absolute text-green-400 font-bold"
        >
          $
        </div>
      ))}
    </div>
  );
};

export default ParticleDollarSigns;







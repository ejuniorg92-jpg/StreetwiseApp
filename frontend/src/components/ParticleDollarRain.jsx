// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React from 'react';
import './animations.css';

const ParticleDollarRain = () => {
  const particles = Array.from({ length: 40 }, (_, i) => (
    <div key={i} className="floating-dollar">
      $
    </div>
  ));

  return (
    <div className="absolute w-full h-full z-10 pointer-events-none">
      {particles}
    </div>
  );
};

export default ParticleDollarRain;







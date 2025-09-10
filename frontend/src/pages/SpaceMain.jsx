// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React from 'react';
import StarBackground from './StarBackground';
import ParticleDollarRain from './ParticleDollarRain';
import ExpHUD from './ExpHUD';

export default function SpaceMain() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      <StarBackground />
      <ParticleDollarRain />
      <ExpHUD />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-5xl font-bold drop-shadow-xl"></h1>
        <p className="text-xl mt-2">Lets get back to the grind</p>
      </div>
    </div>
  );
}







import React from 'react';
import './space.css';

const SpaceTierSelector = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div className="space-bg z-0"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-xl">
          Welcome to $TREETWI$E
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Choose your tier to begin your journey.
        </p>
        <div className="flex gap-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl">
            Streetwise
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl">
            Hustler
          </button>
          <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl">
            Godmode
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceTierSelector;




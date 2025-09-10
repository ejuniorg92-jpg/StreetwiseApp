// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React from 'react';
import { triggerPanic } from '../services/panic';

const PanicButton = () => {
  const handleClick = async () => {
    await triggerPanic();
    alert(' Panic triggered  system will respond.');
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-4 right-4 z-30 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-800"
    >
      Panic
    </button>
  );
};

export default PanicButton;







import { useEffect, useState } from 'react';
import GalaxyBackground from './components/GalaxyBackground';
import MapTab from './components/MapTab';

export default function App() {
  const [mapMode, setMapMode] = useState('map');

  useEffect(() => {
    const eye = document.getElementById('eye');
    const pupil = document.getElementById('pupil');

    function handleMouseMove(e) {
      if (!eye || !pupil) return;
      const rect = eye.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const max = 10;
      const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), max);
      const ratio = dist / Math.sqrt(dx ** 2 + dy ** 2 || 1);
      pupil.style.transform = `translate(${dx * ratio}px,${dy * ratio}px)`;
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <GalaxyBackground />

      {/* Centerpiece */}
      <div className="absolute top-1/3 flex flex-col items-center z-10">
        <div id="logo" className="relative">
          <h1 className="text-8xl font-extrabold neon-text">STREETWISE</h1>
          <div
            id="eye"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div id="pupil"></div>
          </div>
        </div>
        <p className="mt-6 text-lg text-green-300 tracking-wide">
          Select your tier and step into the grind.
        </p>
      </div>

      {/* Map */}
      <div className="absolute bottom-12 w-[600px] max-w-full h-[300px] bg-black/50 border border-green-500 rounded-lg z-10 overflow-hidden">
        <MapTab mode={mapMode} />
      </div>
    </div>
  );
}




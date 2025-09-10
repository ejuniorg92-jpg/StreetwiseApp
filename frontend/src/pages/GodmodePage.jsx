import React, { useEffect, useRef } from 'react';

export default function GodmodePage() {
  const eyeRef = useRef(null);

  useEffect(() => {
    function handleMove(e) {
      const eye = eyeRef.current;
      if (!eye) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      eye.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="tier-page">
      <h1> Godmode</h1>
      <div ref={eyeRef} className="eye-big"></div>
      <p>The All-Seeing Companion is watching.</p>
    </div>
  );
}




import React, { useEffect, useRef } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawGalaxy() {
      ctx.fillStyle = 'rgba(10,15,28,1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.fillStyle = 'white';
      for (let i = 0; i < 200; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 1.5,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }

      // Nebula glow
      for (let i = 0; i < 5; i++) {
        let g = ctx.createRadialGradient(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          0,
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          150
        );
        g.addColorStop(0, 'rgba(57,255,20,0.2)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    drawGalaxy();
    const interval = setInterval(drawGalaxy, 8000);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}




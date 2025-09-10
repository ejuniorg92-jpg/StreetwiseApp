// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h;
    let stars = [];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * w,
      }));
    }

    function animate() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'white';
      for (let star of stars) {
        star.z -= 2;
        if (star.z <= 0) star.z = w;
        const k = 128.0 / star.z;
        const px = star.x * k + w / 2;
        const py = star.y * k + h / 2;
        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          const size = (1 - star.z / w) * 3;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
}







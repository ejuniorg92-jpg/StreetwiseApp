import React, { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2,
    }));

    const dollars = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 16 + 12,
      speed: Math.random() * 0.3 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Galaxy gradient
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width / 5,
        width / 2,
        height / 2,
        width
      );
      gradient.addColorStop(0, '#000010');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Stars
      ctx.fillStyle = 'white';
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > height) star.y = 0;
      });

      // Floating $
      ctx.fillStyle = '#00ff66';
      ctx.font = 'bold 16px monospace';
      dollars.forEach((d) => {
        ctx.font = `bold ${d.size}px monospace`;
        ctx.fillText('$', d.x, d.y);
        d.y += d.speed;
        if (d.y > height) d.y = 0;
      });

      requestAnimationFrame(draw);
    }
    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}




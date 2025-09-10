// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useState } from 'react';

const symbols = ['', '', '', '']; // Streetwise vibes

export default function FloatingSymbols() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.2 + Math.random() * 0.5,
    }));
    setItems(arr);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) =>
        prev.map((it) => ({
          ...it,
          y: (it.y + it.speed) % 100,
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {items.map((it) => (
        <div
          key={it.id}
          className="absolute text-green-400 text-3xl opacity-60"
          style={{ left: `${it.x}%`, top: `${it.y}%` }}
        >
          {it.symbol}
        </div>
      ))}
    </div>
  );
}







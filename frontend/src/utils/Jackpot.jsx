// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState, useEffect } from 'react';

export default function Jackpot({ gained, tier }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show jackpot animation only if user hit max EXP for their tier
    if (
      (tier === 'streetwise' && gained === 15) ||
      (tier === 'hustler' && gained === 40) ||
      (tier === 'godmode' && gained === 100)
    ) {
      setShow(true);
      setTimeout(() => setShow(false), 5000); // Auto-hide after 5s
    }
  }, [gained, tier]);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.8)',
        zIndex: 9999,
        animation: 'flash 1s infinite',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: 'gold',
          fontSize: '3rem',
          fontFamily: "'Arial Black', sans-serif",
          textShadow: '0 0 20px #FFD700, 0 0 40px #FF0000',
        }}
      >
        <p> JACKPOT RESPECT </p>
        <p>+{gained} EXP</p>
      </div>
      <style>{`
        @keyframes flash {
          0% { background: rgba(0,0,0,0.8); }
          50% { background: rgba(255,215,0,0.4); }
          100% { background: rgba(0,0,0,0.8); }
        }
      `}</style>
    </div>
  );
}







// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useState } from 'react';

export default function Success() {
  const [tier, setTier] = useState('...');

  useEffect(() => {
    async function fetchTier() {
      const res = await fetch(
        'http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/getTier',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: 'guest' }),
        }
      );
      const data = await res.json();
      setTier(data.tier || 'streetwise');
    }
    fetchTier();
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        background:
          "url('https://images.unsplash.com/photo-1611892440504-42a792e24d6c?q=80&w=1200') no-repeat center center fixed",
        backgroundSize: 'cover',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFD700',
        textShadow: '0 0 8px #FFD700',
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <h1 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: '3rem' }}>
        {' '}
        Upgrade Complete{' '}
      </h1>
      <h2>Welcome to {tier.toUpperCase()} Tier</h2>
      <p>Your grind just leveled up from your Dubai penthouse.</p>
      <a
        href="/"
        style={{
          marginTop: '30px',
          color: '#00FF00',
          textDecoration: 'none',
          fontSize: '1.2rem',
        }}
      >
        Return to App
      </a>
    </div>
  );
}







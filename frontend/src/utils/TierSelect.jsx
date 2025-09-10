// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React from 'react';

export default function TierSelect({ setTier }) {
  const tiers = [
    {
      name: 'streetwise',
      color: '#ccc',
      desc: 'Free tier. Daily grind with limits.',
    },
    {
      name: 'hustler',
      color: 'gold',
      desc: 'Level up with daily missions + expanded AI.',
    },
    {
      name: 'godmode',
      color: 'gold',
      bg: 'black',
      desc: 'Immortalized edition. Unlimited everything.',
    },
  ];

  async function chooseTier(tier) {
    await fetch(
      'http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/setTier',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: 'guest', tier }),
      }
    );
    setTier(tier);
  }

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ marginBottom: '40px', textShadow: '0 0 8px gold' }}>
        ENTER THE STREETS
      </h1>
      <div style={{ display: 'flex', gap: '30px' }}>
        {tiers.map((tier) => (
          <div
            key={tier.name}
            onClick={() => chooseTier(tier.name)}
            style={{
              padding: '30px',
              borderRadius: '12px',
              cursor: 'pointer',
              backgroundColor: tier.bg || '#111',
              border: `2px solid ${tier.color}`,
              color: tier.color,
              textAlign: 'center',
              width: '200px',
              boxShadow: `0 0 10px ${tier.color}`,
            }}
          >
            <h2 style={{ marginBottom: '10px' }}>{tier.name.toUpperCase()}</h2>
            <p>{tier.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}







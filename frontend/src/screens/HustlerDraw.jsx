// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState } from 'react';

export default function HustlerDraw() {
  const [result, setResult] = useState(null);

  const runDraw = async () => {
    const res = await fetch(
      'http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/runHustlerDraw'
    );
    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ color: '#FFD700', textAlign: 'center', padding: '50px' }}>
      <h1> Top Hustler Draw </h1>
      <button
        onClick={runDraw}
        style={{
          background: 'black',
          color: '#FFD700',
          border: '2px solid #00FF00',
          padding: '10px 20px',
          borderRadius: '10px',
          fontSize: '1.5rem',
        }}
      >
        Run Draw
      </button>
      {result && (
        <div
          style={{
            marginTop: '30px',
            fontSize: '1.5rem',
            textShadow: '0 0 10px #FFD700',
          }}
        >
          <p>Winner: {result.winner}</p>
          <p>Reward: {result.reward}</p>
          <p>Total Tickets: {result.tickets}</p>
        </div>
      )}
    </div>
  );
}







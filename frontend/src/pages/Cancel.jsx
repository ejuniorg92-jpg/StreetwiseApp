// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React from 'react';

export default function Cancel() {
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
        color: '#FF3333',
        textShadow: '0 0 8px #FF3333',
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <h1 style={{ fontFamily: "'Arial Black', sans-serif", fontSize: '3rem' }}>
        {' '}
        Payment Cancelled
      </h1>
      <p>
        You're still in Streetwise mode. Keep grinding from your penthouse view.
      </p>
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







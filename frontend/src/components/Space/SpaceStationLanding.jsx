import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function SpaceStationLanding() {
  const nav = useNavigate();
  return (
    <div
      className="center"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <svg
        width="1400"
        height="1400"
        viewBox="0 0 1400 1400"
        style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.15,
          filter: 'blur(1px)',
        }}
      >
        <defs>
          <radialGradient id="earthGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopOpacity="0.9" stopColor="#2ad6ff" />
            <stop offset="60%" stopOpacity="0.3" stopColor="#0b4070" />
            <stop offset="100%" stopOpacity="0" stopColor="#001a33" />
          </radialGradient>
        </defs>
        <circle cx="700" cy="700" r="420" fill="url(#earthGrad)" />
      </svg>
      <div
        className="card"
        style={{ width: 520, textAlign: 'center', zIndex: 1 }}
      >
        <div className="space-hud brand" style={{ marginBottom: 8 }}>
          STREETWISE // COMMAND CONSOLE
        </div>
        <h1 className="brand" style={{ margin: '10px 0 4px 0' }}>
          Select Your Tier
        </h1>
        <p style={{ marginTop: 0, color: '#9fb3c8' }}>
          Docked at Orbital Station. Systems nominal. Choose your path.
        </p>
        <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
          <button onClick={() => nav('/dashboard')}>Streetwise (Free)</button>
          <button onClick={() => nav('/dashboard')}>Hustler</button>
          <button onClick={() => nav('/map')}>Godmode Map</button>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          width: '100%',
          textAlign: 'center',
          opacity: 0.7,
        }}
      >
        <span className="space-hud">NULLFIRE Yama v0.3</span>
      </div>
    </div>
  );
}




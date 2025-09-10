import { useNavigate } from 'react-router-dom';
import { useTier } from '../context/TierContext';

export default function SpaceStationLanding() {
  const navigate = useNavigate();
  const { setTier } = useTier();

  const launch = (t) => {
    setTier(t);
    navigate('/map');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      <h1 style={{ fontSize: '32px', fontWeight: 800 }}>
        Streetwise Orbital Station
      </h1>
      <p style={{ opacity: 0.8 }}>
        Select tier unique overlays on the live map.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => launch('streetwise')}
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            background: 'rgba(0,255,136,0.12)',
            border: '1px solid rgba(0,255,136,0.35)',
          }}
        >
          Streetwise
        </button>
        <button
          onClick={() => launch('hustler')}
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            background: 'rgba(0,168,255,0.12)',
            border: '1px solid rgba(0,168,255,0.35)',
          }}
        >
          Hustler
        </button>
        <button
          onClick={() => launch('godmode')}
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            background: 'rgba(255,215,0,0.12)',
            border: '1px solid rgba(255,215,0,0.35)',
          }}
        >
          Godmode
        </button>
      </div>
    </div>
  );
}




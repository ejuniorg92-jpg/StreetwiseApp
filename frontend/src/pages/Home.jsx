// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0b0f',
        color: '#fff',
        padding: '32px',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '44px', marginBottom: '12px' }}>Streetwise</h1>
      <p style={{ opacity: 0.8, marginBottom: '28px' }}>
        Live city intel, tiers, and the heatmap preview.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Link
          to="/map"
          style={{
            padding: '12px 18px',
            borderRadius: '14px',
            background: '#ffffff14',
            color: '#fff',
            textDecoration: 'none',
            backdropFilter: 'blur(6px)',
          }}
        >
          {' '}
          Launch Live Map
        </Link>

        <a
          href="https://console.firebase.google.com/"
          target="_blank"
          style={{
            padding: '12px 18px',
            borderRadius: '14px',
            background: '#ffffff0e',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Firebase Console
        </a>
      </div>

      <div style={{ marginTop: '24px', fontSize: '13px', opacity: 0.7 }}>
        Tip: seed points via Functions emulator <code>/generateHeatPoints</code>
      </div>
    </div>
  );
}







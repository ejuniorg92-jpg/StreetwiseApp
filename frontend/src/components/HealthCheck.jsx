// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useState } from 'react';

function HealthCheck() {
  const [status, setStatus] = useState('checking...');

  const check = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5011/ping');
      if (res.ok) {
        setStatus('online');
      } else {
        setStatus('offline');
      }
    } catch (e) {
      setStatus('offline');
    }
  };

  useEffect(() => {
    check();
    const interval = setInterval(check, 10000); // every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        padding: '8px 15px',
        borderRadius: '10px',
        background: status === 'online' ? 'limegreen' : 'crimson',
        color: '#111',
        fontWeight: 'bold',
        boxShadow: '0 0 10px #000',
      }}
    >
      {status === 'online' ? ' Emulator Connected' : ' Emulator Offline'}
    </div>
  );
}

export default check;







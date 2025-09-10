// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useState } from 'react';
import { fetchDailyMission, askSecureAI } from '../services/api';

export default function Dashboard() {
  const [mission, setMission] = useState(null);
  const [status, setStatus] = useState('Loading mission');
  const [aiOut, setAiOut] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchDailyMission();
        if (!alive) return;
        setMission(data);
        setStatus('Mission loaded.');
      } catch (e) {
        setStatus('Failed to load mission. Is the Functions emulator running?');
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const handleAI = async () => {
    setAiOut('Thinking');
    try {
      const res = await askSecureAI('Ping from Streetwise Dashboard');
      setAiOut(typeof res === 'string' ? res : JSON.stringify(res));
    } catch (e) {
      setAiOut(
        'AI call failed. Ensure callable emulator is up and function deployed.'
      );
    }
  };

  return (
    <div className="container">
      <h2 className="glow">Dashboard</h2>
      <div className="card" style={{ marginTop: 12 }}>
        <div>
          <b>Status:</b> {status}
        </div>
        {mission && (
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(mission, null, 2)}
          </pre>
        )}
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={handleAI}>Test AI (aiRespondSecure)</button>
          <span className="space-hud">Uses callable via emulator</span>
        </div>
        {aiOut && (
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: 10 }}>{aiOut}</pre>
        )}
      </div>
    </div>
  );
}







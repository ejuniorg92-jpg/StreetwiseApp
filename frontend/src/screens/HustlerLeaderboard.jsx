import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export default function HustlerLeaderboard() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    async function fetchWinners() {
      try {
        const q = query(
          collection(db, 'drawWinners'),
          orderBy('timestamp', 'desc'),
          limit(10) // last 10 draws
        );
        const snap = await getDocs(q);
        setWinners(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error('Failed to fetch winners:', err);
      }
    }
    fetchWinners();
  }, []);

  return (
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#FFD700',
        padding: '20px',
        borderRadius: '10px',
        margin: '20px',
        boxShadow: '0 0 20px #FFD700',
        textAlign: 'center',
      }}
    >
      <h2 style={{ textShadow: '0 0 10px gold' }}> Hustler Leaderboard</h2>
      {winners.length === 0 ? (
        <p>No draws yet... keep hustling </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {winners.map((w, i) => (
            <li
              key={w.id}
              style={{
                margin: '10px 0',
                padding: '10px',
                background: 'rgba(255,215,0,0.1)',
                border: '1px solid #FFD700',
                borderRadius: '8px',
              }}
            >
              <strong>
                {i + 1}. {w.winnerId}
              </strong>
              <br />
              Reward: {w.reward}
              <br />
              Tickets: {w.ticketPool}
              <br />
              {new Date(w.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}




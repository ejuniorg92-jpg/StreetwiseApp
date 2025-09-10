// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('exp', 'desc'), limit(10));
    const unsub = onSnapshot(q, (snapshot) => {
      setLeaders(
        snapshot.docs.map((doc, i) => ({ id: doc.id, ...doc.data() }))
      );
    });
    return () => unsub();
  }, []);

  return (
    <div
      style={{
        color: 'white',
        backgroundColor: 'black',
        height: '100vh',
        padding: '20px',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          color: '#FFD700',
          textShadow: '0 0 12px #FFD700',
        }}
      >
        Respect Leaderboard (Live)
      </h1>
      <table
        style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr style={{ color: '#00FF00' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Rank</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>User</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Tier</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>EXP</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((user, i) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '10px' }}>{i + 1}</td>
              <td style={{ padding: '10px' }}>{user.id}</td>
              <td style={{ padding: '10px' }}>{user.tier?.toUpperCase()}</td>
              <td style={{ padding: '10px' }}>{user.exp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}







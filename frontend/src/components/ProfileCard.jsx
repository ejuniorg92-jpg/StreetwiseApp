import React from 'react';

export default function ProfileCard({ user }) {
  if (!user) return null;
  return (
    <div className="profile-card">
      <h2>
        {user.username} ({user.tier})
      </h2>
      <p>EXP: {user.exp}</p>
      <p>Badges: {user.badges?.join(', ') || 'None'}</p>
    </div>
  );
}




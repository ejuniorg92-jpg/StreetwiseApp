// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React, { useState } from 'react';

const skins = [
  { id: 'reptilian_pack', label: 'Reptilian', emoji: '' },
  { id: 'chain', label: 'Chain', emoji: '' },
  { id: 'crown', label: 'Crown', emoji: '' },
  { id: 'ghost', label: 'Ghost', emoji: '' },
];

export default function AvatarCard() {
  const [skin, setSkin] = useState(skins[0]);

  return (
    <div className="p-4 bg-indigo-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Choose Avatar</h2>
      <div className="flex gap-2 mb-4">
        {skins.map((s) => (
          <button
            key={s.id}
            onClick={() => setSkin(s)}
            className={`px-3 py-2 rounded ${
              skin.id === s.id ? 'bg-green-600' : 'bg-gray-700'
            }`}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>
      <p className="text-lg">
        Active: <span className="font-bold">{skin.label}</span>
      </p>
    </div>
  );
}







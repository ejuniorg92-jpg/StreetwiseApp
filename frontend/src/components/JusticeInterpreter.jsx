import React, { useState } from 'react';
import { logPoliceEncounter } from '../services/justice';

const JusticeInterpreter = () => {
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    const res = await logPoliceEncounter({ note });
    if (res.ok) {
      setStatus(' Encounter logged safely');
      setNote('');
    } else {
      setStatus(' Error logging encounter');
    }
  };

  return (
    <div className="absolute bottom-20 right-4 bg-black bg-opacity-80 p-3 text-red-400 rounded-md z-30 w-72">
      <h3 className="font-bold mb-2"> Justice Interpreter</h3>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Describe the encounter..."
        className="w-full p-2 rounded-md text-black"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-red-700 text-white px-3 py-1 rounded-md w-full hover:bg-red-900"
      >
        Log Encounter
      </button>
      {status && <div className="mt-2 text-xs">{status}</div>}
    </div>
  );
};

export default JusticeInterpreter;




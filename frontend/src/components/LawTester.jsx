import React, { useState } from 'react';

export default function LawTester() {
  const [city, setCity] = useState('');
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState(null);

  const callLawInfo = async () => {
    try {
      const res = await fetch(
        'http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/getLawInfo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer owner',
          },
          body: JSON.stringify({ data: { city, topic } }),
        }
      );
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-green-400">Law Tester</h2>
      <input
        className="p-2 bg-gray-800 rounded w-full"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        className="p-2 bg-gray-800 rounded w-full"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        onClick={callLawInfo}
        className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
      >
        Check Law
      </button>
      {result && (
        <pre className="bg-black p-2 rounded text-sm overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}




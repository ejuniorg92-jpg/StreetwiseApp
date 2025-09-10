// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
export async function aiRespond(prompt) {
  const res = await fetch(
    'http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/aiRespondSecure',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { prompt } }),
    }
  );
  return await res.json();
}







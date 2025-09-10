// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
const BASE = [
  "You can ask: 'Am I free to leave?' If yes, walk away calmly.",
  "You have the right to remain silent. You can say: 'I choose to remain silent.'",
  'Ask if you are being detained or arrested.',
  'You have the right to an attorney. Do not consent to searches.',
  'Record details after the encounter (names, badge numbers, time, place).',
];

export function getRights(city = 'your city', state = 'your state') {
  // Placeholder text; swap later for per-jurisdiction data source
  return {
    city,
    state,
    keyPoints: BASE,
    disclaimer: 'Informational only. Not legal advice.',
  };
}







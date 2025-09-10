const MESSAGES = [
  'Today rewards discipline. Keep the promise you made to yourself.',
  'Small consistent moves beat wild bursts. Stack your bricks.',
  'Protect your energy. Say no to anything that dulls your focus.',
  'A closed mouth doesnt get fed. Ask for what you need.',
  'Your edge today: finish the boring task first.',
];
const SIGNS = new Set([
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
]);
export function dailyHoroscope(sign) {
  const k = (sign || '').toLowerCase();
  const valid = SIGNS.has(k) ? k : 'aries';
  const dayIndex = Math.floor(Date.now() / 86400000) % MESSAGES.length;
  return { sign: valid, message: MESSAGES[dayIndex], index: dayIndex };
}




// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { db } from './firebase';
import { db } from './app.js';
import { DAILY_AI_SECONDS_CAP, TIER } from './constants.js';

export async function reserveAiSeconds(uid, tier, secondsRequested = 30) {
  const ref = db()
    .collection('users')
    .doc(uid)
    .collection('meta')
    .doc('progress');
  const snap = await ref.get();
  const data = snap.exists
    ? snap.data()
    : { aiSecondsUsedAt: null, aiSecondsUsed: 0 };
  const today = new Date().toISOString().slice(0, 10);
  const used = data.aiSecondsUsedAt === today ? data.aiSecondsUsed || 0 : 0;
  const cap =
    DAILY_AI_SECONDS_CAP[tier] ?? DAILY_AI_SECONDS_CAP[TIER.STREETWISE];
  if (Number.isFinite(cap) && used + secondsRequested > cap)
    return { allowed: false, used, remaining: Math.max(cap - used, 0), cap };
  const newUsed = used + secondsRequested;
  await ref.set(
    { aiSecondsUsedAt: today, aiSecondsUsed: newUsed, lastUpdated: new Date() },
    { merge: true }
  );
  return {
    allowed: true,
    used: newUsed,
    remaining: Number.isFinite(cap) ? cap - newUsed : null,
    cap,
  };
}
export async function addExactAiSeconds(uid, seconds) {
  const ref = db()
    .collection('users')
    .doc(uid)
    .collection('meta')
    .doc('progress');
  const snap = await ref.get();
  const data = snap.exists
    ? snap.data()
    : { aiSecondsUsedAt: null, aiSecondsUsed: 0 };
  const today = new Date().toISOString().slice(0, 10);
  const used = data.aiSecondsUsedAt === today ? data.aiSecondsUsed || 0 : 0;
  await ref.set(
    {
      aiSecondsUsedAt: today,
      aiSecondsUsed: used + seconds,
      lastUpdated: new Date(),
    },
    { merge: true }
  );
}







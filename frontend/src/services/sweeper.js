// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { db } from './firebase';
import { db } from './app.js';
import { buildAlert, fanoutAlert, annotateQueue } from './notify.js';

/**
 * Re-send unsent queue items with light backoff.
 * Policy:
 *  - status=="queued" AND sent!=true
 *  - nextTryAt <= now (calculated from attempts)
 *  - attempts capped at 6
 */
export async function sweepPanicQueue(limit = 20) {
  const now = Date.now();
  const snap = await db()
    .collection('panicQueue')
    .where('status', 'in', ['queued', null])
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  let retried = 0;
  for (const d of snap.docs) {
    const q = d.data() || {};
    if (q.sent === true) continue;

    const attempts = Number(q.attempts || 0);
    if (attempts >= 6) continue;

    const nextTryAt = Number(q.nextTryAt || 0);
    if (nextTryAt && nextTryAt > now) continue;

    // load panic event for details
    const refPath = q.ref || '';
    const pSnap = refPath
      ? await db()
          .doc(refPath)
          .get()
          .catch(() => null)
      : null;
    const p = pSnap?.exists ? pSnap.data() : {};

    const msg = buildAlert({
      id: d.id,
      uid: q.uid,
      level: q.level || p?.level || 2,
      text: p?.text || '',
      lat: p?.lat ?? null,
      lng: p?.lng ?? null,
      createdAt: p?.createdAt?.toMillis ? p.createdAt.toMillis() : Date.now(),
    });

    const outs = await fanoutAlert(msg);
    const ok = outs.some((o) => o.ok);

    const backoffMs = Math.min(15 * 60_000, 2 ** attempts * 30_000); // 30s, 60s, 120s,  cap 15m
    await annotateQueue(d.id, {
      attempts: attempts + 1,
      lastTriedAt: new Date(),
      nextTryAt: ok ? null : Date.now() + backoffMs,
      sent: ok,
      outputs: outs.slice(0, 5),
    });

    retried++;
  }
  return { retried };
}







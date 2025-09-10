// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { db } from "./app.js";
import { FieldValue } from "firebase-admin/firestore";

export async function rateLimit(uid, key, limit, windowSec) {
  const coll = db().collection("rateLimits").doc(`${uid}_${key}`).collection("events");
  const now = Date.now(), start = now - windowSec * 1000;

  const old = await coll.where("ts", "<", start).get();
  if (!old.empty) {
    const batch = db().batch();
    old.docs.forEach(d => batch.delete(d.ref));
    await batch.commit().catch(()=>{});
  }

  const recent = await coll.where("ts", ">=", start).get();
  if (recent.size >= limit) return { allowed: false, remaining: 0 };

  await coll.add({ ts: now, createdAt: FieldValue.serverTimestamp() });
  return { allowed: true, remaining: limit - (recent.size + 1) };
}


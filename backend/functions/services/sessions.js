import { getFirestore, FieldValue } from "firebase-admin/firestore";
const db = getFirestore();

export async function createAiSession(uid, metadata = {}) {
  const ref = db.collection("users").doc(uid).collection("aiSessions").doc();
  const now = FieldValue.serverTimestamp();
  const data = { startedAt: now, endedAt: null, seconds: null, ...metadata };
  await ref.set(data);
  return { id: ref.id };
}
export async function endAiSession(uid, sessionId) {
  const ref = db.collection("users").doc(uid).collection("aiSessions").doc(sessionId);
  const snap = await ref.get();
  if (!snap.exists) return { ok: false, reason: "not-found" };
  const doc = snap.data();
  if (doc.endedAt) return { ok: true, alreadyEnded: true, seconds: doc.seconds ?? 0 };
  const endTs = new Date(); // approximate; serverTimestamp write then read is extra roundtrip
  await ref.set({ endedAt: endTs }, { merge: true });
  // estimate seconds from client-provided startedAt? Keep simple: compute when we first read endedAt
  return { ok: true };
}

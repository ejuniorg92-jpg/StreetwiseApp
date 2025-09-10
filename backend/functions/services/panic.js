import { db } from "./app.js";
import { FieldValue } from "firebase-admin/firestore";
import { PANIC } from "./constants.js";

function hoursLocal(date=new Date()) { return date.getHours(); }
function atNight(hh) { return (hh >= 22 || hh <= 5); }

function keywordScore(text) {
  let s = 0;
  const t = (text||"").toLowerCase();
  if (PANIC.KEYWORDS_HIGH.some(k => t.includes(k))) s += PANIC.HIGH_BONUS;
  if (PANIC.KEYWORDS_MED.some(k => t.includes(k)))  s += PANIC.MED_BONUS;
  return s;
}

function distanceMeters(a, b) {
  if (!a || !b) return Infinity;
  const toRad = d => d * Math.PI/180;
  const R = 6371000;
  const dLat = toRad((b.lat - a.lat) || 0);
  const dLng = toRad((b.lng - a.lng) || 0);
  const lat1 = toRad(a.lat || 0), lat2 = toRad(b.lat || 0);
  const x = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(x)));
}

export async function createPanicEvent(uid, payload) {
  const { text, lat=null, lng=null, tags=[] } = payload || {};
  let score = PANIC.BASE;
  if (atNight(hoursLocal())) score += PANIC.NIGHT_HOUR_BONUS;
  score += keywordScore(text||"");

  const lastSnap = await db().collection("users").doc(uid).collection("panicEvents")
    .orderBy("createdAt","desc").limit(1).get();
  if (!lastSnap.empty) {
    const last = lastSnap.docs[0].data();
    const dist = distanceMeters({lat:last.lat, lng:last.lng}, {lat, lng});
    const withinHour = last.createdAt?.toMillis ? (Date.now() - last.createdAt.toMillis() < 3600_000) : false;
    if (withinHour && dist < PANIC.GEO_BONUS_METERS) score += 1;
  }

  const level = Math.max(1, Math.min(5, score));
  const doc = {
    text: (text||"").slice(0, 700),
    lat, lng, tags,
    level,
    status: "open",
    createdAt: FieldValue.serverTimestamp(),
    resolvedAt: null
  };

  const ref = await db().collection("users").doc(uid).collection("panicEvents").add(doc);
  await db().collection("panicQueue").doc(ref.id).set({ uid, ref: ref.path, level, createdAt: FieldValue.serverTimestamp(), status: "queued" });
  return { id: ref.id, level };
}

export async function resolvePanic(uid, id) {
  const ref = db().collection("users").doc(uid).collection("panicEvents").doc(id);
  await ref.set({ status: "resolved", resolvedAt: FieldValue.serverTimestamp() }, { merge: true });
  await db().collection("panicQueue").doc(id).set({ status: "resolved", resolvedAt: FieldValue.serverTimestamp() }, { merge: true });
  return { ok: true };
}

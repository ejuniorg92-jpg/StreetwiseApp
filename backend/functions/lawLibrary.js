// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { onCall } = require("firebase-functions/v2/https");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// Callable: fetch law info by city + topic
exports.getLawInfo = onCall({ region: "northamerica-northeast1" }, async (req) => {
  const uid = req.auth?.uid || "test-user";

  const city = req.data?.city;
  const topic = req.data?.topic;
  if (!city || !topic) {
    throw new functions.https.HttpsError("invalid-argument", "city and topic are required.");
  }

  const snap = await db.collection("laws")
    .where("city", "==", city)
    .where("topic", "==", topic)
    .limit(1)
    .get();

  if (snap.empty) {
    return { ok: false, message: `No law found for ${topic} in ${city}.` };
  }

  const law = snap.docs[0].data();
  return { ok: true, law };
});


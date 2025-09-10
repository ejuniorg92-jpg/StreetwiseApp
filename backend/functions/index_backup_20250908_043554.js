const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

// === STREETWISE Function: getLawInfo ===
exports.getLawInfo = onCall({ region: "northamerica-northeast1" }, async (req) => {
  const { city, topic } = req.data;
  if (!city || !topic) {
    return { ok: false, error: "Missing city or topic" };
  }

  const snap = await admin.firestore()
    .collection("laws")
    .where("city", "==", city)
    .where("topic", "==", topic)
    .limit(1)
    .get();

  if (snap.empty) {
    return { ok: false, error: "Law not found" };
  }

  const doc = snap.docs[0];
  const data = doc.data();

  return {
    ok: true,
    law: {
      id: doc.id,
      city: data.city,
      topic: data.topic,
      details: data.details,
    },
  };
});

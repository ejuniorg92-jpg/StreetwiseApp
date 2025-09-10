const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { onCall } = require("firebase-functions/v2/https");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// Callable function: panic button event
exports.panicButton = onCall({ region: "northamerica-northeast1" }, async (req) => {
  const uid = req.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError("unauthenticated", "User must be signed in.");
  }

  const eventRef = db.collection("panicEvents").doc();
  await eventRef.set({
    uid,
    triggeredAt: admin.firestore.FieldValue.serverTimestamp(),
    details: req.data?.details || "No details provided",
  });

  return { ok: true, message: "Panic event recorded. System actions triggered." };
});

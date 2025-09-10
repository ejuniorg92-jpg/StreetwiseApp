const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { onCall } = require("firebase-functions/v2/https");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// Callable function: starts AI interview & logs answers
exports.startInterview = onCall({ region: "northamerica-northeast1" }, async (req) => {
  const uid = req.auth?.uid;
  if (!uid) {
    throw new functions.https.HttpsError("unauthenticated", "User must be signed in.");
  }

  const { answers } = req.data;
  if (!answers || !Array.isArray(answers)) {
    throw new functions.https.HttpsError("invalid-argument", "Answers must be an array.");
  }

  const ref = db.collection("interviews").doc(uid);
  await ref.set({
    uid,
    answers,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { ok: true, message: "Interview logged successfully." };
});

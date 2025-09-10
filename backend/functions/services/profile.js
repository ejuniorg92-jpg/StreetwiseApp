// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
const admin = require("firebase-admin");
const db = admin.firestore();

// Create or update user profile
exports.setProfile = async (uid, data) => {
  await db.collection("profiles").doc(uid).set(data, { merge: true });
  return { success: true };
};

// Fetch profile
exports.getProfile = async (uid) => {
  const doc = await db.collection("profiles").doc(uid).get();
  return doc.exists ? doc.data() : null;
};


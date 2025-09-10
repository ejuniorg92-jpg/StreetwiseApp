const admin = require("firebase-admin");
const db = admin.firestore();

// Add EXP and return new total
exports.addExp = async (uid, amount) => {
  const ref = db.collection("profiles").doc(uid);
  await db.runTransaction(async (t) => {
    const snap = await t.get(ref);
    let exp = (snap.data()?.exp || 0) + amount;
    t.set(ref, { exp }, { merge: true });
  });
  return { success: true };
};

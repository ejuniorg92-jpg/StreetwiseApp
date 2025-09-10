// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { onCall } = require("firebase-functions/v2/https");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

async function logTrade(uid, symbol, amount, action) {
  const ref = db.collection("cryptoTrades").doc();
  await ref.set({
    uid,
    symbol,
    amount,
    action,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  return { ok: true, message: `${action} ${amount} ${symbol}`, tradeId: ref.id };
}

exports.buyCrypto = onCall({ region: "northamerica-northeast1" }, async (req) => {
  const uid = req.auth?.uid || "test-user";
  const { symbol, amount } = req.data || {};
  if (!symbol || !amount) {
    throw new functions.https.HttpsError("invalid-argument", "symbol and amount are required.");
  }
  return logTrade(uid, symbol, amount, "buy");
});

exports.sellCrypto = onCall({ region: "northamerica-northeast1" }, async (req) => {
  const uid = req.auth?.uid || "test-user";
  const { symbol, amount } = req.data || {};
  if (!symbol || !amount) {
    throw new functions.https.HttpsError("invalid-argument", "symbol and amount are required.");
  }
  return logTrade(uid, symbol, amount, "sell");
});


// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import Stripe from "stripe";
import crypto from "node:crypto";
import { db, auth } from "./app.js";
import { FieldValue } from "firebase-admin/firestore";

export const TIERS = {
  streetwise: { id: "streetwise", name: "Streetwise", price: 0 },
  hustler:    { id: "hustler",    name: "Hustler",    price: 999 },
  godmode:    { id: "godmode",    name: "Godmode",    price: 2999 }
};

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
export const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

const CB_API_KEY = process.env.COINBASE_API_KEY || "";
const CB_API_BASE = "https://api.commerce.coinbase.com";
const CB_WEBHOOK_SECRET = process.env.COINBASE_WEBHOOK_SHARED_SECRET || "";

export async function createCoinbaseChargeRest({ uid, toTier, name, description }) {
  if (!CB_API_KEY) throw new Error("Coinbase not configured");
  const body = {
    name, description, pricing_type: "fixed_price",
    local_price: { amount: (TIERS[toTier].price / 100).toFixed(2), currency: "USD" },
    metadata: { uid, toTier }
  };
  const resp = await fetch(`${CB_API_BASE}/charges`, {
    method: "POST",
    headers: { "X-CC-Api-Key": CB_API_KEY, "X-CC-Version": "2018-03-22", "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!resp.ok) throw new Error(`Coinbase create charge failed: ${resp.status}`);
  const json = await resp.json();
  const c = json?.data;
  return { id: c?.id, code: c?.code, hosted_url: c?.hosted_url };
}

export function verifyCoinbaseSignature(rawBody, signature) {
  if (!CB_WEBHOOK_SECRET) return false;
  try {
    const hmac = crypto.createHmac("sha256", CB_WEBHOOK_SECRET);
    hmac.update(rawBody, "utf8");
    const digest = hmac.digest("hex");
    const a = Buffer.from(signature || "", "utf8");
    const b = Buffer.from(digest, "utf8");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch { return false; }
}

export async function lightUpTierAndRecord({ uid, provider, providerEventId, fromTier, toTier, amount, currency="usd", rawEvent={} }) {
  const dedupeRef = db().collection("paymentEvents").doc(providerEventId);
  const exists = await dedupeRef.get();
  if (exists.exists) return { ok: true, idempotent: true };

  const userRef = db().collection("users").doc(uid);
  const purchaseRef = userRef.collection("purchases").doc();
  const now = FieldValue.serverTimestamp();

  await db().runTransaction(async (tx) => {
    tx.set(dedupeRef, { provider, createdAt: now, rawEvent });
    tx.set(purchaseRef, { provider, providerEventId, fromTier, toTier, amount, currency, createdAt: now });
    tx.set(userRef, { tier: toTier, updatedAt: now }, { merge: true });
  });

  return { ok: true, upgradedTo: toTier, purchaseId: purchaseRef.id };
}

export async function uidByEmail(email) {
  const user = await auth().getUserByEmail(email).catch(() => null);
  return user?.uid || null;
}


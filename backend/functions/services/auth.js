import { HttpsError } from "firebase-functions/v2/https";
import { db, auth } from "./app.js";

export function requireAuth(context) {
  // Emulator shortcut: use Authorization header as uid
  if (process.env.FUNCTIONS_EMULATOR === "true") {
    const raw = context.rawRequest?.headers["authorization"] || "";
    const parts = raw.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
      return parts[1]; // treat as uid
    }
    return "emu-test-user"; // fallback
  }

  // Production strict check
  if (!context.auth?.uid) throw new HttpsError("unauthenticated","You must be signed in.");
  return context.auth.uid;
}

export async function isAdmin(uid) {
  if (!uid) return false;
  try { const u = await auth().getUser(uid); if (u.customClaims?.admin === true) return true; } catch {}
  try { const doc = await db().collection("admins").doc(uid).get(); if (doc.exists) return true; } catch {}
  return false;
}

export async function requireAdmin(context) {
  const uid = requireAuth(context);
  if (!(await isAdmin(uid))) throw new HttpsError("permission-denied","Admin privileges required.");
  return uid;
}

import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth as _getAuth } from "firebase-admin/auth";

export function ensureApp() {
  if (getApps().length === 0) initializeApp();
}

export function db() {
  ensureApp();
  return getFirestore();
}

export function auth() {
  ensureApp();
  return _getAuth();
}

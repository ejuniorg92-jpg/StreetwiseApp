// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { getFirestore, FieldValue } from "firebase-admin/firestore";
const db = getFirestore();

export async function createLessonTemplateDoc(payload) {
  const ref = db.collection("lessonTemplates").doc();
  await ref.set({ ...payload, createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
  return { id: ref.id };
}

export async function assignLessonToUser(uid, templateId, dateKey) {
  const ref = db.collection("users").doc(uid).collection("lessonsAssigned").doc(`${dateKey}_${templateId}`);
  await ref.set({ templateId, dateKey, status: "assigned", createdAt: FieldValue.serverTimestamp(), completedAt: null }, { merge: true });
  return { id: ref.id };
}

export async function completeAssignedLesson(uid, id) {
  const ref = db.collection("users").doc(uid).collection("lessonsAssigned").doc(id);
  const snap = await ref.get();
  if (!snap.exists) return { ok: false, reason: "not-found" };
  if (snap.data().status === "completed") return { ok: true, already: true };
  await ref.update({ status: "completed", completedAt: FieldValue.serverTimestamp() });
  return { ok: true, already: false };
}


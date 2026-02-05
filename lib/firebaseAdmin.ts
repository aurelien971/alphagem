import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getServiceAccount() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing FIREBASE_* env vars (PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY)."
    );
  }

  return { projectId, clientEmail, privateKey };
}

function getAdminApp() {
  return getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(getServiceAccount()),
      });
}

// Export the db instance directly, not a function
export const adminDb = getFirestore(getAdminApp());

// Keep the function export for backwards compatibility if needed
export function getAdminDb() {
  return adminDb;
}
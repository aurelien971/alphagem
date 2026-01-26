import admin from "firebase-admin";
import { flattenToRecord } from "./flatten";
import { COPY, PAGES } from "./i18n-source";

function initAdmin() {
  if (admin.apps.length) return;
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

async function upsertStrings(db: admin.firestore.Firestore, path: string, strings: Record<string, string>) {
  await db.doc(path).set(
    {
      strings,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

async function main() {
  initAdmin();
  const db = admin.firestore();

  // pages
  for (const [collectionId, locales] of Object.entries(PAGES)) {
    for (const [lang, strings] of Object.entries(locales)) {
      await upsertStrings(db, `${collectionId}/${lang}`, strings as Record<string, string>);
      console.log(`Uploaded ${collectionId}/${lang}`);
    }
  }

  // optional global copy
  for (const [lang, obj] of Object.entries(COPY)) {
    const strings = flattenToRecord(obj);
    await upsertStrings(db, `copy/${lang}`, strings);
    console.log(`Uploaded copy/${lang}`);
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
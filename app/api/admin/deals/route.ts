import { NextResponse } from "next/server";
import admin from "firebase-admin";
import { adminDb } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
const BUCKET = process.env.FIREBASE_STORAGE_BUCKET ?? "";

function bad(msg: string, code = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status: code });
}

async function uploadToBucket(path: string, file: File) {
  const buf = Buffer.from(await file.arrayBuffer());
  const contentType = file.type || "application/octet-stream";

  const bucket = admin.storage().bucket(BUCKET);
  const gcsFile = bucket.file(path);

  await gcsFile.save(buf, {
    contentType,
    resumable: false,
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });

  const [url] = await gcsFile.getSignedUrl({
    action: "read",
    expires: "2500-01-01",
  });

  return url;
}

export async function POST(req: Request) {
  try {
    if (!ADMIN_PASSWORD) return bad("Missing env ADMIN_PASSWORD", 500);
    if (!BUCKET) return bad("Missing env FIREBASE_STORAGE_BUCKET", 500);

    const pw = req.headers.get("x-admin-password") ?? "";
    if (pw !== ADMIN_PASSWORD) return bad("unauthorized", 401);

    const fd = await req.formData();

    const id = String(fd.get("id") ?? "").trim();
    const amountLabel = String(fd.get("amountLabel") ?? "").trim();
    const year = String(fd.get("year") ?? "").trim();
    const logoAlt = String(fd.get("logoAlt") ?? "").trim();

    const programEn = String(fd.get("programEn") ?? "").trim();
    const programFr = String(fd.get("programFr") ?? "").trim();
    const counterpartyEn = String(fd.get("counterpartyEn") ?? "").trim();
    const counterpartyFr = String(fd.get("counterpartyFr") ?? "").trim();
    const structureEn = String(fd.get("structureEn") ?? "").trim();
    const structureFr = String(fd.get("structureFr") ?? "").trim();

    const highlightEn = String(fd.get("highlightEn") ?? "").trim();
    const highlightFr = String(fd.get("highlightFr") ?? "").trim();

    const countryCodeRaw = String(fd.get("countryCode") ?? "").trim();
    const countryNameEn = String(fd.get("countryNameEn") ?? "").trim();
    const countryNameFr = String(fd.get("countryNameFr") ?? "").trim();
    const countryCode = countryCodeRaw ? countryCodeRaw.toUpperCase() : "";

    if (!id) return bad("missing id");
    if (!amountLabel) return bad("missing amountLabel");
    if (!year) return bad("missing year");
    if (!logoAlt) return bad("missing logoAlt");
    if (!programEn || !programFr) return bad("missing program (en/fr)");
    if (!counterpartyEn || !counterpartyFr) return bad("missing counterparty (en/fr)");
    if (!structureEn || !structureFr) return bad("missing structure (en/fr)");

    if (!countryCode) return bad("missing countryCode");
    if (!countryNameEn || !countryNameFr) return bad("missing countryName (en/fr)");

    const logo = fd.get("logo");
    if (!(logo instanceof File) || logo.size === 0) return bad("missing logo file");

    const tombstone = fd.get("tombstone");

    const safe = (s: string) => s.replace(/\s+/g, "-");
    const logoUrl = await uploadToBucket(`deals/logos/${safe(id)}-${safe(logo.name)}`, logo);

    let tombstoneUrl = "";
    if (tombstone instanceof File && tombstone.size > 0) {
      tombstoneUrl = await uploadToBucket(
        `deals/tombstones/${safe(id)}-${safe(tombstone.name)}`,
        tombstone
      );
    }

    const now = admin.firestore.FieldValue.serverTimestamp();

    await adminDb.collection("deals").doc(id).set(
      {
        amountLabel,
        year,
        logoAlt,
        logoUrl,
        tombstoneUrl: tombstoneUrl || "",

        countryCode,
        countryName: { en: countryNameEn, fr: countryNameFr },

        program: { en: programEn, fr: programFr },
        counterparty: { en: counterpartyEn, fr: counterpartyFr },
        structure: { en: structureEn, fr: structureFr },

        highlight: highlightEn || highlightFr ? { en: highlightEn, fr: highlightFr } : null,

        updatedAt: now,
        createdAt: now,
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true, id, logoUrl, tombstoneUrl: tombstoneUrl || "" });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "server_error" },
      { status: 500 }
    );
  }
}
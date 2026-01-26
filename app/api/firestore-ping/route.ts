import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  const ref = adminDb.doc("debug/ping");
  const snap = await ref.get();

  return NextResponse.json({
    ok: true,
    exists: snap.exists,
    data: snap.exists ? snap.data() : null,
  });
}

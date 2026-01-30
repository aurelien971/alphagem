import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  const snap = await adminDb.collection("assets").doc("global").get();
  const data = snap.exists ? snap.data() : {};
  return NextResponse.json({ ok: true, ...data });
}
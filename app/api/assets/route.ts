import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { getAdminDb } = await import("@/lib/firebaseAdmin");
    const db = getAdminDb();

    const snap = await db.collection("assets").doc("global").get();
    const data = snap.exists ? snap.data() : {};

    return NextResponse.json({ ok: true, ...data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message ?? "assets_fetch_failed",
      },
      { status: 200 }
    );
  }
}
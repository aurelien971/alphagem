import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

type Params = { page: string; locale: string };

function flatten(obj: any, prefix = "", out: Record<string, string> = {}) {
  if (!obj || typeof obj !== "object") return out;

  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;

    if (typeof v === "string") {
      out[key] = v;
    } else if (v && typeof v === "object") {
      flatten(v, key, out);
    }
  }

  return out;
}

export async function GET(_: Request, ctx: { params: Promise<Params> }) {
  const { page, locale } = await ctx.params;

const snap = await adminDb.collection(page).doc(locale).get(); 
  if (!snap.exists) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }

  const data = snap.data() as any;
  const strings = data?.strings ?? {};

  return NextResponse.json({
    ok: true,
    page,
    locale,
    strings: flatten(strings),
  });
}
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

type Params = { locale: string };
type Locale = "en" | "fr";

function pickLocale<T>(value: any, locale: Locale): T | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value as unknown as T;
  if (typeof value === "object") return (value?.[locale] ?? value?.en ?? value?.fr) as T;
  return undefined;
}

export async function GET(_: Request, ctx: { params: Promise<Params> }) {
  console.log("API /deals hit");

  const { locale } = await ctx.params;
  const loc = (locale === "fr" ? "fr" : "en") as Locale;

  const snap = await adminDb.collection("deals").orderBy("year", "desc").get();

  console.log("Deals query size:", snap.size);
  snap.docs.forEach((d) => console.log("Deal doc:", d.id, d.data()));

  const deals = snap.docs.map((d) => {
    const data = d.data() as any;

    return {
      id: d.id,
      year: String(data.year ?? ""),
      amountLabel: String(data.amountLabel ?? ""),

      // Firestore fields
      logoSrc: String(data.logoUrl ?? ""),
      logoAlt: String(data.logoAlt ?? ""),

      tombstoneSrc: data.tombstoneUrl ? String(data.tombstoneUrl) : undefined,
      tombstoneAlt: data.tombstoneAlt ? String(data.tombstoneAlt) : undefined,
      
countryCode: data.countryCode ? String(data.countryCode) : undefined,
countryName: pickLocale<string>(data.countryName, loc),

      program: pickLocale<string>(data.program, loc) ?? "",
      counterparty: pickLocale<string>(data.counterparty, loc) ?? "",
      structure: pickLocale<string>(data.structure, loc) ?? "",
      highlight: pickLocale<string>(data.highlight, loc),
    };
  });

  return NextResponse.json({ ok: true, locale: loc, deals });
}
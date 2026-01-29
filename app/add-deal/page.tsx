"use client";

import { useMemo, useState } from "react";

type L10n = { en: string; fr: string };

const ADMIN_PASSWORD = "alphagem121";

const EXAMPLE = {
  amountLabel: "160 000 000 000 FCFA",
  year: "2024",
  logoAlt: "BOAD",
  programEn: "DOLI-P II program",
  programFr: "Programme DOLI-P II",
  counterpartyEn: "West African Development Bank",
  counterpartyFr: "Banque Ouest Africaine de Développement",
  structureEn: "Multi-originator securitization",
  structureFr: "Titrisation multi-originateurs",
  highlightEn: "First mezzanine tranche securitization in UEMOA",
  highlightFr: "Première tranche mezzanine titrisée en UEMOA",
  id: "boad-doli-p2-2024",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AddDealPage() {
  const [pw, setPw] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const [id, setId] = useState("");
  const [amountLabel, setAmountLabel] = useState("");
  const [year, setYear] = useState("");
  const [logoAlt, setLogoAlt] = useState("");

  const [program, setProgram] = useState<L10n>({ en: "", fr: "" });
  const [counterparty, setCounterparty] = useState<L10n>({ en: "", fr: "" });
  const [structure, setStructure] = useState<L10n>({ en: "", fr: "" });
  const [highlight, setHighlight] = useState<L10n>({ en: "", fr: "" });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [tombstoneFile, setTombstoneFile] = useState<File | null>(null);

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      unlocked &&
      id.trim().length > 0 &&
      amountLabel.trim().length > 0 &&
      year.trim().length > 0 &&
      logoAlt.trim().length > 0 &&
      program.en.trim().length > 0 &&
      program.fr.trim().length > 0 &&
      counterparty.en.trim().length > 0 &&
      counterparty.fr.trim().length > 0 &&
      structure.en.trim().length > 0 &&
      structure.fr.trim().length > 0 &&
      logoFile != null &&
      tombstoneFile != null
    );
  }, [unlocked, id, amountLabel, year, logoAlt, program, counterparty, structure, logoFile, tombstoneFile]);

  const fillExample = () => {
    setId(EXAMPLE.id);
    setAmountLabel(EXAMPLE.amountLabel);
    setYear(EXAMPLE.year);
    setLogoAlt(EXAMPLE.logoAlt);
    setProgram({ en: EXAMPLE.programEn, fr: EXAMPLE.programFr });
    setCounterparty({ en: EXAMPLE.counterpartyEn, fr: EXAMPLE.counterpartyFr });
    setStructure({ en: EXAMPLE.structureEn, fr: EXAMPLE.structureFr });
    setHighlight({ en: EXAMPLE.highlightEn, fr: EXAMPLE.highlightFr });
  };

  const autoId = () => {
    const base = slugify(`${logoAlt || "deal"}-${year || ""}`);
    if (base) setId(base);
  };

  const submit = async () => {
    setMsg(null);
    setBusy(true);

    try {
      const fd = new FormData();
      fd.set("id", id.trim());
      fd.set("amountLabel", amountLabel.trim());
      fd.set("year", year.trim());
      fd.set("logoAlt", logoAlt.trim());

      fd.set("programEn", program.en.trim());
      fd.set("programFr", program.fr.trim());
      fd.set("counterpartyEn", counterparty.en.trim());
      fd.set("counterpartyFr", counterparty.fr.trim());
      fd.set("structureEn", structure.en.trim());
      fd.set("structureFr", structure.fr.trim());

      if (highlight.en.trim() || highlight.fr.trim()) {
        fd.set("highlightEn", highlight.en.trim());
        fd.set("highlightFr", highlight.fr.trim());
      }

      if (logoFile) fd.set("logo", logoFile);
      if (tombstoneFile) fd.set("tombstone", tombstoneFile);

      const res = await fetch("/api/admin/deals", {
        method: "POST",
        headers: { "x-admin-password": pw },
        body: fd,
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error ?? `Upload failed (${res.status})`);

      setMsg(`Uploaded: ${json?.id ?? id}`);
      setBusy(false);
    } catch (e: any) {
      setMsg(e?.message ?? "Upload failed");
      setBusy(false);
    }
  };

  if (!unlocked) {
    return (
      <main className="mx-auto max-w-lg px-4 pt-28 pb-20">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
          <h1 className="text-2xl font-semibold">Add deal</h1>
          <p className="mt-2 text-sm opacity-70">Internal page.</p>

          <label className="mt-6 block text-sm font-medium opacity-80">Password</label>
          <input
            className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter password"
          />

          <button
            type="button"
            className="mt-4 w-full rounded-2xl border border-black/10 bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-95 disabled:opacity-40"
            disabled={pw.trim() !== ADMIN_PASSWORD}
            onClick={() => setUnlocked(true)}
          >
            Unlock
          </button>

          <p className="mt-2 text-xs opacity-60">
            {pw.trim() === ADMIN_PASSWORD ? "Password ok." : "Password required."}
          </p>

          {msg && <p className="mt-4 text-sm opacity-80">{msg}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pt-28 pb-20">
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Add deal</h1>
            <p className="mt-2 text-sm opacity-70">
              Upload logo + tombstone, then publish. Example values are from: {EXAMPLE.id}
            </p>
          </div>

          <button
            type="button"
            onClick={fillExample}
            className="rounded-2xl border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-95"
          >
            Fill example
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium opacity-80">ID</label>
            <input
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={`Example: ${EXAMPLE.id}`}
            />
            <button
              type="button"
              onClick={autoId}
              className="mt-2 text-xs underline opacity-70 hover:opacity-100"
            >
              Auto-generate from logoAlt + year
            </button>
          </div>

          <div>
            <label className="text-sm font-medium opacity-80">Year</label>
            <input
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder={`Example: ${EXAMPLE.year}`}
              inputMode="numeric"
            />
          </div>

          <div>
            <label className="text-sm font-medium opacity-80">Amount label</label>
            <input
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
              value={amountLabel}
              onChange={(e) => setAmountLabel(e.target.value)}
              placeholder={`Example: ${EXAMPLE.amountLabel}`}
            />
          </div>

          <div>
            <label className="text-sm font-medium opacity-80">Logo alt</label>
            <input
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
              value={logoAlt}
              onChange={(e) => setLogoAlt(e.target.value)}
              placeholder={`Example: ${EXAMPLE.logoAlt}`}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-black/10 p-5">
            <p className="text-sm font-medium">Program</p>
            <div className="mt-3 grid gap-3">
              <input
                className="w-full rounded-2xl border border-black/10 px-4 py-3"
                value={program.en}
                onChange={(e) => setProgram((p) => ({ ...p, en: e.target.value }))}
                placeholder={`EN example: ${EXAMPLE.programEn}`}
              />
              <input
                className="w-full rounded-2xl border border-black/10 px-4 py-3"
                value={program.fr}
                onChange={(e) => setProgram((p) => ({ ...p, fr: e.target.value }))}
                placeholder={`FR example: ${EXAMPLE.programFr}`}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 p-5">
            <p className="text-sm font-medium">Counterparty</p>
            <div className="mt-3 grid gap-3">
              <input
                className="w-full rounded-2xl border border-black/10 px-4 py-3"
                value={counterparty.en}
                onChange={(e) => setCounterparty((p) => ({ ...p, en: e.target.value }))}
                placeholder={`EN example: ${EXAMPLE.counterpartyEn}`}
              />
              <input
                className="w-full rounded-2xl border border-black/10 px-4 py-3"
                value={counterparty.fr}
                onChange={(e) => setCounterparty((p) => ({ ...p, fr: e.target.value }))}
                placeholder={`FR example: ${EXAMPLE.counterpartyFr}`}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 p-5">
            <p className="text-sm font-medium">Structure</p>
            <div className="mt-3 grid gap-3">
              <input
                className="w-full rounded-2xl border border-black/10 px-4 py-3"
                value={structure.en}
                onChange={(e) => setStructure((p) => ({ ...p, en: e.target.value }))}
                placeholder={`EN example: ${EXAMPLE.structureEn}`}
              />
              <input
                className="w-full rounded-2xl border border-black/10 px-4 py-3"
                value={structure.fr}
                onChange={(e) => setStructure((p) => ({ ...p, fr: e.target.value }))}
                placeholder={`FR example: ${EXAMPLE.structureFr}`}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 p-5">
            <p className="text-sm font-medium">Highlight (optional)</p>
            <div className="mt-3 grid gap-3">
              <input
                className="w-full rounded-2xl border border-black/10 px-4 py-3"
                value={highlight.en}
                onChange={(e) => setHighlight((p) => ({ ...p, en: e.target.value }))}
                placeholder={`EN example: ${EXAMPLE.highlightEn}`}
              />
              <input
                className="w-full rounded-2xl border border-black/10 px-4 py-3"
                value={highlight.fr}
                onChange={(e) => setHighlight((p) => ({ ...p, fr: e.target.value }))}
                placeholder={`FR example: ${EXAMPLE.highlightFr}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-black/10 p-5">
            <p className="text-sm font-medium">Logo (required)</p>
            <p className="mt-1 text-xs opacity-60">PNG recommended.</p>
            <input
              className="mt-4 block w-full text-sm"
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
            />
            <p className="mt-2 text-xs opacity-60">{logoFile ? `Selected: ${logoFile.name}` : "No file selected"}</p>
          </div>

          <div className="rounded-3xl border border-black/10 p-5">
            <p className="text-sm font-medium">Tombstone (required)</p>
            <p className="mt-1 text-xs opacity-60">PNG recommended.</p>
            <input
              className="mt-4 block w-full text-sm"
              type="file"
              accept="image/*"
              onChange={(e) => setTombstoneFile(e.target.files?.[0] ?? null)}
            />
            <p className="mt-2 text-xs opacity-60">
              {tombstoneFile ? `Selected: ${tombstoneFile.name}` : "No file selected"}
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={!canSubmit || busy}
          onClick={submit}
          className="mt-8 w-full rounded-2xl border border-black/10 bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-95 disabled:opacity-40"
        >
          {busy ? "Uploading..." : "Add deal"}
        </button>

        {msg && <p className="mt-4 text-sm opacity-80">{msg}</p>}
      </div>
    </main>
  );
}
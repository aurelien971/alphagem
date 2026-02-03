"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type L10n = { en: string; fr: string };
type MsgKind = "info" | "error" | "success";

const ADMIN_PASSWORD = "alphagem121";

const EXAMPLE = {
  amountLabel: "148 500 000 000 FCFA",
  year: "2023",
  programEn: "DOLI-P program",
  programFr: "Programme DOLI-P",
  counterpartyEn: "West African Development Bank",
  counterpartyFr: "Banque Ouest Africaine de Développement",
  structureEn: "Securitization of a sovereign loan portfolio",
  structureFr: "Titrisation de portefeuille de prêts souverains",
  highlightEn: "Best Financial Transaction of the Year AFIK",
  highlightFr: "Meilleure transaction de l'annee financial AFIK",
  countryCode: "FR",
  countryNameEn: "Senegal",
  countryNameFr: "Sénégal",
  id: "boad-doli-p-2023",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function safeText(v: unknown) {
  return typeof v === "string" ? v : JSON.stringify(v);
}

export default function AddDealPage() {
  const [pw, setPw] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const [id, setId] = useState("");
  const [idTouched, setIdTouched] = useState(false);

  const [amountLabel, setAmountLabel] = useState("");
  const [year, setYear] = useState("");

  const [program, setProgram] = useState<L10n>({ en: "", fr: "" });
  const [counterparty, setCounterparty] = useState<L10n>({ en: "", fr: "" });
  const [structure, setStructure] = useState<L10n>({ en: "", fr: "" });
  const [highlight, setHighlight] = useState<L10n>({ en: "", fr: "" });

  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState<L10n>({ en: "", fr: "" });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [tombstoneFile, setTombstoneFile] = useState<File | null>(null);

  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const tombstoneInputRef = useRef<HTMLInputElement | null>(null);

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: MsgKind; text: string } | null>(null);
  const [debug, setDebug] = useState<string | null>(null);

  // Auto-generate ID unless user manually edited it
  useEffect(() => {
    if (idTouched) return;

    const baseName =
      slugify(counterparty.en || counterparty.fr || program.en || program.fr || "deal") || "deal";
    const baseYear = slugify(year || "");
    const base = slugify([baseName, baseYear].filter(Boolean).join("-"));

    if (base && base !== id) setId(base);
    if (!base && id) setId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counterparty.en, counterparty.fr, program.en, program.fr, year, idTouched]);

  const canSubmit = useMemo(() => {
    return (
      unlocked &&
      id.trim().length > 0 &&
      amountLabel.trim().length > 0 &&
      year.trim().length > 0 &&
      program.en.trim().length > 0 &&
      program.fr.trim().length > 0 &&
      counterparty.en.trim().length > 0 &&
      counterparty.fr.trim().length > 0 &&
      structure.en.trim().length > 0 &&
      structure.fr.trim().length > 0 &&
      countryCode.trim().length > 0 &&
      countryName.en.trim().length > 0 &&
      countryName.fr.trim().length > 0 &&
      logoFile != null
      // tombstone is optional
    );
  }, [unlocked, id, amountLabel, year, program, counterparty, structure, countryCode, countryName, logoFile]);

  const fillExample = () => {
    setMsg(null);
    setDebug(null);

    setIdTouched(false);
    setId(EXAMPLE.id);

    setAmountLabel(EXAMPLE.amountLabel);
    setYear(EXAMPLE.year);
    setProgram({ en: EXAMPLE.programEn, fr: EXAMPLE.programFr });
    setCounterparty({ en: EXAMPLE.counterpartyEn, fr: EXAMPLE.counterpartyFr });
    setStructure({ en: EXAMPLE.structureEn, fr: EXAMPLE.structureFr });
    setHighlight({ en: EXAMPLE.highlightEn, fr: EXAMPLE.highlightFr });

    setCountryCode(EXAMPLE.countryCode);
    setCountryName({ en: EXAMPLE.countryNameEn, fr: EXAMPLE.countryNameFr });
  };

  const clearLogo = () => {
    setLogoFile(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const clearTombstone = () => {
    setTombstoneFile(null);
    if (tombstoneInputRef.current) tombstoneInputRef.current.value = "";
  };

  const pickLogo = () => logoInputRef.current?.click();
  const pickTombstone = () => tombstoneInputRef.current?.click();

  const submit = async () => {
    setMsg(null);
    setDebug(null);
    setBusy(true);

    const logoAltDerived = (counterparty.en || counterparty.fr || program.en || program.fr || "Deal")
      .trim()
      .slice(0, 80);

    try {
      const fd = new FormData();

      fd.set("id", id.trim());
      fd.set("amountLabel", amountLabel.trim());
      fd.set("year", year.trim());

      // Kept for backend compatibility, not shown to users
      fd.set("logoAlt", logoAltDerived);

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

      fd.set("countryCode", countryCode.trim().toUpperCase());
      fd.set("countryNameEn", countryName.en.trim());
      fd.set("countryNameFr", countryName.fr.trim());

      if (logoFile) fd.set("logo", logoFile);
      if (tombstoneFile) fd.set("tombstone", tombstoneFile);

      const res = await fetch("/api/admin/deals", {
        method: "POST",
        headers: { "x-admin-password": pw },
        body: fd,
      });

      const contentType = res.headers.get("content-type") || "";
      let json: any = null;
      let rawText: string | null = null;

      if (contentType.includes("application/json")) {
        json = await res.json().catch(() => null);
      } else {
        rawText = await res.text().catch(() => null);
      }

      if (!res.ok) {
        const err =
          json?.error ||
          (rawText ? rawText.slice(0, 800) : null) ||
          `Upload failed (${res.status})`;

        const dbg = [
          `Status: ${res.status} ${res.statusText}`,
          `Content-Type: ${contentType || "unknown"}`,
          `Body preview: ${safeText(json ?? rawText ?? "")}`.slice(0, 1200),
        ].join("\n");

        console.error("Upload failed", { status: res.status, json, rawText });
        setDebug(dbg);
        throw new Error(typeof err === "string" ? err : "Upload failed");
      }

      const uploadedId = json?.id ?? id.trim();
      setMsg({ kind: "success", text: `Uploaded: ${uploadedId}` });

      clearLogo();
      clearTombstone();
      setBusy(false);
    } catch (e: any) {
      console.error("Upload exception", e);
      setMsg({ kind: "error", text: e?.message ?? "Upload failed" });

      setDebug((prev) => prev ?? `Client error: ${safeText(e?.stack || e)}`.slice(0, 1200));
      setBusy(false);
    }
  };

  if (!unlocked) {
    return (
      <main className="mx-auto max-w-lg px-4 pb-20 pt-28">
        <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[var(--background)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
          <h1 className="text-2xl font-semibold">Add deal</h1>
          <p className="mt-2 text-sm opacity-70">Internal page.</p>

          <label className="mt-6 block text-sm font-medium opacity-80">Password</label>
          <input
            className="mt-2 w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter password"
          />

          <button
            type="button"
            className="mt-4 w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-95 disabled:opacity-40"
            disabled={pw.trim() !== ADMIN_PASSWORD}
            onClick={() => setUnlocked(true)}
          >
            Unlock
          </button>

          <p className="mt-2 text-xs opacity-60">
            {pw.trim() === ADMIN_PASSWORD ? "Password ok." : "Password required."}
          </p>

          {msg && (
            <p className={`mt-4 text-sm ${msg.kind === "error" ? "text-red-700" : "opacity-80"}`}>
              {msg.text}
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-28">
      <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[var(--background)] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Add deal</h1>
            <p className="mt-2 text-xs opacity-60">
              Upload a logo (required) and optional tombstone, then publish. ex: {EXAMPLE.id}
            </p>
          </div>

          <button
            type="button"
            onClick={fillExample}
            className="rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-95"
          >
            Fill example
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium opacity-80">ID</label>
            <input
              className="mt-2 w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
              value={id}
              onChange={(e) => {
                setIdTouched(true);
                setId(e.target.value);
              }}
              placeholder={`ex: ${EXAMPLE.id}`}
            />
            <p className="mt-2 text-xs opacity-60">
              Auto-generated from Counterparty + Year unless you edit it.
              {idTouched ? " (You edited it.)" : ""}
            </p>
            {idTouched && (
              <button
                type="button"
                onClick={() => setIdTouched(false)}
                className="mt-2 text-xs underline opacity-70 hover:opacity-100"
              >
                Re-enable auto ID
              </button>
            )}
          </div>

          <div>
            <label className="text-sm font-medium opacity-80">Year</label>
            <input
              className="mt-2 w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder={`ex: ${EXAMPLE.year}`}
              inputMode="numeric"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium opacity-80">Amount label</label>
            <input
              className="mt-2 w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
              value={amountLabel}
              onChange={(e) => setAmountLabel(e.target.value)}
              placeholder={`ex: ${EXAMPLE.amountLabel}`}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] p-5">
            <p className="text-sm font-medium">Program</p>
            <div className="mt-3 grid gap-3">
              <input
                className="w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
                value={program.en}
                onChange={(e) => setProgram((p) => ({ ...p, en: e.target.value }))}
                placeholder={`ex EN: ${EXAMPLE.programEn}`}
              />
              <input
                className="w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
                value={program.fr}
                onChange={(e) => setProgram((p) => ({ ...p, fr: e.target.value }))}
                placeholder={`ex FR: ${EXAMPLE.programFr}`}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] p-5">
            <p className="text-sm font-medium">Counterparty</p>
            <div className="mt-3 grid gap-3">
              <input
                className="w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
                value={counterparty.en}
                onChange={(e) => setCounterparty((p) => ({ ...p, en: e.target.value }))}
                placeholder={`ex EN: ${EXAMPLE.counterpartyEn}`}
              />
              <input
                className="w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
                value={counterparty.fr}
                onChange={(e) => setCounterparty((p) => ({ ...p, fr: e.target.value }))}
                placeholder={`ex FR: ${EXAMPLE.counterpartyFr}`}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] p-5">
            <p className="text-sm font-medium">Structure</p>
            <div className="mt-3 grid gap-3">
              <input
                className="w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
                value={structure.en}
                onChange={(e) => setStructure((p) => ({ ...p, en: e.target.value }))}
                placeholder={`ex EN: ${EXAMPLE.structureEn}`}
              />
              <input
                className="w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
                value={structure.fr}
                onChange={(e) => setStructure((p) => ({ ...p, fr: e.target.value }))}
                placeholder={`ex FR: ${EXAMPLE.structureFr}`}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] p-5">
            <p className="text-sm font-medium">Highlight (optional)</p>
            <div className="mt-3 grid gap-3">
              <input
                className="w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
                value={highlight.en}
                onChange={(e) => setHighlight((p) => ({ ...p, en: e.target.value }))}
                placeholder={`ex EN: ${EXAMPLE.highlightEn}`}
              />
              <input
                className="w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
                value={highlight.fr}
                onChange={(e) => setHighlight((p) => ({ ...p, fr: e.target.value }))}
                placeholder={`ex FR: ${EXAMPLE.highlightFr}`}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] p-5">
            <p className="text-sm font-medium">Country</p>
            <p className="mt-1 text-xs opacity-60">ISO code + English/French names.</p>

            <div className="mt-3 grid gap-3">
              <input
                className="w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
                placeholder="ex: SN"
              />
              <input
                className="w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
                value={countryName.en}
                onChange={(e) => setCountryName((c) => ({ ...c, en: e.target.value }))}
                placeholder={`ex EN: ${EXAMPLE.countryNameEn}`}
              />
              <input
                className="w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-4 py-3 text-sm placeholder:text-xs"
                value={countryName.fr}
                onChange={(e) => setCountryName((c) => ({ ...c, fr: e.target.value }))}
                placeholder={`ex FR: ${EXAMPLE.countryNameFr}`}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Logo (required)</p>
                <p className="mt-1 text-xs opacity-60">PNG recommended.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={pickLogo}
                  className="rounded-full border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-3 py-1 text-xs opacity-80 hover:opacity-100"
                >
                  Choose
                </button>
                <button
                  type="button"
                  onClick={clearLogo}
                  className="rounded-full border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-3 py-1 text-xs opacity-70 hover:opacity-100"
                >
                  Clear
                </button>
              </div>
            </div>

            <input
              ref={logoInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
            />

            <p className="mt-3 text-xs opacity-60">{logoFile ? `Selected: ${logoFile.name}` : "No file selected"}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] p-5 md:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Tombstone (optional)</p>
                <p className="mt-1 text-xs opacity-60">PNG recommended.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={pickTombstone}
                  className="rounded-full border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-3 py-1 text-xs opacity-80 hover:opacity-100"
                >
                  Choose
                </button>
                <button
                  type="button"
                  onClick={clearTombstone}
                  className="rounded-full border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] px-3 py-1 text-xs opacity-70 hover:opacity-100"
                >
                  Clear
                </button>
              </div>
            </div>

            <input
              ref={tombstoneInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => setTombstoneFile(e.target.files?.[0] ?? null)}
            />

            <p className="mt-3 text-xs opacity-60">
              {tombstoneFile ? `Selected: ${tombstoneFile.name}` : "No file selected"}
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={!canSubmit || busy}
          onClick={submit}
          className="mt-8 w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-black px-4 py-3 text-sm font-medium text-white hover:opacity-95 disabled:opacity-40"
        >
          {busy ? "Uploading..." : "Add deal"}
        </button>

        {msg && (
          <p
            className={[
              "mt-4 whitespace-pre-wrap text-sm",
              msg.kind === "error"
                ? "text-red-700"
                : msg.kind === "success"
                ? "text-emerald-700"
                : "opacity-80",
            ].join(" ")}
          >
            {msg.text}
          </p>
        )}

        {debug && (
          <details className="mt-4 rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-black/[0.03] p-4">
            <summary className="cursor-pointer text-xs font-medium opacity-70">Debug details</summary>
            <pre className="mt-3 whitespace-pre-wrap text-xs opacity-80">{debug}</pre>
          </details>
        )}
      </div>
    </main>
  );
}
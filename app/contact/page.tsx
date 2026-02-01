"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/components/i18n/i18n";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");

  // useEffect(() => {
  //   setPage("contact");
  // }, [setPage]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 1200);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1600);
    }
  };

  const badgeText =
    status === "sending"
      ? t("contact.badge.sending")
      : status === "sent"
      ? t("contact.badge.sent")
      : status === "error"
      ? t("contact.badge.error")
      : t("contact.badge.idle");

  return (
    <main className="min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-28 md:pt-32">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.26em] opacity-60">
            {t("contact.eyebrow")}
          </p>

          {/* <h1 className="mt-4 text-4xl font-semibold leading-[1.03] tracking-tight md:text-6xl">
            {t("contact.title")}
          </h1>

          <p className="mt-6 max-w-[80ch] text-sm leading-7 opacity-75 md:text-base md:leading-8">
            {t("contact.body")}
          </p> */}
        </div>

        <div className="mt-12 h-px w-full bg-[color:color-mix(in_oklab,var(--foreground)_10%,transparent)]" />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div className="rounded-[28px] border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_3%,transparent)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.08)] md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs tracking-[0.26em] opacity-60">
                  {t("contact.form.kicker")}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  {t("contact.form.title")}
                </h2>
              </div>

              <div
                className={[
                  "rounded-full border px-3 py-1 text-s tracking-wide",
                  status === "sent"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                    : status === "error"
                    ? "border-red-500/30 bg-red-500/10 text-red-700"
                    : "border-[color:color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_5%,transparent)] opacity-70",
                ].join(" ")}
              >
                {badgeText}
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label={t("contact.field.firstName.label")}
                  name="firstName"
                  placeholder={t("contact.field.firstName.placeholder")}
                />
                <Field
                  label={t("contact.field.lastName.label")}
                  name="lastName"
                  placeholder={t("contact.field.lastName.placeholder")}
                />
              </div>

              <Field
                label={t("contact.field.email.label")}
                name="email"
                type="email"
                placeholder={t("contact.field.email.placeholder")}
              />

              <Field
                label={t("contact.field.message.label")}
                name="message"
                placeholder={t("contact.field.message.placeholder")}
                textarea
              />

              <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-s leading-6 opacity-60">
                  {t("contact.consent")}
                </p>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={[
                    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition-opacity",
                    "bg-[#0E3453] text-white hover:opacity-90",
                    status === "sending" ? "opacity-70" : "",
                  ].join(" ")}
                >
                  {t("contact.cta")}
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_3%,transparent)] p-6 md:p-8">
              <p className="text-xs tracking-[0.26em] opacity-60">
                {t("contact.direct.kicker")}
              </p>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label={t("contact.direct.email")}
                  value={
                    <a
                      href="mailto:contact@alphagem.net"
                      className="underline underline-offset-4 opacity-70 transition hover:opacity-100"
                    >
                      contact@alphagem.net
                    </a>
                  }
                />

                <InfoRow
                  label={t("contact.direct.linkedin")}
                  value={
                    <a
                      href="https://www.linkedin.com/company/alphagem/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 opacity-70 transition hover:opacity-100"
                    >
                      Alphagem Advisors
                    </a>
                  }
                />

                <InfoRow
                  label={t("contact.direct.location")}
                  value={t("contact.direct.locationValue")}
                />
              </div>

              {/* <div className="mt-7 h-px w-full bg-[color:color-mix(in_oklab,var(--foreground)_10%,transparent)]" /> */}
{/* 
              <p className="mt-7 text-sm leading-7 opacity-75">
                {t("contact.direct.brief")}
              </p> */}
            </div>

            <div className="rounded-[28px] border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_3%,transparent)] p-6 md:p-8">
              <p className="text-xs tracking-[0.26em] opacity-60">
                {t("contact.whatWeDo.kicker")}
              </p>

              <ul className="mt-5 space-y-3 text-sm leading-7 opacity-80">
                <li className="flex gap-3">
                  <Dot />
                  <span>{t("contact.whatWeDo.item1")}</span>
                </li>
                <li className="flex gap-3">
                  <Dot />
                  <span>{t("contact.whatWeDo.item2")}</span>
                </li>
                <li className="flex gap-3">
                  <Dot />
                  <span>{t("contact.whatWeDo.item3")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-[color:color-mix(in_oklab,var(--foreground)_10%,transparent)]" />
        <div className="mt-10 text-xs opacity-60">{t("contact.footer")}</div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  textarea,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    "w-full rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_2%,transparent)] px-4 py-3 text-sm outline-none transition-shadow placeholder:opacity-50 focus:shadow-[0_0_0_6px_rgba(42,110,159,0.14)]";
  return (
    <label className="block">
      <div className="mb-2 text-xs tracking-[0.22em] opacity-60">{label}</div>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required
          rows={6}
          className={[base, "resize-none"].join(" ")}
        />
      ) : (
        <input name={name} placeholder={placeholder} required type={type} className={base} />
      )}
    </label>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-4">
      <div className="text-xs tracking-[0.22em] opacity-55">{label}</div>
      <div className="text-sm font-medium opacity-85">{value}</div>
    </div>
  );
}

function Dot() {
  return (
    <span className="mt-[0.55rem] inline-flex h-6 w-6 items-center justify-center rounded-full border border-[color:color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_4%,transparent)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground)] opacity-60" />
    </span>
  );
}
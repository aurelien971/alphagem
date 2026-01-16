"use client";

import { useI18n } from "@/components/i18n/i18n";

export default function FiguresSection() {
  const { t } = useI18n();

  const figures = [
    { value: t("about.figures.items.0.value"), label: t("about.figures.items.0.label") },
    { value: t("about.figures.items.1.value"), label: t("about.figures.items.1.label") },
    { value: t("about.figures.items.2.value"), label: t("about.figures.items.2.label") },
  ];

  return (
    <section id="figures" className="scroll-mt-28">
      <p className="text-xs tracking-[0.28em] text-[var(--muted2)] uppercase">
        {t("about.figures.kicker")}
      </p>

      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {t("about.figures.title")}
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {figures.map((f) => (
          <div
            key={f.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7"
          >
            <div className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
              {f.value}
            </div>
            <div className="mt-3 text-sm text-[var(--muted)]">{f.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-[var(--muted)]">{t("about.figures.footnote")}</div>
    </section>
  );
}
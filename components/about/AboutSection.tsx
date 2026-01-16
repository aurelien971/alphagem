"use client";

import { useI18n } from "@/components/i18n/i18n";

export default function AboutSection() {
  const { t } = useI18n();

  return (
    <section id="about" className="scroll-mt-28">
      <p className="text-xs tracking-[0.28em] text-[var(--muted2)] uppercase">
        {t("about.section.kicker")}
      </p>

      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {t("about.section.title")}
      </h2>

      <div className="mt-8 max-w-[78ch] space-y-6 text-base leading-8 text-[var(--muted)]">
        <p>{t("about.section.p1")}</p>
        <p>{t("about.section.p2")}</p>
      </div>
    </section>
  );
}
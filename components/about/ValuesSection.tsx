"use client";

import { useI18n } from "@/components/i18n/i18n";

export default function ValuesSection() {
  const { t } = useI18n();

  return (
    <section id="values" className="scroll-mt-28">
      <div className="border-t border-[var(--border)] pt-12 pb-16">
        <p className="text-xs tracking-[0.28em] text-[var(--muted2)] uppercase">
          {t("about.values.kicker")}
        </p>

        <h2 className="mt-5 text-3xl font-semibold tracking-wide text-[var(--foreground)] sm:text-4xl">
          {t("about.values.title")}
        </h2>

        <div className="mt-8 max-w-[85ch] space-y-6 text-base leading-8 text-[var(--muted)]">
          <p>{t("about.values.p1")}</p>
          <p>{t("about.values.p2")}</p>
          <p>{t("about.values.p3")}</p>
          <p>{t("about.values.p4")}</p>
        </div>
      </div>

      <div aria-hidden className="h-[28vh] md:h-[38vh]" />
    </section>
  );
}
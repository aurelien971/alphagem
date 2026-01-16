"use client";
import { useI18n } from "@/components/i18n/i18n";

export default function ServicesIntro() {
  const { t } = useI18n();

  return (
    <div id="services" className="scroll-mt-28">
      <p className="text-xs tracking-[0.26em] opacity-60">{t("services.overviewEyebrow")}</p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
        {t("services.overviewTitle")}
      </h2>
      <p className="mt-6 max-w-[90ch] text-sm leading-7 opacity-75 md:text-base md:leading-8">
        {t("services.overviewBody")}
      </p>
    </div>
  );
}
"use client";
import { useI18n } from "@/components/i18n/i18n";

export default function ServicesIntro() {
  const { t } = useI18n();

  return (
    <div id="services" className="scroll-mt-28">

     <h3 className="text-2xl font-semibold leading-tight text-[var(--foreground)] md:text-4xl">
  {t("services.overviewTitle")}
</h3>
   <p className="mt-6 w-full text-sm leading-7 opacity-75 md:text-base md:leading-8">
  {t("services.overviewBody")}
</p>
    </div>
  );
}
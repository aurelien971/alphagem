"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/i18n";

export default function ServicesHero() {
  const { t } = useI18n();

  return (
    <section className="relative h-[72vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src="/services-hero.jpg"
        alt="Services"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/80" />

      <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-4 pb-16 pt-28 md:pb-20">
        <div className="grid w-full items-end lg:grid-cols-[15rem_1fr] lg:gap-16">
          <div className="hidden lg:block" />

          <div className="w-full">
            <div className="max-w-6xl [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
              <p className="text-xs tracking-[0.26em] text-white/70">
                {t("services.hero.kicker")}
              </p>

              <h1 className="mt-4 max-w-[28ch] text-4xl font-semibold leading-[1.03] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {t("services.hero.title")}
              </h1>

              <p className="mt-6 max-w-[78ch] text-sm leading-7 text-white/80 md:text-base md:leading-8">
                {t("services.hero.body")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
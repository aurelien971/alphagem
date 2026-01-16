"use client";

import Image from "next/image";
import LearnMoreButton from "@/components/LearnMoreButton";
import { useI18n } from "@/components/i18n/i18n";

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <Image src="/hero.jpg" alt="Hero" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />

      <div className="relative mx-auto flex h-full max-w-6xl items-end px-4 pb-20 pt-28">
        <div className="w-full [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
          <p className="text-xs tracking-[0.22em] text-white/70">
            {t("home.hero.kicker")}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-wide text-white md:text-6xl">
            {t("home.hero.brand")}
          </h1>

          <div className="mt-12 grid gap-12 md:grid-cols-[1fr_auto_1fr]">
            <div>
              <h2 className="text-lg font-semibold text-white">
                {t("home.hero.leftTitle")}
              </h2>
              <p className="mt-4 max-w-prose text-sm leading-7 text-white/80 md:text-base">
                {t("home.hero.leftBody")}
              </p>
            </div>

            <div className="hidden w-px bg-white/25 md:block" />

            <div>
              <h2 className="text-lg font-semibold text-white">
                {t("home.hero.rightTitle")}
              </h2>
              <p className="mt-4 max-w-prose text-sm leading-7 text-white/80 md:text-base">
                {t("home.hero.rightBody")}
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <LearnMoreButton
              targetId="vision"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              {t("home.hero.cta")}
            </LearnMoreButton>
          </div>
        </div>
      </div>
    </section>
  );
}
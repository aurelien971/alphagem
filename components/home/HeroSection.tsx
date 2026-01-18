"use client";

import Image from "next/image";
import LearnMoreButton from "@/components/LearnMoreButton";
import { useI18n } from "@/components/i18n/i18n";

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <Image src="/hero.jpg" alt="Hero" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30" />

      <div className="relative mx-auto flex h-full max-w-6xl items-end px-4 pb-10 pt-24 sm:pb-14 sm:pt-28">
        <div className="w-full [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
          <p className="text-[11px] tracking-[0.26em] text-white/75 sm:text-xs">
            {t("home.hero.kicker")}
          </p>

          <h1 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:mt-4 sm:text-5xl md:text-6xl">
            {t("home.hero.brand")}
          </h1>

          <div className="mt-7 grid gap-7 md:mt-10 md:grid-cols-[1fr_auto_1fr] md:gap-10">
            <div>
              <h2 className="text-sm font-semibold tracking-wide text-white sm:text-base">
                {t("home.hero.leftTitle")}
              </h2>
              <p className="mt-3 max-w-prose text-sm leading-6 text-white/80 sm:mt-4 sm:text-[15px] sm:leading-7">
                {t("home.hero.leftBody")}
              </p>
            </div>

            <div className="hidden w-px bg-white/20 md:block" />

            <div>
              <h2 className="text-sm font-semibold tracking-wide text-white sm:text-base">
                {t("home.hero.rightTitle")}
              </h2>
              <p className="mt-3 max-w-prose text-sm leading-6 text-white/80 sm:mt-4 sm:text-[15px] sm:leading-7">
                {t("home.hero.rightBody")}
              </p>
            </div>
          </div>

          <div className="mt-7 sm:mt-9">
            <LearnMoreButton
              targetId="vision"
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-xs font-semibold text-black shadow-sm hover:bg-white"
            >
              {t("home.hero.cta")}
              <ChevronDown className="h-3.5 w-3.5" />
            </LearnMoreButton>
          </div>
        </div>
      </div>
    </section>
  );
}
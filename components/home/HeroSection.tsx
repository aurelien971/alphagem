"use client";

import Image from "next/image";
import LearnMoreButton from "@/components/LearnMoreButton";
import { useI18n } from "@/components/i18n/i18n";
import { useEffect, useState } from "react";

type AssetsDoc = {
  homeBackgroundUrl?: string;
};

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
  const [heroSrc, setHeroSrc] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/assets", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (cancelled) return;
        setHeroSrc(String((json as AssetsDoc | null)?.homeBackgroundUrl ?? ""));
      })
      .catch(() => {
        if (!cancelled) setHeroSrc("");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <Image
        src={heroSrc || "/hero.jpg"}
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-black/45" />

<div className="relative mx-auto flex h-full max-w-6xl items-end px-4 pb-20 pt-36 sm:pb-16 sm:pt-32">
        <div className="w-full [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
          <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-14">
            <div>
              <h2 className="text-base font-semibold tracking-wide text-white sm:text-lg">
                {t("home.hero.leftTitle")}
              </h2>
              <p className="mt-4 max-w-prose text-base leading-8 text-white/85 sm:text-lg sm:leading-8">
                {t("home.hero.leftBody")}
              </p>
            </div>

            <div className="hidden w-px bg-white/25 md:block" />

            <div>
              <h2 className="text-base font-semibold tracking-wide text-white sm:text-lg">
                {t("home.hero.rightTitle")}
              </h2>
              <p className="mt-4 max-w-prose text-base leading-8 text-white/85 sm:text-lg sm:leading-8">
                {t("home.hero.rightBody")}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <LearnMoreButton
              targetId="vision"
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-white"
            >
              {t("home.hero.cta")}
              <ChevronDown className="h-4 w-4" />
            </LearnMoreButton>
          </div>
        </div>
      </div>
    </section>
  );
}
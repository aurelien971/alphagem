"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/i18n";

type AssetsDoc = {
  aboutHeroUrl?: string;
};

export default function AboutHero() {
  const { t } = useI18n();
  const [bgSrc, setBgSrc] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/assets", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (cancelled) return;
        const url = String((json as AssetsDoc | null)?.aboutHeroUrl ?? "");
        setBgSrc(url);
      })
      .catch(() => {
        if (cancelled) return;
        setBgSrc("");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative h-[72vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src={bgSrc || "/about-hero3.jpg"}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

<div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/75" />

      <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-4 pb-16 pt-28 md:pb-20">
        <div className="grid w-full items-end lg:grid-cols-[14rem_1fr] lg:gap-10">
          <div className="hidden lg:block" />

          <div className="w-full">
            <div className="max-w-6xl [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
              <p className="text-xs tracking-[0.26em] text-white/70">{t("about.hero.kicker")}</p>

              <h1 className="mt-4 max-w-[28ch] text-4xl font-semibold leading-[1.03] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {t("about.hero.title")}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
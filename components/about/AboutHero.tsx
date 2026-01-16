"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/i18n";

export default function AboutHero() {
  const { t } = useI18n();

  return (
    <section className="relative mt-24 overflow-hidden rounded-[26px] border border-white/10">
      <div className="relative aspect-[16/7] w-full">
        <Image
          src="/about-hero1.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="(min-width: 1024px) 1152px, 100vw"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="absolute inset-0 flex items-end px-10 pb-10">
        <div>
          <p className="text-xs tracking-[0.22em] text-white/80">
            {t("about.hero.kicker")}
          </p>

          <h1 className="mt-3 max-w-[26ch] text-4xl font-semibold leading-[1.03] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t("about.hero.title")}
          </h1>
        </div>
      </div>
    </section>
  );
}
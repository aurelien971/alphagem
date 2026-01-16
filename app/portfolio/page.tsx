// app/portfolio/page.tsx
"use client";
import DealCard from "@/components/portfolio/DealCard";
import { DEALS } from "@/components/portfolio/portfolioContent";
import { useI18n } from "@/components/i18n/i18n";

export default function PortfolioPage() {
  const { t } = useI18n();

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-28">
        <p className="text-xs tracking-[0.26em] opacity-60">{t("portfolio.eyebrow")}</p>

        <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
          {t("portfolio.title")}
        </h1>

        <p className="mt-6 max-w-[90ch] text-sm leading-7 opacity-75 md:text-base md:leading-8">
          {t("portfolio.body")}
        </p>

        <div className="mt-12 h-px w-full bg-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)]" />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DEALS.map((d) => (
            <DealCard key={d.id} deal={d} />
          ))}
        </div>

        <div aria-hidden className="h-24 md:h-32" />
      </section>
    </main>
  );
}
"use client";

import Image from "next/image";
import type { Deal } from "./useDeals";

export default function DealCard({ deal }: { deal: Deal }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_2.5%,transparent)] shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-4 px-7 pt-6">
        <div className="text-xs tracking-[0.26em] uppercase opacity-70">
          {deal.amountLabel}
        </div>
        <div className="text-xs tracking-[0.26em] uppercase opacity-55">
          {deal.year}
        </div>
      </div>

      <div className="px-7 pt-5">
        <div className="relative flex h-32 items-center justify-center rounded-2xl border border-black/10 bg-white">
          {deal.logoSrc && (
            <Image
              src={deal.logoSrc}
              alt={deal.logoAlt}
              fill
              className="object-contain p-6"
            />
          )}
        </div>
      </div>

      <div className="px-7 pb-7 pt-6">
        <div className="text-xs tracking-[0.26em] uppercase opacity-60">
          {deal.program}
        </div>

        <h3 className="mt-3 text-xl font-semibold leading-tight">
          {deal.counterparty}
        </h3>

        <p className="mt-4 text-sm leading-7 opacity-75">
          {deal.structure}
        </p>

        {deal.highlight && (
          <div className="mt-5 rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_10%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_3.5%,transparent)] px-4 py-3">
            <p className="text-sm leading-6 opacity-80">
              {deal.highlight}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
"use client";

import Image from "next/image";
import { useState } from "react";
import type { Deal } from "./useDeals";
import TombstoneModal from "./TombstoneModal";

export default function DealCardV3({ deal }: { deal: Deal }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-full w-full text-left"
        aria-label={`Open details for ${deal.logoAlt}`}
      >
        <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_2.5%,transparent)] shadow-[0_18px_60px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.01]">
          <div className="flex items-center justify-between px-7 pt-6">
            <div className="text-xs tracking-[0.26em] uppercase opacity-70">{deal.amountLabel}</div>
            <div className="text-xs tracking-[0.26em] uppercase opacity-55">{deal.year}</div>
          </div>

          <div className="px-7 pt-5">
            <div className="relative flex h-32 items-center justify-center rounded-2xl border border-black/10 bg-white">
              <Image src={deal.logoSrc} alt={deal.logoAlt} fill className="object-contain p-6" />
            </div>
          </div>

          <div className="flex flex-1 flex-col px-7 pb-7 pt-6">
            <div className="text-xs tracking-[0.26em] uppercase opacity-60">{deal.program}</div>

            <h3 className="mt-3 text-xl font-semibold leading-tight">{deal.counterparty}</h3>

            <p className="mt-4 text-sm leading-7 opacity-75">{deal.structure}</p>

            {deal.highlight && (
              <div className="mt-5 rounded-2xl border border-[color:color-mix(in_oklab,var(--foreground)_10%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_3.5%,transparent)] px-4 py-3">
                <p className="text-sm leading-6 opacity-80">{deal.highlight}</p>
              </div>
            )}

            <div className="mt-auto pt-6">
              <span className="inline-flex rounded-full border border-[color:color-mix(in_oklab,var(--foreground)_14%,transparent)] px-3 py-1 text-sm opacity-70">
                View tombstone
              </span>
            </div>
          </div>
        </article>
      </button>

      <TombstoneModal
        open={open}
        onClose={() => setOpen(false)}
        src={deal.tombstoneSrc}
        alt={deal.tombstoneAlt}
        title={deal.counterparty}
        fallbackLogoSrc={deal.logoSrc}
        fallbackLogoAlt={deal.logoAlt}
      />
    </>
  );
}
"use client";

import type { Deal } from "./useDeals";
import DealCardV3 from "./DealCardV3";

export default function PortfolioTabs({ deals }: { deals: Deal[] }) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {deals.map((deal) => (
        <DealCardV3 key={deal.id} deal={deal} />
      ))}
    </div>
  );
}
"use client";

import { useState } from "react";
import type { Deal } from "./portfolioContent";
import DealCard from "./DealCard";
import DealCardV2 from "./DealCardV2";
import DealCardV3 from "./DealCardV3";

type Version = "v1" | "v2" | "v3";

export default function PortfolioTabs({ deals }: { deals: Deal[] }) {
  const [version, setVersion] = useState<Version>("v1");

  const renderDeal = (deal: Deal) => {
    if (version === "v2") return <DealCardV2 key={deal.id} deal={deal} />;
    if (version === "v3") return <DealCardV3 key={deal.id} deal={deal} />;
    return <DealCard key={deal.id} deal={deal} />;
  };

  const Tab = ({ id, label }: { id: Version; label: string }) => {
    const active = version === id;
    return (
      <button
        onClick={() => setVersion(id)}
        className={`rounded-full border px-4 py-2 text-sm ${
          active
            ? "bg-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)]"
            : "opacity-70 hover:opacity-100"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      <div className="mt-10 flex gap-2">
        <Tab id="v1" label="Version 1" />
        <Tab id="v2" label="Version 2" />
        <Tab id="v3" label="Version 3" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {deals.map(renderDeal)}
      </div>
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/i18n";

export type Deal = {
  id: string;
  amountLabel: string;
  year: string;

  logoSrc: string;
  logoAlt: string;

  tombstoneSrc?: string;
  tombstoneAlt?: string;

  countryCode?: string;
  countryName?: string;

  program: string;
  counterparty: string;
  structure: string;
  highlight?: string;
};

export function useDeals() {
  const { locale } = useI18n();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useDeals effect running, locale:", locale);

    let cancelled = false;
    setLoading(true);

    fetch(`/api/deals/${locale}`, { cache: "no-store" })
      .then((r) => {
        console.log("Deals fetch status:", r.status);
        if (!r.ok) throw new Error("deals fetch failed");
        return r.json();
      })
      .then((json) => {
        console.log("Deals payload:", json);
        if (cancelled) return;
        setDeals((json?.deals ?? []) as Deal[]);
      })
      .catch((e) => {
        console.error("Deals fetch error:", e);
        if (cancelled) return;
        setDeals([]);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { deals, loading };
}
"use client";

import { useEffect, useState } from "react";

export type Assets = Record<string, string>;

export function useAssets() {
  const [assets, setAssets] = useState<Assets>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetch("/api/assets", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        setAssets((json?.assets ?? {}) as Assets);
      })
      .catch(() => {
        if (cancelled) return;
        setAssets({});
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { assets, loading };
}
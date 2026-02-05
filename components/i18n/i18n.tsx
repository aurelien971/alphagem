"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "fr";
type Dict = Record<string, string>;

type I18nCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  isLoading: boolean;
};

const I18nContext = createContext<I18nCtx | null>(null);

async function fetchDict(page: string, locale: Locale): Promise<Dict> {
  try {
    const res = await fetch(`/api/i18n/${encodeURIComponent(page)}/${locale}`, {
      cache: "no-store",
      credentials: "same-origin",
    });

    if (!res.ok) return {};
    const json = await res.json().catch(() => null);
    return (json as any)?.strings ?? {};
  } catch {
    return {};
  }
}

const PAGES = ["copy", "home", "about", "services", "portfolio", "contact"];

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "fr";

    try {
      const stored = window.localStorage.getItem("locale");
      if (stored === "en" || stored === "fr") return stored;
    } catch {
      // iOS can throw here in some modes
    }

    return "fr";
  });

  const [dict, setDict] = useState<Dict>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    Promise.allSettled(PAGES.map((p) => fetchDict(p, locale)))
      .then((results) => {
        if (cancelled) return;
        const dicts = results
          .filter((r): r is PromiseFulfilledResult<Dict> => r.status === "fulfilled")
          .map((r) => r.value);
        setDict(Object.assign({}, ...dicts));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const value = useMemo<I18nCtx>(() => {
    return {
      locale,
      setLocale: (l) => {
        // Always update UI immediately
        setLocaleState(l);

        // Best-effort persistence
        try {
          window.localStorage.setItem("locale", l);
        } catch (e) {
          console.warn("[i18n] localStorage setItem failed:", e);
        }
      },
      t: (key) => dict[key] ?? key,
      isLoading,
    };
  }, [locale, dict, isLoading]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n outside provider");

  const safeT = (key: string) => {
    const out = ctx.t(key);
    if (!out) return "";
    if (out === key) return "";
    if (/[a-z0-9_-]+\.[a-z0-9_.-]+/i.test(out) && out.length <= 48) return "";
    return out;
  };

  return { ...ctx, t: safeT };
}
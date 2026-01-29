"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  const res = await fetch(`/api/i18n/${page}/${locale}`, { cache: "no-store" });
  if (!res.ok) throw new Error(page);
  const json = await res.json();
  return json?.strings ?? {};
}

const PAGES = [
  "copy",
  "home",
  "about",
  "services",
  "portfolio",
  "contact",
];

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("locale") === "fr" ? "fr" : "en";
  });

  const [dict, setDict] = useState<Dict>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all(PAGES.map((p) => fetchDict(p, locale)))
      .then((results) => {
        setDict(Object.assign({}, ...results));
      })
      .catch((e) => {
        console.error("i18n load failed", e);
        setDict({});
      })
      .finally(() => setIsLoading(false));
  }, [locale]);

  const value = useMemo<I18nCtx>(() => {
    return {
      locale,
      setLocale: (l) => {
        setLocaleState(l);
        window.localStorage.setItem("locale", l);
      },
      t: (key) => dict[key] ?? key,
      isLoading,
    };
  }, [locale, dict, isLoading]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}
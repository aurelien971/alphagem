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
  setPage: (p: string | null) => void;
  t: (key: string) => string;
  isLoading: boolean;
};

const I18nContext = createContext<I18nCtx | null>(null);

async function fetchDict(page: string, locale: Locale): Promise<Dict> {
  const res = await fetch(`/api/i18n/${page}/${locale}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed ${page}/${locale}`);
  const json = await res.json();
  return json?.strings ?? {};
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("locale") === "fr" ? "fr" : "en";
  });

  const [page, setPage] = useState<string | null>(null);
  const [dict, setDict] = useState<Dict>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const requests = [
      fetchDict("copy", locale),
      fetchDict("home", locale),
    ];

    if (page) requests.push(fetchDict(page, locale));

    Promise.all(requests)
      .then((results) => {
        setDict(Object.assign({}, ...results));
      })
      .catch(() => setDict({}))
      .finally(() => setIsLoading(false));
  }, [locale, page]);

  const value = useMemo<I18nCtx>(() => {
    return {
      locale,
      setLocale: (l) => {
        setLocaleState(l);
        window.localStorage.setItem("locale", l);
      },
      setPage,
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
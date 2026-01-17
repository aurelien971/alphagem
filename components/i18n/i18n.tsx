"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

import { HOME_EN, HOME_FR } from "./pages/home";
import { ABOUT_EN, ABOUT_FR } from "./pages/about";
import { SERVICES_EN, SERVICES_FR } from "./pages/services";
import { PORTFOLIO_EN, PORTFOLIO_FR } from "./pages/portfolio";
import { CONTACT_EN, CONTACT_FR } from "./pages/contact";

export type Locale = "en" | "fr";
type Dict = Record<string, string>;

const COMMON_EN: Dict = {
  "nav.home": "HOME",
  "nav.about": "ABOUT",
  "nav.services": "SERVICES",
  "nav.portfolio": "PORTFOLIO",
  "nav.contact": "CONTACT",

  "nav.about.about": "About",
  "nav.about.figures": "Figures",
  "nav.about.team": "Team",
  "nav.about.values": "Values",

  "nav.lang.en": "EN",
  "nav.lang.fr": "FR",

  "theme.light": "Light",
  "theme.dark": "Dark",
  "theme.auto": "Auto",
};

const COMMON_FR: Dict = {
  "nav.home": "ACCUEIL",
  "nav.about": "À PROPOS",
  "nav.services": "SERVICES",
  "nav.portfolio": "PORTEFEUILLE",
  "nav.contact": "CONTACT",

  "nav.about.about": "À propos",
  "nav.about.figures": "Chiffres",
  "nav.about.team": "Équipe",
  "nav.about.values": "Valeurs",

  "nav.lang.en": "EN",
  "nav.lang.fr": "FR",

  "theme.light": "Clair",
  "theme.dark": "Sombre",
  "theme.auto": "Auto",
};

const PAGES_EN: Dict = {
  ...HOME_EN,
  ...ABOUT_EN,
  ...SERVICES_EN,
  ...PORTFOLIO_EN,
  ...CONTACT_EN,
};

const PAGES_FR: Dict = {
  ...HOME_FR,
  ...ABOUT_FR,
  ...SERVICES_FR,
  ...PORTFOLIO_FR,
  ...CONTACT_FR,
};

const DICTS: Record<Locale, Dict> = {
  en: { ...COMMON_EN, ...PAGES_EN },
  fr: { ...COMMON_FR, ...PAGES_FR },
};

type I18nCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("locale");
    return saved === "fr" ? "fr" : "en";
  });

  const value = useMemo<I18nCtx>(() => {
    const dict = DICTS[locale] ?? DICTS.en;

    return {
      locale,
      setLocale: (l) => {
        setLocaleState(l);
        try {
          window.localStorage.setItem("locale", l);
        } catch {}
        window.dispatchEvent(new Event("localechange"));
      },
      t: (key) => dict[key] ?? key,
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider />");
  return ctx;
}
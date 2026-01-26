import { ABOUT_EN, ABOUT_FR } from "../i18n/pages/about";
import { CONTACT_EN, CONTACT_FR } from "../i18n/pages/contact";
import { HOME_EN, HOME_FR } from "../i18n/pages/home";
import { PORTFOLIO_EN, PORTFOLIO_FR } from "../i18n/pages/portfolio";
import { SERVICES_EN, SERVICES_FR } from "../i18n/pages/services";

import { COPY_EN } from "../i18n/copy.en";
import { COPY_FR } from "../i18n/copy.fr";

export const PAGES = {
  about: { en: ABOUT_EN, fr: ABOUT_FR },
  contact: { en: CONTACT_EN, fr: CONTACT_FR },
  home: { en: HOME_EN, fr: HOME_FR },
  portfolio: { en: PORTFOLIO_EN, fr: PORTFOLIO_FR },
  services: { en: SERVICES_EN, fr: SERVICES_FR },
} as const;

// Optional: if you want global nav/footer in Firestore too,
// create a "copy" collection with docs "en" and "fr" and a "strings" map.
export const COPY = { en: COPY_EN, fr: COPY_FR } as const;
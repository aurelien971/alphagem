export type AboutSectionId = "about" | "figures" | "team" | "values";

export const ABOUT_SECTIONS: { id: AboutSectionId; labelKey: string }[] = [
  { id: "about", labelKey: "about.nav.about" },
  { id: "figures", labelKey: "about.nav.figures" },
  { id: "team", labelKey: "about.nav.team" },
  { id: "values", labelKey: "about.nav.values" },
];
export type ServicesSectionId = "overview" | "engineering" | "balance" | "securitization";

export const SERVICES_NAV: { id: ServicesSectionId; labelKey: string }[] = [
  { id: "overview", labelKey: "services.nav.overview" },
  { id: "engineering", labelKey: "services.nav.engineering" },
  { id: "balance", labelKey: "services.nav.balance" },
  { id: "securitization", labelKey: "services.nav.securitization" },
];

export type ServicesProofKey = { labelKey: string; valueKey: string };

export type ServicesSectionKeyed = {
  id: Exclude<ServicesSectionId, "overview">;
  eyebrowKey: string;
  titleKey: string;
  bodyKey: string;
  bulletKeys: string[];
  tagKeys: string[];
  proofKeys?: ServicesProofKey[];
};

export const SERVICES_SECTIONS: ServicesSectionKeyed[] = [
  {
    id: "engineering",
    eyebrowKey: "services.sections.engineering.eyebrow",
    titleKey: "services.sections.engineering.title",
    bodyKey: "services.sections.engineering.body",
    bulletKeys: [
      "services.sections.engineering.bullets.0",
      "services.sections.engineering.bullets.1",
      "services.sections.engineering.bullets.2",
      "services.sections.engineering.bullets.3",
    ],
    tagKeys: [
      "services.sections.engineering.tags.0",
      "services.sections.engineering.tags.1",
      "services.sections.engineering.tags.2",
      "services.sections.engineering.tags.3",
      "services.sections.engineering.tags.4",
    ],
    proofKeys: [
      {
        labelKey: "services.sections.engineering.proof.0.label",
        valueKey: "services.sections.engineering.proof.0.value",
      },
    ],
  },
  {
    id: "balance",
    eyebrowKey: "services.sections.balance.eyebrow",
    titleKey: "services.sections.balance.title",
    bodyKey: "services.sections.balance.body",
    bulletKeys: [
      "services.sections.balance.bullets.0",
      "services.sections.balance.bullets.1",
      "services.sections.balance.bullets.2",
      "services.sections.balance.bullets.3",
    ],
    tagKeys: [
      "services.sections.balance.tags.0",
      "services.sections.balance.tags.1",
      "services.sections.balance.tags.2",
      "services.sections.balance.tags.3",
      "services.sections.balance.tags.4",
    ],
    proofKeys: [
      {
        labelKey: "services.sections.balance.proof.0.label",
        valueKey: "services.sections.balance.proof.0.value",
      },
    ],
  },
  {
    id: "securitization",
    eyebrowKey: "services.sections.securitization.eyebrow",
    titleKey: "services.sections.securitization.title",
    bodyKey: "services.sections.securitization.body",
    bulletKeys: [
      "services.sections.securitization.bullets.0",
      "services.sections.securitization.bullets.1",
      "services.sections.securitization.bullets.2",
      "services.sections.securitization.bullets.3",
    ],
    tagKeys: [
      "services.sections.securitization.tags.0",
      "services.sections.securitization.tags.1",
      "services.sections.securitization.tags.2",
      "services.sections.securitization.tags.3",
      "services.sections.securitization.tags.4",
    ],
    proofKeys: [
      {
        labelKey: "services.sections.securitization.proof.0.label",
        valueKey: "services.sections.securitization.proof.0.value",
      },
      {
        labelKey: "services.sections.securitization.proof.1.label",
        valueKey: "services.sections.securitization.proof.1.value",
      },
    ],
  },
];

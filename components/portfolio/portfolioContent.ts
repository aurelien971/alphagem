// components/portfolio/portfolioContent.ts
export type Deal = {
  id: string;
  amountLabel: string;
  year: string;

  logoSrc: string;
  logoAlt: string;

  programKey: string;
  counterpartyKey: string;
  structureKey: string;
  highlightKey?: string;
};

export const DEALS: Deal[] = [
  {
    id: "senelec-waemu-2025",
    amountLabel: "120 000 000 000 FCFA",
    year: "2025",
    logoSrc: "/portfolio/senelec.png",
    logoAlt: "Senelec",
    programKey: "deals.senelec.program",
    counterpartyKey: "deals.senelec.counterparty",
    structureKey: "deals.senelec.structure",
  },
  {
    id: "keur-samba-nsia-ci-2025",
    amountLabel: "7 250 000 000 FCFA",
    year: "2025",
    logoSrc: "/portfolio/nsia.png",
    logoAlt: "NSIA Banque",
    programKey: "deals.nsia_ci_keur.program",
    counterpartyKey: "deals.nsia_ci_keur.counterparty",
    structureKey: "deals.nsia_ci_keur.structure",
  },
  {
    id: "keur-samba-orabank-2025",
    amountLabel: "5 400 000 000 FCFA",
    year: "2025",
    logoSrc: "/portfolio/oragroup.png",
    logoAlt: "Oragroup",
    programKey: "deals.orabank_keur.program",
    counterpartyKey: "deals.orabank_keur.counterparty",
    structureKey: "deals.orabank_keur.structure",
  },
  {
    id: "keur-samba-nsia-benin-2025",
    amountLabel: "52 000 000 000 FCFA",
    year: "2025",
    logoSrc: "/portfolio/nsia.png",
    logoAlt: "NSIA Banque",
    programKey: "deals.nsia_benin_keur.program",
    counterpartyKey: "deals.nsia_benin_keur.counterparty",
    structureKey: "deals.nsia_benin_keur.structure",
  },
  {
    id: "zaka-nsia-ci-2025",
    amountLabel: "10 000 000 000 FCFA",
    year: "2025",
    logoSrc: "/portfolio/nsia.png",
    logoAlt: "NSIA Banque",
    programKey: "deals.nsia_ci_zaka.program",
    counterpartyKey: "deals.nsia_ci_zaka.counterparty",
    structureKey: "deals.nsia_ci_zaka.structure",
  },
  {
    id: "idfc-study-2024",
    amountLabel: "STUDY",
    year: "2024",
    logoSrc: "/portfolio/idfc.png",
    logoAlt: "IDFC",
    programKey: "deals.idfc.program",
    counterpartyKey: "deals.idfc.counterparty",
    structureKey: "deals.idfc.structure",
  },
  {
    id: "boad-doli-p2-2024",
    amountLabel: "160 000 000 000 FCFA",
    year: "2024",
    logoSrc: "/portfolio/boad.png",
    logoAlt: "BOAD",
    programKey: "deals.boad_p2.program",
    counterpartyKey: "deals.boad_p2.counterparty",
    structureKey: "deals.boad_p2.structure",
    highlightKey: "deals.boad_p2.highlight",
  },
  {
    id: "boad-doli-p-2023",
    amountLabel: "148 500 000 000 FCFA",
    year: "2023",
    logoSrc: "/portfolio/boad.png",
    logoAlt: "BOAD",
    programKey: "deals.boad_p.program",
    counterpartyKey: "deals.boad_p.counterparty",
    structureKey: "deals.boad_p.structure",
    highlightKey: "deals.boad_p.highlight",
  },
];
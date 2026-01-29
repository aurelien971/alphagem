import admin from "firebase-admin";
import { readFile } from "node:fs/promises";
import path from "node:path";
import fs from "node:fs";

const SERVICE_ACCOUNT_PATH =
  "/Users/aureliennicolle/Desktop/alphagem-site/alphagem-b076d-firebase-adminsdk-fbsvc-b2e022129b.json";

const BUCKET = "alphagem-b076d.firebasestorage.app";
const PUBLIC_DIR = path.resolve("public/portfolio");

type DealSeed = {
  id: string;
  amountLabel: string;
  year: string;
  logoFile: string;
  logoAlt: string;
  tombstoneFile?: string;

  program: { en: string; fr: string };
  counterparty: { en: string; fr: string };
  structure: { en: string; fr: string };
  highlight?: { en: string; fr: string };
};



const DEALS: DealSeed[] = [
 

  {
    id: "keur-samba-nsia-ci-2025",
    amountLabel: "7 250 000 000 FCFA",
    year: "2025",
    logoFile: "nsia.png",
    logoAlt: "NSIA Banque",
    tombstoneFile: "",
    program: {
      en: "Keur Samba program",
      fr: "Programme Keur Samba",
    },
    counterparty: {
      en: "NSIA Banque Côte d’Ivoire",
      fr: "NSIA Banque Côte d’Ivoire",
    },
    structure: {
      en: "SME receivables securitization",
      fr: "Titrisation de créances PME",
    },
  },

  {
    id: "keur-samba-orabank-2025",
    amountLabel: "5 400 000 000 FCFA",
    year: "2025",
    logoFile: "oragroup.png",
    logoAlt: "Oragroup",
    tombstoneFile: "keur-samba-orabank-2025.png",
    program: {
      en: "Keur Samba program",
      fr: "Programme Keur Samba",
    },
    counterparty: {
      en: "Orabank",
      fr: "Orabank",
    },
    structure: {
      en: "SME loan securitization",
      fr: "Titrisation de prêts PME",
    },
  },

  {
    id: "keur-samba-nsia-benin-2025",
    amountLabel: "52 000 000 000 FCFA",
    year: "2025",
    logoFile: "nsia.png",
    logoAlt: "NSIA Banque",
    tombstoneFile: "keur-samba-nsia-benin-2025.png",
    program: {
      en: "Keur Samba program",
      fr: "Programme Keur Samba",
    },
    counterparty: {
      en: "NSIA Banque Benin",
      fr: "NSIA Banque Bénin",
    },
    structure: {
      en: "Bank loan securitization",
      fr: "Titrisation de crédits bancaires",
    },
  },

  {
    id: "zaka-nsia-ci-2025-1",
    amountLabel: "10 000 000 000 FCFA",
    year: "2025",
    logoFile: "nsia.png",
    logoAlt: "NSIA Banque",
    tombstoneFile: "zaka-nsia-ci-2025-1.png",
    program: {
      en: "Zaka program",
      fr: "Programme Zaka",
    },
    counterparty: {
      en: "NSIA Banque Côte d’Ivoire",
      fr: "NSIA Banque Côte d’Ivoire",
    },
    structure: {
      en: "Short-term SME securitization",
      fr: "Titrisation court terme PME",
    },
  },

  {
    id: "idfc-study-2024",
    amountLabel: "STUDY",
    year: "2024",
    logoFile: "idfc.png",
    logoAlt: "IDFC",
    tombstoneFile: "",
    program: {
      en: "Market development study",
      fr: "Étude de développement de marché",
    },
    counterparty: {
      en: "International Development Finance Club",
      fr: "International Development Finance Club",
    },
    structure: {
      en: "Advisory and structuring study",
      fr: "Étude de conseil et structuration",
    },
  },

  {
    id: "boad-doli-p2-2024",
    amountLabel: "160 000 000 000 FCFA",
    year: "2024",
    logoFile: "boad.png",
    logoAlt: "BOAD",
    tombstoneFile: "boad-doli-p2-2024.png",
    program: {
      en: "DOLI-P II program",
      fr: "Programme DOLI-P II",
    },
    counterparty: {
      en: "West African Development Bank",
      fr: "Banque Ouest Africaine de Développement",
    },
    structure: {
      en: "Multi-originator securitization",
      fr: "Titrisation multi-originateurs",
    },
    highlight: {
      en: "First mezzanine tranche securitization in UEMOA",
      fr: "Première tranche mezzanine titrisée en UEMOA",
    },
  },

  {
    id: "boad-doli-p-2023",
    amountLabel: "148 500 000 000 FCFA",
    year: "2023",
    logoFile: "boad.png",
    logoAlt: "BOAD",
    tombstoneFile: "boad-doli-p-2023.png",
    program: {
      en: "DOLI-P program",
      fr: "Programme DOLI-P",
    },
    counterparty: {
      en: "West African Development Bank",
      fr: "Banque Ouest Africaine de Développement",
    },
    structure: {
      en: "Infrastructure receivables securitization",
      fr: "Titrisation de créances d’infrastructures",
    },
    highlight: {
      en: "Landmark regional transaction",
      fr: "Transaction régionale de référence",
    },
  },
];

async function initAdmin() {
  const raw = await readFile(SERVICE_ACCOUNT_PATH, "utf8");
  const serviceAccount = JSON.parse(raw);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: BUCKET,
    });
  }
}

async function uploadIfExists(localPath: string, dest: string): Promise<string> {
  if (!fs.existsSync(localPath)) return "";

  const bucket = admin.storage().bucket();
  await bucket.upload(localPath, {
    destination: dest,
    public: true,
    metadata: { cacheControl: "public,max-age=31536000" },
  });

  return `https://storage.googleapis.com/${bucket.name}/${dest}`;
}

async function main() {
  await initAdmin();
  const db = admin.firestore();

  console.log("Starting deals migration…");

  for (const deal of DEALS) {
    try {
      console.log(`→ ${deal.id}`);

      const logoPath = path.join(PUBLIC_DIR, deal.logoFile);
      const tombstonePath = deal.tombstoneFile
        ? path.join(PUBLIC_DIR, "tombstones", deal.tombstoneFile)
        : "";

      const logoUrl = await uploadIfExists(
        logoPath,
        `deals/logos/${deal.logoFile}`
      );

      const tombstoneUrl = tombstonePath
        ? await uploadIfExists(
            tombstonePath,
            `deals/tombstones/${deal.tombstoneFile}`
          )
        : "";

      await db.collection("deals").doc(deal.id).set({
        amountLabel: deal.amountLabel,
        year: deal.year,
        logoUrl,
        logoAlt: deal.logoAlt,
        tombstoneUrl: tombstoneUrl ?? "",

        program: deal.program,
        counterparty: deal.counterparty,
        structure: deal.structure,
        highlight: deal.highlight ?? null,

        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`✓ Uploaded ${deal.id}`);
    } catch (e: any) {
      console.error(`✗ Skipped ${deal.id}:`, e.message);
    }
  }

  console.log("Done.");
}

main().catch(console.error);
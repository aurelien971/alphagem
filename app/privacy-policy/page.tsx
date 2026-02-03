"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/i18n";

type Locale = "en" | "fr";

function PrivacyPolicyEN() {
  return (
    <>
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>

      <p className="mt-6 text-sm leading-7 opacity-80">
        Alphagem Advisors respects your privacy. This website is intended to present information
        about our firm and its activities.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Information Collection</h2>
      <p className="mt-4 text-sm leading-7 opacity-80">
        We do not knowingly collect personal information through this website. If you contact us by
        email, any information you provide is used solely to respond to your inquiry.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Use of Information</h2>
      <p className="mt-4 text-sm leading-7 opacity-80">
        Any information you voluntarily provide is used only for communication purposes and is not
        shared with third parties.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Cookies</h2>
      <p className="mt-4 text-sm leading-7 opacity-80">
        This website does not use tracking cookies or analytics that identify individual users.
      </p>

      <h2 className="mt-10 text-xl font-semibold">External Links</h2>
      <p className="mt-4 text-sm leading-7 opacity-80">
        This website may contain links to third party websites. We are not responsible for the
        content or privacy practices of those sites.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Contact</h2>
      <p className="mt-4 text-sm leading-7 opacity-80">
        If you have any questions about this privacy policy, you may contact us at{" "}
        <a
          href="mailto:contact@alphagem.net"
          className="underline opacity-90 hover:opacity-100"
        >
          contact@alphagem.net
        </a>
        .
      </p>
    </>
  );
}

function PrivacyPolicyFR() {
  return (
    <>
      <h1 className="text-3xl font-semibold">Politique de confidentialité</h1>

      <p className="mt-6 text-sm leading-7 opacity-80">
        Alphagem Advisors attache une grande importance au respect de votre vie privée. Ce site
        internet a pour seul objectif de présenter notre société et ses activités.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Collecte des informations</h2>
      <p className="mt-4 text-sm leading-7 opacity-80">
        Nous ne collectons pas volontairement de données personnelles via ce site. Si vous nous
        contactez par email, les informations que vous fournissez sont utilisées uniquement pour
        répondre à votre demande.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Utilisation des informations</h2>
      <p className="mt-4 text-sm leading-7 opacity-80">
        Les informations transmises volontairement sont utilisées exclusivement à des fins de
        communication et ne sont en aucun cas partagées avec des tiers.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Cookies</h2>
      <p className="mt-4 text-sm leading-7 opacity-80">
        Ce site n’utilise pas de cookies de suivi ni d’outils d’analyse permettant d’identifier les
        visiteurs.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Liens externes</h2>
      <p className="mt-4 text-sm leading-7 opacity-80">
        Ce site peut contenir des liens vers des sites internet tiers. Alphagem Advisors n’est pas
        responsable du contenu ni des pratiques de confidentialité de ces sites.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Contact</h2>
      <p className="mt-4 text-sm leading-7 opacity-80">
        Pour toute question relative à cette politique de confidentialité, vous pouvez nous
        contacter à l’adresse suivante{" "}
        <a
          href="mailto:contact@alphagem.net"
          className="underline opacity-90 hover:opacity-100"
        >
          contact@alphagem.net
        </a>
        .
      </p>
    </>
  );
}

export default function PrivacyPolicyPage() {
  const i18n = useI18n() as unknown as { locale?: string; setLocale?: (l: Locale) => void };

  const locale = (i18n?.locale === "fr" ? "fr" : "en") as Locale;
  const setLocale = i18n?.setLocale;

  const pillWrap =
    "border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_4%,transparent)]";
  const pillIdle = "opacity-70 hover:opacity-100";
  const pillActive =
    "bg-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] opacity-100";

  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <div className="mb-10 flex items-center justify-between gap-4">
        <Link href="/" className="text-sm opacity-70 hover:opacity-100">
          ← Back
        </Link>

    
      </div>

      {locale === "fr" ? <PrivacyPolicyFR /> : <PrivacyPolicyEN />}
    </main>
  );
}
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/i18n";

type AssetsDoc = {
  hariUrl?: string;
  mattiUrl?: string;
  brunoUrl?: string;
  guillaumeUrl?: string;
};

function TeamCard({
  name,
  role,
  image,
  bio,
  linkedin,
}: {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
}) {
  return (
    <div className="group relative h-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 transition hover:bg-[var(--surface2)]">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative h-28 w-28 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface2)]">
            <Image src={image} alt={name} fill className="object-cover" sizes="112px" />
          </div>

          <div>
            <p className="text-lg font-semibold leading-tight text-[var(--foreground)]">{name}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{role}</p>
          </div>
        </div>

        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${name} on LinkedIn`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] transition hover:bg-[var(--surface)]"
        >
          <span className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image src="/linkedin.jpg" alt="" fill sizes="36px" className="object-cover" />
          </span>
        </a>
      </div>

      {/* <div className="mt-7 h-px w-full bg-[var(--border)]" /> */}

      <p className="mt-6 text-sm leading-7 text-[var(--muted)]">{bio}</p>
    </div>
  );
}

export default function TeamSection() {
  const { t } = useI18n();
  const [assets, setAssets] = useState<AssetsDoc | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/assets", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!cancelled) setAssets(json as AssetsDoc);
      })
      .catch(() => {
        if (!cancelled) setAssets(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const team = [
    {
      name: t("about.team.members.0.name"),
      role: t("about.team.members.0.role"),
      bio: t("about.team.members.0.bio"),
      image: assets?.hariUrl || "/team/hari-krishnan2.jpg",
      linkedin: "https://www.linkedin.com/in/hari-krishnan-alphagem/",
    },
    {
      name: t("about.team.members.1.name"),
      role: t("about.team.members.1.role"),
      bio: t("about.team.members.1.bio"),
      image: assets?.mattiUrl || "/team/matti-liedes2.jpg",
      linkedin: "https://www.linkedin.com/in/matti-liedes-alphagem/",
    },
    {
      name: t("about.team.members.2.name"),
      role: t("about.team.members.2.role"),
      bio: t("about.team.members.2.bio"),
      image: assets?.brunoUrl || "/team/bruno-renard2.jpg",
      linkedin: "https://www.linkedin.com/in/bruno-renard-alphagem/",
    },
    {
      name: t("about.team.members.3.name"),
      role: t("about.team.members.3.role"),
      bio: t("about.team.members.3.bio"),
      image: assets?.guillaumeUrl || "/team/guillaume-nicolle2.jpg",
      linkedin: "https://www.linkedin.com/in/guillaume-nicolle-4aa57113/",
    },
  ];

  const teamBody = t("about.team.body");

  return (
    <section id="team" className="scroll-mt-28">
      <p className="text-xs tracking-[0.28em] text-[var(--muted2)] uppercase">
        {t("about.team.kicker")}
      </p>

      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {t("about.team.title")}
      </h2>

      {teamBody ? (
       <div className="mt-4 max-w-none">
  <p className="max-w-full text-sm leading-7 text-[var(--muted)] md:text-base md:leading-8">
    {teamBody}
  </p>
</div>
      ) : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
        {team.map((m) => (
          <TeamCard key={m.name} {...m} />
        ))}
      </div>
    </section>
  );
}
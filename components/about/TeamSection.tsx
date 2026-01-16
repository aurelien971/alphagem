"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/i18n";

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
          <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface2)]">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>

          <div>
            <p className="text-lg font-semibold leading-tight text-[var(--foreground)]">
              {name}
            </p>
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

      <div className="mt-7 h-px w-full bg-[var(--border)]" />

      <p className="mt-6 text-sm leading-7 text-[var(--muted)]">{bio}</p>
    </div>
  );
}

export default function TeamSection() {
  const { t } = useI18n();

  const team = [
    {
      name: t("about.team.members.0.name"),
      role: t("about.team.members.0.role"),
      bio: t("about.team.members.0.bio"),
      image: "/team/hari-krishnan1.jpg",
      linkedin: "https://www.linkedin.com/in/hari-krishnan-alphagem/",
    },
    {
      name: t("about.team.members.1.name"),
      role: t("about.team.members.1.role"),
      bio: t("about.team.members.1.bio"),
      image: "/team/matti-liedes1.jpg",
      linkedin: "https://www.linkedin.com/in/matti-liedes-alphagem/",
    },
    {
      name: t("about.team.members.2.name"),
      role: t("about.team.members.2.role"),
      bio: t("about.team.members.2.bio"),
      image: "/team/bruno-renard1.jpg",
      linkedin: "https://www.linkedin.com/in/bruno-renard-alphagem/",
    },
    {
      name: t("about.team.members.3.name"),
      role: t("about.team.members.3.role"),
      bio: t("about.team.members.3.bio"),
      image: "/team/guillaume-nicolle1.jpg",
      linkedin: "https://www.linkedin.com/in/guillaume-nicolle-4aa57113/",
    },
  ];

  return (
    <section id="team" className="scroll-mt-28">
      <p className="text-xs tracking-[0.28em] text-[var(--muted2)] uppercase">
        {t("about.team.kicker")}
      </p>

      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {t("about.team.title")}
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
        {team.map((m) => (
          <TeamCard key={m.name} {...m} />
        ))}
      </div>
    </section>
  );
}
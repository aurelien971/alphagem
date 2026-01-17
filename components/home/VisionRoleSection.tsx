"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/i18n";

function FrostedPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full rounded-[11px] border border-white/12 bg-white/8 p-6 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.32)] ring-1 ring-inset ring-white/10 md:p-9">
      {children}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HexIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function VisionRoleSection() {
  const { t } = useI18n();

  const roleItems = [
    t("home.role.items.0"),
    t("home.role.items.1"),
    t("home.role.items.2"),
    t("home.role.items.3"),
  ];

  const commitments = [
    {
      title: t("home.commitment.items.0.title"),
      label: t("home.commitment.items.0.label"),
      body: t("home.commitment.items.0.body"),
    },
    {
      title: t("home.commitment.items.1.title"),
      label: t("home.commitment.items.1.label"),
      body: t("home.commitment.items.1.body"),
    },
    {
      title: t("home.commitment.items.2.title"),
      label: t("home.commitment.items.2.label"),
      body: t("home.commitment.items.2.body"),
    },
  ];

  return (
    <section id="vision" className="relative w-full overflow-hidden">
      <div className="relative min-h-[88vh] w-full">
        <Image src="/hero-vision2.jpg" alt="" fill className="object-cover" />
<div className="absolute inset-0 bg-black/15" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-[1400px] items-center px-4 py-14 md:py-20">
          <div className="grid w-full items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <FrostedPanel>
              <div className="[text-shadow:0_2px_14px_rgba(0,0,0,0.18)]">
                <p className="text-[11px] tracking-[0.22em] text-white/75 md:text-xs">
                  {t("home.vision.kicker")}
                </p>

                <h2 className="mt-3 text-2xl font-semibold leading-[1.08] tracking-tight text-white md:text-3xl lg:text-4xl">
                  {t("home.vision.title")}
                </h2>

                <div className="mt-5 h-px w-12 bg-white/30" />

                <p className="mt-5 max-w-[62ch] text-sm leading-7 text-white/80 md:text-base md:leading-8">
                  {t("home.vision.body")}
                </p>

                <div className="mt-9">
                  <p className="text-[11px] tracking-[0.22em] text-white/70 md:text-xs">
                    {t("home.role.kicker")}
                  </p>

                  <ul className="mt-4 space-y-3 text-sm leading-7 text-white/85 md:text-base md:leading-8">
                    {roleItems.map((txt) => (
                      <li key={txt} className="flex gap-3">
                        <span className="mt-[0.2rem] inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white/90">
                          <CheckIcon />
                        </span>
                        <span className="min-w-0">{txt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FrostedPanel>

            <FrostedPanel>
              <div className="[text-shadow:0_2px_14px_rgba(0,0,0,0.18)]">
                <p className="text-[11px] tracking-[0.22em] text-white/75 md:text-xs">
                  {t("home.commitment.kicker")}
                </p>

                <h2 className="mt-3 text-2xl font-semibold leading-[1.08] tracking-tight text-white md:text-3xl lg:text-4xl">
                  {t("home.commitment.title")}
                </h2>

                <div className="mt-5 h-px w-12 bg-white/30" />

                <p className="mt-5 max-w-[62ch] text-sm leading-7 text-white/80 md:text-base md:leading-8">
                  {t("home.commitment.body")}
                </p>

                <div className="mt-8 divide-y divide-white/12">
                  {commitments.map((c) => (
                    <div key={c.label} className="py-5 first:pt-0">
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-6 text-white md:text-base">
                            {c.title}
                          </p>
                          <p className="mt-1 text-[11px] tracking-[0.2em] text-white/65 md:text-xs">
                            {c.label}
                          </p>
                        </div>

                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white/80">
                          <HexIcon />
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-white/80 md:text-base md:leading-8">
                        {c.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FrostedPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
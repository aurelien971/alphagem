"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n/i18n";

function FrostedPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full rounded-[28px] border border-white/12 bg-white/10 p-7 backdrop-blur-2xl shadow-[0_18px_70px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/10 md:p-10">
      {children}
    </div>
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
      <div className="relative min-h-[92vh] w-full">
        <Image src="/hero-6.jpg" alt="" fill className="object-cover" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] items-center px-4 py-20 md:py-24">
          <div className="grid w-full items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <FrostedPanel>
              <div className="[text-shadow:0_2px_14px_rgba(0,0,0,0.22)]">
                <p className="text-xs tracking-[0.22em] text-white/80">
                  {t("home.vision.kicker")}
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-wide leading-tight text-white md:text-3xl lg:text-4xl">
                  {t("home.vision.title")}
                </h2>

                <div className="mt-6 h-px w-14 bg-white/35" />

                <p className="mt-7 max-w-[60ch] text-sm leading-8 text-white/85 md:text-base">
                  {t("home.vision.body")}
                </p>

                <div className="mt-10">
                  <p className="text-xs tracking-[0.22em] text-white/75">
                    {t("home.role.kicker")}
                  </p>

                  <ul className="mt-5 space-y-4 text-sm leading-8 text-white/88 md:text-base">
                    {roleItems.map((txt) => (
                      <li key={txt} className="flex gap-3">
                        <span className="mt-[0.55rem] inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M20 6L9 17l-5-5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span>{txt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FrostedPanel>

            <FrostedPanel>
              <div className="[text-shadow:0_2px_14px_rgba(0,0,0,0.22)]">
                <p className="text-xs tracking-[0.22em] text-white/80">
                  {t("home.commitment.kicker")}
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-wide leading-tight text-white md:text-3xl lg:text-4xl">
                  {t("home.commitment.title")}
                </h2>

                <div className="mt-6 h-px w-14 bg-white/35" />

                <p className="mt-7 max-w-[60ch] text-sm leading-8 text-white/85 md:text-base">
                  {t("home.commitment.body")}
                </p>

                <div className="mt-10 divide-y divide-white/12">
                  {commitments.map((c) => (
                    <div key={c.label} className="py-6">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <p className="font-semibold text-white">{c.title}</p>
                          <p className="mt-1 text-xs tracking-[0.18em] text-white/70">
                            {c.label}
                          </p>
                        </div>

                        <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white/85">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M12 2l8.5 5v10L12 22 3.5 17V7L12 2z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                            />
                          </svg>
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-8 text-white/85 md:text-base">
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
"use client";

import React from "react";
import { useI18n } from "@/components/i18n/i18n";

type Props = {
  id: string;
  eyebrowKey: string;
  titleKey: string;
  bodyKey: string;
  bulletKeys: string[];
  tagKeys: string[];
  proofKeys?: { labelKey: string; valueKey: string }[];
};

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_4%,transparent)] px-3 py-1 text-xs tracking-wide opacity-70">
      {children}
    </span>
  );
}

export default function ServicesSection({
  id,
  eyebrowKey,
  titleKey,
  bodyKey,
  bulletKeys,
  tagKeys,
  proofKeys,
}: Props) {
  const { t } = useI18n();

  return (
    <section id={id} className="scroll-mt-20">
      <div className="border-t border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] pt-10">
        <p className="text-xs tracking-[0.26em] opacity-60">{t(eyebrowKey)}</p>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <h3 className="text-2xl font-semibold leading-tight md:text-4xl">
              {t(titleKey)}
            </h3>

            <p className="mt-6 text-sm leading-7 opacity-75 md:text-base md:leading-8">
              {t(bodyKey)}
            </p>

            <div className="mt-8">
              <ul className="space-y-4 text-sm leading-7 opacity-80 md:text-base md:leading-8">
                {bulletKeys.map((k, index) => (
                  <li key={k} className={index >= 3 ? "" : "flex gap-3"}>
                    {index < 3 && (
                      <span className="mt-[0.55rem] inline-flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground)] opacity-60" />
                      </span>
                    )}
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {tagKeys.map((k) => (
                <Tag key={k}>{t(k)}</Tag>
              ))}
            </div>
          </div>

          <div className="lg:pt-1">
            <div className="rounded-3xl border border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_4%,transparent)] p-7">
              <p className="text-xs tracking-[0.26em] opacity-60">
                {t("services.focusTitle")}
              </p>

              <div className="mt-6 space-y-4">
                {(proofKeys ?? []).map((p) => (
                  <div
                    key={p.labelKey}
                    className="border-t border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] pt-4 first:border-t-0 first:pt-0"
                  >
                    <div className="text-sm opacity-60">{t(p.labelKey)}</div>
                    <div className="mt-1 text-base font-semibold">
                      {t(p.valueKey)}
                    </div>
                  </div>
                ))}

                {!proofKeys?.length && (
                  <div className="border-t border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] pt-4">
                    <div className="text-sm opacity-60">
                      {t("services.approachLabel")}
                    </div>
                    <div className="mt-1 text-base font-semibold">
                      {t("services.approachValue")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import { ABOUT_SECTIONS, type AboutSectionId } from "./sections";
import { useI18n } from "@/components/i18n/i18n";

export default function SideSectionNav() {
  const { t } = useI18n();
  const ids = useMemo(() => ABOUT_SECTIONS.map((s) => s.id), []);
  const [active, setActive] = useState<AboutSectionId>("about");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (best?.target?.id) setActive(best.target.id as AboutSectionId);
      },
      { threshold: [0.15, 0.25, 0.35], rootMargin: "-20% 0px -55% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return (
    <nav aria-label="About sections" className="select-none">
      <ul className="space-y-3">
        {ABOUT_SECTIONS.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={[
                  "block text-sm tracking-[0.26em] uppercase transition-opacity duration-200",
                  isActive
                    ? "opacity-100 text-[var(--foreground)]"
                    : "opacity-50 text-[var(--foreground)] hover:opacity-80",
                ].join(" ")}
              >
                {t(s.labelKey)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
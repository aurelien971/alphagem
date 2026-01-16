"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/i18n";
import { SERVICES_NAV, type ServicesSectionId } from "@/components/services/servicesContent";

export default function ServicesSideNav() {
  const ids = useMemo(() => SERVICES_NAV.map((n) => n.id), []);
  const [active, setActive] = useState<ServicesSectionId>("overview");
  const { t } = useI18n();

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

        if (best?.target?.id) setActive(best.target.id as ServicesSectionId);
      },
      { threshold: [0.15, 0.25, 0.35], rootMargin: "-20% 0px -55% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return (
    <nav aria-label="Services sections" className="select-none">
      <ul className="space-y-3">
        {SERVICES_NAV.map((n) => {
          const isActive = n.id === active;
          return (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={[
                  "block text-sm tracking-[0.26em] uppercase transition-opacity duration-200",
                  isActive
                    ? "opacity-100 text-[var(--foreground)]"
                    : "opacity-55 text-[var(--foreground)] hover:opacity-80",
                ].join(" ")}
              >
                {t(n.labelKey)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import React from "react";
import { useI18n } from "@/components/i18n/i18n";

type ParsedValue = {
  target: number;
  prefix: string;
  suffix: string;
  decimals: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

// Handles: "1,200", "1200+", "€12k", "12.5%", "1.2M", "£3.4B", etc.
function parseFigureValue(raw: string): ParsedValue {
  const s = (raw ?? "").trim();

  // Pull out first numeric chunk (with commas/decimals)
  const numMatch = s.match(/-?\d[\d,]*(?:\.\d+)?/);
  if (!numMatch) return { target: 0, prefix: "", suffix: s, decimals: 0 };

  const numStr = numMatch[0];
  const startIdx = s.indexOf(numStr);
  const prefix = s.slice(0, startIdx);
  let suffix = s.slice(startIdx + numStr.length);

  const hasK = /k/i.test(suffix);
  const hasM = /m/i.test(suffix);
  const hasB = /b/i.test(suffix);

  suffix = suffix.replace(/\s*/g, ""); // tighten suffix spacing

  const decimals = (numStr.split(".")[1]?.length ?? 0);

  let base = Number(numStr.replace(/,/g, ""));
  if (!Number.isFinite(base)) base = 0;

  let multiplier = 1;
  if (hasK) multiplier = 1_000;
  if (hasM) multiplier = 1_000_000;
  if (hasB) multiplier = 1_000_000_000;

  return {
    target: base * multiplier,
    prefix,
    suffix,
    decimals: clamp(decimals, 0, 3),
  };
}

function formatNumber(n: number, decimals: number) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

function useInViewOnce<T extends Element>(options?: IntersectionObserverInit) {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current || inView) return;

    const el = ref.current;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, options]);

  return { ref, inView };
}

function unitLabelFromRawSuffix(suffix: string) {
  const suf = suffix.toLowerCase();

  // Keep the original suffix text so you preserve " million" vs "M" vs "m"
  // We just need to detect what scale it implies.
  if (/\bbillion\b/.test(suf) || /\bbn\b/.test(suf) || /\bb\b/.test(suf)) return { scale: 1_000_000_000 };
  if (/\bmillion\b/.test(suf) || /\bmn\b/.test(suf) || /\bm\b/.test(suf)) return { scale: 1_000_000 };
  if (/\bthousand\b/.test(suf) || /\bk\b/.test(suf)) return { scale: 1_000 };

  return { scale: 1 };
}

function AnimatedFigure({
  raw,
  durationMs = 3000,
  className,
}: {
  raw: string;
  durationMs?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.35 });

  const parsed = React.useMemo(() => parseFigureValue(raw), [raw]);

  // Decide whether raw is already in "millions" (has M/million)
  // If not, assume parsed.target is the full number and convert to millions.
  const totalMillions = React.useMemo(() => {
    const hasMillionUnit =
      /\bmillion\b/i.test(parsed.suffix) || /\bm\b/i.test(parsed.suffix);

    if (hasMillionUnit) {
      // "$873 million" or "873M" -> 873
      return Math.max(0, Math.floor(parsed.target / 1_000_000));
    }

    // "873,000,000" -> 873
    return Math.max(0, Math.floor(parsed.target / 1_000_000));
  }, [parsed.target, parsed.suffix]);

  const [currentMillions, setCurrentMillions] = React.useState(1);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!inView) return;

    if (totalMillions <= 1) {
      setCurrentMillions(Math.max(1, totalMillions));
      setDone(true);
      return;
    }

    setDone(false);
    setCurrentMillions(1);

    const steps = totalMillions - 1; // starting at 1
    const stepDuration = durationMs / steps;

    let current = 1;
    let lastTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      while (now - lastTime >= stepDuration && current < totalMillions) {
        current += 1;
        lastTime += stepDuration;
      }

      setCurrentMillions(current);

      if (current < totalMillions) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, durationMs, totalMillions]);

  // Render in a stable "millions" format during animation
  // Keep prefix, force a readable " million" suffix while animating.
const animatedText = `${parsed.prefix}${formatNumber(currentMillions * 1_000_000, 0)}`;

  // If you prefer the exact original formatting at the end, keep this:
  const text = done ? raw : animatedText;

  return (
    <div
      ref={ref}
      className={[
        "transition-transform duration-500 will-change-transform",
        done ? "scale-100" : "scale-[1.03]",
        className ?? "",
      ].join(" ")}
    >
      {text}
    </div>
  );
}



export default function FiguresSection() {
  const { t } = useI18n();

  const figures = [
    { value: t("about.figures.items.0.value"), label: t("about.figures.items.0.label") },
    { value: t("about.figures.items.1.value"), label: t("about.figures.items.1.label") },
    { value: t("about.figures.items.2.value"), label: t("about.figures.items.2.label") },
  ];

  return (
    <section id="figures" className="scroll-mt-28">
      <p className="text-xs tracking-[0.28em] text-[var(--muted2)] uppercase">
        {t("about.figures.kicker")}
      </p>

      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {t("about.figures.title")}
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {figures.map((f) => (
          <div
            key={f.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7"
          >
            <AnimatedFigure
              raw={f.value}
              durationMs={3000}
              className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl"
            />
            <div className="mt-3 text-sm text-[var(--muted)]">{f.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-[var(--muted)]">{t("about.figures.footnote")}</div>
    </section>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type AssetsDoc = {
  wordmarkLight?: string;
  wordmarkDark?: string;
};

function getEffectiveDark() {
  if (typeof document === "undefined" || typeof window === "undefined") return true;

  const html = document.documentElement;
  if (html.classList.contains("dark")) return true;
  if (html.classList.contains("light")) return false;

  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? true;
}

export default function Footer() {
  const [isDarkEffective, setIsDarkEffective] = useState(true);
  const [wordmark, setWordmark] = useState<{ light?: string; dark?: string }>({});

  useEffect(() => {
    const refresh = () => setIsDarkEffective(getEffectiveDark());

    refresh();
    window.addEventListener("themechange", refresh);

    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    mql?.addEventListener?.("change", refresh);

    return () => {
      window.removeEventListener("themechange", refresh);
      mql?.removeEventListener?.("change", refresh);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/assets", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (cancelled) return;
        const data = (json ?? {}) as AssetsDoc;

        setWordmark({
          light: typeof data.wordmarkLight === "string" ? data.wordmarkLight : undefined,
          dark: typeof data.wordmarkDark === "string" ? data.wordmarkDark : undefined,
        });
      })
      .catch(() => {
        if (!cancelled) setWordmark({});
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const logoSrc = useMemo(() => {
    const fallback = isDarkEffective ? "/logowhite.png" : "/wordmark4.png";
    const remote = isDarkEffective ? wordmark.dark : wordmark.light;
    return remote || fallback;
  }, [isDarkEffective, wordmark.dark, wordmark.light]);

  return (
    <footer className="border-t border-[color:color-mix(in_oklab,var(--foreground)_12%,transparent)] bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          <div className="flex flex-col gap-4">
            <Link
              href="/contact"
              className="text-xs tracking-[0.26em] opacity-60 transition-opacity hover:opacity-100"
            >
              CONTACT
            </Link>

            <a
              href="mailto:contact@alphagem.net"
              className="text-sm font-medium opacity-85 transition-opacity hover:opacity-100"
            >
              contact@alphagem.net
            </a>
          </div>

          <div className="md:text-center">
            <Link href="/" className="inline-flex items-center justify-center">
              <Image
                src={logoSrc}
                alt="Alphagem"
                width={120}
                height={28}
                className="h-6 w-auto shrink-0 opacity-90"
              />
            </Link>

            <div className="mt-5 text-xs opacity-55">© Copyright 2026 Alphagem Advisors</div>
          </div>

          <div className="md:text-right">
            <p className="text-xs tracking-[0.26em] opacity-60">LINKS</p>

            <div className="mt-4 flex flex-col gap-2 md:items-end">
              <Link
                href="/privacy-policy"
                className="text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
              >
                Privacy Policy
              </Link>

              <a
                href="https://www.linkedin.com/company/alphagem/about/?viewAsMember=true"
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-[color:color-mix(in_oklab,var(--foreground)_10%,transparent)]" />
      </div>
    </footer>
  );
}
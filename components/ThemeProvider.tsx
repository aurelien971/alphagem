"use client";

import { useEffect } from "react";

type Mode = "light" | "dark" | "system";

declare global {
  interface Window {
    __setThemeMode?: (m: Mode) => void;
  }
}

function systemPrefersDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

function apply(mode: Mode) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");

  if (mode === "light") root.classList.add("light");
  if (mode === "dark") root.classList.add("dark");

  // mode === "system" means no explicit class, CSS @media handles it
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const init = () => {
      let saved: Mode = "system";
      try {
        saved = (localStorage.getItem("theme-mode") as Mode | null) ?? "system";
      } catch {}
      apply(saved);
      window.dispatchEvent(new Event("themechange"));
    };

    const setThemeMode = (m: Mode) => {
      try {
        localStorage.setItem("theme-mode", m);
      } catch {}
      apply(m);
      window.dispatchEvent(new Event("themechange"));
    };

    window.__setThemeMode = setThemeMode;

    init();

    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      let saved: Mode = "system";
      try {
        saved = (localStorage.getItem("theme-mode") as Mode | null) ?? "system";
      } catch {}
      if (saved === "system") {
        apply("system");
        window.dispatchEvent(new Event("themechange"));
      }
    };

    mq?.addEventListener?.("change", onSystemChange);

    return () => {
      mq?.removeEventListener?.("change", onSystemChange);
      delete window.__setThemeMode;
    };
  }, []);

  return <>{children}</>;
}
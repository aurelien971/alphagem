"use client";

import { useEffect, useState } from "react";
import { IconAuto, IconMoon, IconSun } from "./icons";

type Mode = "light" | "dark" | "system";

export default function DesktopControls({
  mode,
  setTheme,
  locale,
  setLocale,
  t,
  pillWrap,
  pillIdle,
  pillActive,
  segBase,
  segBtn,
  segTextBtn,
}: {
  mode: Mode;
  setTheme: (m: Mode) => void;
  locale: "en" | "fr";
  setLocale: (l: "en" | "fr") => void;
  t: (k: string) => string;
  pillWrap: string;
  pillIdle: string;
  pillActive: string;
  segBase: string;
  segBtn: string;
  segTextBtn: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="hidden md:flex items-center gap-2">
      <div className={`flex items-center overflow-hidden rounded-full ${pillWrap}`}>
        <button
          type="button"
          onClick={() => setTheme("light")}
          aria-label={t("theme.light")}
          className={[segBase, segBtn, mode === "light" ? pillActive : pillIdle].join(" ")}
          title={t("theme.light")}
        >
          <IconSun className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setTheme("dark")}
          aria-label={t("theme.dark")}
          className={[segBase, segBtn, mode === "dark" ? pillActive : pillIdle].join(" ")}
          title={t("theme.dark")}
        >
          <IconMoon className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => setTheme("system")}
          aria-label={t("theme.auto")}
          className={[segBase, segBtn, mode === "system" ? pillActive : pillIdle].join(" ")}
          title={t("theme.auto")}
        >
          <IconAuto className="h-4 w-4" />
        </button>
      </div>

      <div className={`flex items-center overflow-hidden rounded-full ${pillWrap}`}>
        <button
          type="button"
          onClick={() => setLocale("en")}
          className={[segBase, segTextBtn, locale === "en" ? pillActive : pillIdle].join(" ")}
          aria-label="English"
          title="English"
        >
          {t("nav.lang.en")} 🇬🇧
        </button>
        <button
          type="button"
          onClick={() => setLocale("fr")}
          className={[segBase, segTextBtn, locale === "fr" ? pillActive : pillIdle].join(" ")}
          aria-label="Français"
          title="Français"
        >
          {t("nav.lang.fr")} 🇫🇷
        </button>
      </div>
    </div>
  );
}
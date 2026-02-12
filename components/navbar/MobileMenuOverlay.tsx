"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconClose, IconMoon, IconSun } from "./icons";

type Mode = "light" | "dark" | "system";

function NavLink({
  href,
  active,
  onClick,
  children,
  overlayLinkIdle,
  overlayLinkActive,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  overlayLinkIdle: string;
  overlayLinkActive: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "text-sm font-light tracking-[0.22em] uppercase transition-opacity",
        active ? overlayLinkActive : overlayLinkIdle,
        active ? "opacity-100" : "opacity-40",
        "hover:opacity-70",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

export default function MobileMenuOverlay({
  pathname,
  lightNav,
  onClose,
  mode,
  setTheme,
  locale,
  setLocale,
  t,
  overlayShell,
  overlayCard,
  overlayLinkIdle,
  overlayLinkActive,
  logoSrc,
}: {
  pathname: string;
  lightNav: boolean;
  onClose: () => void;
  mode: Mode;
  setTheme: (m: Mode) => void;
  locale: "en" | "fr";
  setLocale: (l: "en" | "fr") => void;
  t: (k: string) => string;
  overlayShell: string;
  overlayCard: string;
  overlayLinkIdle: string;
  overlayLinkActive: string;
  logoSrc: string;
}) {
  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <button
        type="button"
        aria-label="Close menu background"
        onClick={onClose}
        className={["absolute inset-0", overlayShell, "backdrop-blur-2xl"].join(" ")}
      />

      <div className="relative mx-auto flex h-full max-w-6xl flex-col px-4 pt-5 pb-10">
        <div className="flex items-center justify-between">
          <div className="w-10" />

          <Link href="/" className="flex items-center" onClick={onClose}>
            <Image
              src={logoSrc}
              alt="Alphagem"
              width={120}
              height={28}
              priority
              className="h-6 w-auto"
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className={[
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              lightNav ? "text-black/80 hover:bg-black/5" : "text-white/90 hover:bg-white/10",
            ].join(" ")}
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-1 grid flex-1 gap-3">
          <div className={["rounded-3xl p-4", overlayCard].join(" ")}>
            <div className="flex flex-col items-center gap-6 pt-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  aria-label={t("theme.light")}
                  title={t("theme.light")}
                  className={[
                    "inline-flex items-center justify-center gap-2",
                    "h-10 w-36 rounded-full border",
                    "transition-opacity active:opacity-70",
                    mode === "light"
                      ? "border-black/15 bg-black/[0.04] opacity-100"
                      : "border-black/10 bg-transparent opacity-55 hover:opacity-85",
                  ].join(" ")}
                >
                  <IconSun className="h-4 w-4" />
                  <span className="text-sm tracking-wide">{t("theme.light")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  aria-label={t("theme.dark")}
                  title={t("theme.dark")}
                  className={[
                    "inline-flex items-center justify-center gap-2",
                    "h-10 w-36 rounded-full border",
                    "transition-opacity active:opacity-70",
                    mode === "dark"
                      ? "border-black/15 bg-black/[0.04] opacity-100"
                      : "border-black/10 bg-transparent opacity-55 hover:opacity-85",
                  ].join(" ")}
                >
                  <IconMoon className="h-4 w-4" />
                  <span className="text-sm tracking-wide">{t("theme.dark")}</span>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={[
                    "text-sm tracking-wide select-none",
                    "px-2 py-1 rounded-md",
                    "active:opacity-60",
                    locale === "en" ? "opacity-100" : "opacity-45",
                  ].join(" ")}
                  aria-label="English"
                  title="English"
                >
                  {t("nav.lang.en")} <span aria-hidden>🇬🇧</span>
                </button>

                <span className="opacity-30">|</span>

                <button
                  type="button"
                  onClick={() => setLocale("fr")}
                  className={[
                    "text-sm tracking-wide select-none",
                    "px-2 py-1 rounded-md",
                    "active:opacity-60",
                    locale === "fr" ? "opacity-100" : "opacity-45",
                  ].join(" ")}
                  aria-label="Français"
                  title="Français"
                >
                  {t("nav.lang.fr")} <span aria-hidden>🇫🇷</span>
                </button>
              </div>
            </div>
          </div>

          <div className={["p-6 flex justify-center", overlayCard].join(" ")}>
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-5 text-center">
                <NavLink
                  href="/"
                  active={pathname === "/"}
                  onClick={onClose}
                  overlayLinkIdle={overlayLinkIdle}
                  overlayLinkActive={overlayLinkActive}
                >
                  {t("nav.home")}
                </NavLink>

                <NavLink
                  href="/about"
                  active={pathname.startsWith("/about")}
                  onClick={onClose}
                  overlayLinkIdle={overlayLinkIdle}
                  overlayLinkActive={overlayLinkActive}
                >
                  {t("nav.about")}
                </NavLink>

                <NavLink
                  href="/services"
                  active={pathname.startsWith("/services")}
                  onClick={onClose}
                  overlayLinkIdle={overlayLinkIdle}
                  overlayLinkActive={overlayLinkActive}
                >
                  {t("nav.services")}
                </NavLink>

                <NavLink
                  href="/portfolio"
                  active={pathname.startsWith("/portfolio")}
                  onClick={onClose}
                  overlayLinkIdle={overlayLinkIdle}
                  overlayLinkActive={overlayLinkActive}
                >
                  {t("nav.portfolio")}
                </NavLink>

                <NavLink
                  href="/contact"
                  active={pathname.startsWith("/contact")}
                  onClick={onClose}
                  overlayLinkIdle={overlayLinkIdle}
                  overlayLinkActive={overlayLinkActive}
                >
                  {t("nav.contact")}
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 text-center text-xs opacity-60">
          © Copyright 2026 Alphagem Advisors
        </div>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { IconAuto, IconClose, IconMoon, IconSun } from "./icons";

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
  pillWrap,
  pillIdle,
  pillActive,
  segBase,
  segBtn,
  segTextBtn,
  overlayLinkIdle,
  overlayLinkActive,
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
  pillWrap: string;
  pillIdle: string;
  pillActive: string;
  segBase: string;
  segBtn: string;
  segTextBtn: string;
  overlayLinkIdle: string;
  overlayLinkActive: string;
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
              src={
                pathname === "/" || pathname.startsWith("/services")
                  ? "/logowhite.png"
                  : lightNav
                    ? "/wordmark.png"
                    : "/logowhite.png"
              }
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

        <div className="mt-6 grid gap-3 flex-1">
          {/* Pills block (unchanged) */}
          <div className={["rounded-3xl p-4", overlayCard].join(" ")}>
            <div className="flex items-center justify-center gap-2">
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
                  className={[segBase, segTextBtn, locale === "en" ? pillActive : pillIdle].join(
                    " ",
                  )}
                  aria-label="English"
                  title="English"
                >
                  {t("nav.lang.en")} 🇬🇧
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("fr")}
                  className={[segBase, segTextBtn, locale === "fr" ? pillActive : pillIdle].join(
                    " ",
                  )}
                  aria-label="Français"
                  title="Français"
                >
                  {t("nav.lang.fr")} 🇫🇷
                </button>
              </div>
            </div>
          </div>

          {/* Pages list block (same markup you had) */}
          <div className={["p-6 flex justify-center -mt-70", overlayCard].join(" ")}>
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
          © Copyright 2025 Alphagem Advisors
        </div>
      </div>
    </div>
  );
}
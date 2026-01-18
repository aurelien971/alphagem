"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/i18n";

import DesktopNav from "./DesktopNav";
import DesktopControls from "./DesktopControls";
import MobileTopbar from "./MobileTopbar";
import MobileMenuOverlay from "./MobileMenuOverlay";

type Mode = "light" | "dark" | "system";
type Resolved = "light" | "dark";

function resolveTheme(mode: Mode): Resolved {
  if (mode === "light") return "light";
  if (mode === "dark") return "dark";
  if (typeof window === "undefined") return "dark";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * FILE: components/navbar/Navbar.tsx (or wherever this file lives)
 * This file only passes styling tokens to DesktopNav.
 * Dropdown alignment + UI improvements are controlled by:
 *  - dropdownShell (panel style)
 *  - DesktopNav component (positioning)
 *
 * I’m updating dropdownShell to a clean, solid panel.
 * Make sure you also apply the DesktopNav changes I give you next,
 * because alignment is done in DesktopNav.
 */

export default function Navbar() {
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>("system");
  const [resolved, setResolved] = useState<Resolved>("dark");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { locale, setLocale, t } = useI18n();

  const isLightNavPage = useMemo(() => {
    return (
      pathname.startsWith("/about") ||
      pathname.startsWith("/portfolio") ||
      pathname.startsWith("/contact")
    );
  }, [pathname]);

  useEffect(() => {
    const read = () => {
      try {
        const saved = (localStorage.getItem("theme-mode") as Mode | null) ?? "system";
        setMode(saved);
        setResolved(resolveTheme(saved));
      } catch {
        setMode("system");
        setResolved(resolveTheme("system"));
      }
    };

    read();

    const onThemeChange = () => read();
    window.addEventListener("themechange", onThemeChange);

    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onMq = () => {
      try {
        const saved = (localStorage.getItem("theme-mode") as Mode | null) ?? "system";
        setResolved(resolveTheme(saved));
      } catch {
        setResolved(resolveTheme("system"));
      }
    };
    mq?.addEventListener?.("change", onMq);

    return () => {
      window.removeEventListener("themechange", onThemeChange);
      mq?.removeEventListener?.("change", onMq);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const setTheme = (m: Mode) => {
    setMode(m);
    setResolved(resolveTheme(m));
    // @ts-ignore
    window.__setThemeMode?.(m);
  };

  const lightNav = isLightNavPage && resolved === "light";

  const shellClass = lightNav
    ? "bg-white/70 backdrop-blur-xl border-b border-black/10"
    : "bg-white/02 backdrop-blur-xl border-b border-white/15";

  const linkBase = "text-sm tracking-wide transition-colors hover:text-[#2A6E9F]";
  const linkActive = lightNav ? "text-black/85" : "text-white/95";
  const linkIdle = lightNav ? "text-black/45" : "text-white/40";

  const pillWrap = lightNav
    ? "border border-black/10 bg-black/[0.03]"
    : "border border-white/25 bg-white/10";

  const pillIdle = lightNav
    ? "text-black/65 hover:bg-black/[0.06]"
    : "text-white/75 hover:bg-white/15";

  const pillActive = "bg-white/85 text-black shadow-sm";

  // CLEAN DROPDOWN PANEL (no blur, no milky opacity, better border + shadow)
  // Alignment is controlled inside DesktopNav (positioning classes), not here.
  const dropdownShell =
    "rounded-xl border border-black/10 bg-white p-2 shadow-[0_18px_50px_rgba(0,0,0,0.18)]";

  const segBase =
    "inline-flex items-center justify-center rounded-full transition-colors select-none";
  const segBtn = "h-8 w-9 sm:w-8";
  const segTextBtn = "h-8 px-3 text-xs tracking-wide";

  const mobileHeaderText = lightNav ? "text-black/85" : "text-white/90";

  const overlayShell = lightNav ? "bg-white/85 text-black" : "bg-black/70 text-white";
  const overlayCard = "border border-transparent bg-transparent";

  const overlayLinkIdle = lightNav ? "text-black/70" : "text-white/80";
  const overlayLinkActive = lightNav ? "text-black" : "text-white";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={shellClass}>
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Desktop logo */}
          <div className="hidden md:block">
            <Link href="/" className="flex items-center">
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
          </div>

          {/* Mobile topbar */}
          <MobileTopbar
            pathname={pathname}
            lightNav={lightNav}
            onOpen={() => setMobileOpen(true)}
            mobileHeaderText={mobileHeaderText}
          />

          {/* Desktop nav */}
          <DesktopNav
            pathname={pathname}
            t={t}
            linkBase={linkBase}
            linkActive={linkActive}
            linkIdle={linkIdle}
            dropdownShell={dropdownShell}
          />

          {/* Desktop controls */}
          <DesktopControls
            mode={mode}
            setTheme={setTheme}
            locale={locale}
            setLocale={setLocale}
            t={t}
            pillWrap={pillWrap}
            pillIdle={pillIdle}
            pillActive={pillActive}
            segBase={segBase}
            segBtn={segBtn}
            segTextBtn={segTextBtn}
          />
        </div>
      </div>

      {mobileOpen && (
        <MobileMenuOverlay
          pathname={pathname}
          lightNav={lightNav}
          onClose={() => setMobileOpen(false)}
          mode={mode}
          setTheme={setTheme}
          locale={locale}
          setLocale={setLocale}
          t={t}
          overlayShell={overlayShell}
          overlayCard={overlayCard}
          pillWrap={pillWrap}
          pillIdle={pillIdle}
          pillActive={pillActive}
          segBase={segBase}
          segBtn={segBtn}
          segTextBtn={segTextBtn}
          overlayLinkIdle={overlayLinkIdle}
          overlayLinkActive={overlayLinkActive}
        />
      )}
    </header>
  );
}
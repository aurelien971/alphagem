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

type AssetsDoc = {
  homeColor?: string;
  aboutColor?: string;

  contactColor?: string;
  portfolioColor?: string;
  servicesColor?: string;

  wordmarkLight?: string;
  wordmarkDark?: string;
};

function resolveTheme(mode: Mode): Resolved {
  if (mode === "light") return "light";
  if (mode === "dark") return "dark";
  if (typeof window === "undefined") return "dark";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function normalizeHex(input: string | undefined | null): string | null {
  const raw = String(input ?? "").trim();
  if (!raw) return null;

  const withHash = raw.startsWith("#") ? raw : `#${raw}`;
  const hex = withHash.toUpperCase();

  if (/^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/.test(hex)) return hex;
  return null;
}

export default function Navbar() {
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode>("system");
  const [resolved, setResolved] = useState<Resolved>("dark");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { locale, setLocale, t } = useI18n();

  const [assetColors, setAssetColors] = useState<{
    home?: string;
    about?: string;
    contact?: string;
    portfolio?: string;
    services?: string;
  }>({});

  const [wordmark, setWordmark] = useState<{ light?: string; dark?: string }>({});
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/assets", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (cancelled) return;

        const data = (json ?? {}) as AssetsDoc;
        console.log("[assets keys]", Object.keys(data), data.homeColor, data.aboutColor);

        const home = normalizeHex(data.homeColor);
        const about = normalizeHex(data.aboutColor);

        const contact = normalizeHex(data.contactColor);
        const portfolio = normalizeHex(data.portfolioColor);
        const services = normalizeHex(data.servicesColor);

        setAssetColors({
          home: home ?? undefined,
          about: about ?? undefined,
          contact: contact ?? undefined,
          portfolio: portfolio ?? undefined,
          services: services ?? undefined,
        });

        setWordmark({
          light: typeof data.wordmarkLight === "string" ? data.wordmarkLight : undefined,
          dark: typeof data.wordmarkDark === "string" ? data.wordmarkDark : undefined,
        });

        setAssetsLoaded(true);
      })
      .catch((err) => {
        console.log("[Navbar] /api/assets fetch failed:", err);
        if (!cancelled) {
          setAssetColors({});
          setWordmark({});
          setAssetsLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

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

  const navBgColor = useMemo(() => {
    if (pathname === "/") return assetColors.home ?? "transparent";
    if (pathname.startsWith("/about")) return assetColors.about ?? "transparent";
    if (pathname.startsWith("/contact")) return assetColors.contact ?? "transparent";
    if (pathname.startsWith("/portfolio")) return assetColors.portfolio ?? "transparent";
    if (pathname.startsWith("/services")) return assetColors.services ?? "transparent";
    return "transparent";
  }, [
    pathname,
    assetColors.home,
    assetColors.about,
    assetColors.contact,
    assetColors.portfolio,
    assetColors.services,
  ]);

  const shellClass = "border-b border-black/10";

  const linkBase = "text-sm tracking-wide transition-colors";
  const linkActive = "text-[#0E3453]";
  const linkIdle = "text-black/55 hover:text-[#0E3453]";

  const pillWrap = "border border-black/10 bg-black/[0.03]";
  const pillIdle = "text-black/65 hover:bg-black/[0.06]";
  const pillActive = "bg-white/85 text-black shadow-sm";

  const dropdownShell =
    "rounded-xl border border-black/10 bg-white p-2 shadow-[0_18px_50px_rgba(0,0,0,0.18)]";

  const segBase = "inline-flex items-center justify-center rounded-full transition-colors select-none";
  const segBtn = "h-8 w-9 sm:w-8";
  const segTextBtn = "h-8 px-3 text-xs tracking-wide";

  const mobileHeaderText = "text-black/85";

  const overlayShell = "bg-white/92 text-black";
  const overlayCard = "border border-transparent bg-transparent";

  const overlayLinkIdle = "text-black/70";
  const overlayLinkActive = "text-black";

  const lightNav = true;

  const fetchedLogoSrc = resolved === "dark" ? wordmark.dark : wordmark.light;
  const logoSrc = fetchedLogoSrc ?? "";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={[shellClass, navBgColor === "transparent" ? "backdrop-blur-xl" : ""].join(" ")}
        style={{ backgroundColor: navBgColor, opacity: 1 }}
      >
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="hidden lg:block">
            <Link href="/" className="flex items-center">
              {assetsLoaded && fetchedLogoSrc ? (
                <Image
                  src={fetchedLogoSrc}
                  alt="Alphagem"
                  width={120}
                  height={28}
                  priority
                  className="h-6 w-auto"
                />
              ) : (
                <div className="h-6 w-[120px]" />
              )}
            </Link>
          </div>

          <MobileTopbar
            pathname={pathname}
            lightNav={lightNav}
            onOpen={() => setMobileOpen(true)}
            mobileHeaderText={mobileHeaderText}
            logoSrc={assetsLoaded && fetchedLogoSrc ? fetchedLogoSrc : "/"}
          />

          <DesktopNav
            pathname={pathname}
            t={t}
            linkBase={linkBase}
            linkActive={linkActive}
            linkIdle={linkIdle}
            dropdownShell={dropdownShell}
          />

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
          overlayLinkIdle={overlayLinkIdle}
          overlayLinkActive={overlayLinkActive}
          logoSrc={assetsLoaded && fetchedLogoSrc ? fetchedLogoSrc : "/"}
        />
      )}
    </header>
  );
}
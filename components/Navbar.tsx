"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n/i18n";

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

function IconSun({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 2v2.5M12 19.5V22M4.2 4.2 6 6M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMoon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconAuto({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M7 7h10v10H7V7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 5.5 12 3l2.5 2.5M5.5 9.5 3 12l2.5 2.5M18.5 9.5 21 12l-2.5 2.5M9.5 18.5 12 21l2.5-2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHamburger({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M5 7h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 17h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconClose({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

  const dropdownShell =
    "rounded-2xl border border-white/25 bg-white/80 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur-2xl";

  const segBase =
    "inline-flex items-center justify-center rounded-full transition-colors select-none";
  const segBtn = "h-8 w-9 sm:w-8";
  const segTextBtn = "h-8 px-3 text-xs tracking-wide";

  const mobileHeaderText = lightNav ? "text-black/85" : "text-white/90";

  const overlayShell = lightNav ? "bg-white/85 text-black" : "bg-black/70 text-white";

  const overlayCard = "border border-transparent bg-transparent";

  const overlayLinkIdle = lightNav ? "text-black/70" : "text-white/80";
  const overlayLinkActive = lightNav ? "text-black" : "text-white";

  const NavLink = ({
    href,
    active,
    children,
  }: {
    href: string;
    active: boolean;
    children: React.ReactNode;
  }) => {
    return (
      <Link
        href={href}
        onClick={() => setMobileOpen(false)}
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
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={shellClass}>
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
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

          <div className="md:hidden w-full">
            <div className="relative flex items-center justify-between">
              <div className="w-10" />

              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2 flex items-center"
                onClick={() => setMobileOpen(false)}
              >
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
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className={[
                  "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                  "hover:opacity-90",
                  mobileHeaderText,
                ].join(" ")}
              >
                <IconHamburger className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
            <Link href="/" className={`${linkBase} ${pathname === "/" ? linkActive : linkIdle}`}>
              {t("nav.home")}
            </Link>

            <div className="relative group">
              <Link
                href="/about"
                className={`${linkBase} ${pathname.startsWith("/about") ? linkActive : linkIdle}`}
              >
                {t("nav.about")}
              </Link>

              <div className="absolute left-1/2 top-full h-4 w-44 -translate-x-1/2" />

              <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-[240px] -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className={dropdownShell}>
                  <Link
                    href="/about#about"
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-black/85 transition-colors hover:bg-black/5 hover:text-[#0E3453]"
                  >
                    {t("nav.about.about")}
                  </Link>
                  <Link
                    href="/about#figures"
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-black/85 transition-colors hover:bg-black/5 hover:text-[#0E3453]"
                  >
                    {t("nav.about.figures")}
                  </Link>
                  <Link
                    href="/about#team"
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-black/85 transition-colors hover:bg-black/5 hover:text-[#0E3453]"
                  >
                    {t("nav.about.team")}
                  </Link>
                  <Link
                    href="/about#values"
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-black/85 transition-colors hover:bg-black/5 hover:text-[#0E3453]"
                  >
                    {t("nav.about.values")}
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/services"
              className={`${linkBase} ${pathname.startsWith("/services") ? linkActive : linkIdle}`}
            >
              {t("nav.services")}
            </Link>

            <Link
              href="/portfolio"
              className={`${linkBase} ${pathname.startsWith("/portfolio") ? linkActive : linkIdle}`}
            >
              {t("nav.portfolio")}
            </Link>

            <Link
              href="/contact"
              className={`${linkBase} ${pathname.startsWith("/contact") ? linkActive : linkIdle}`}
            >
              {t("nav.contact")}
            </Link>
          </nav>

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
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="Close menu background"
            onClick={() => setMobileOpen(false)}
            className={["absolute inset-0", overlayShell, "backdrop-blur-2xl"].join(" ")}
          />

          <div className="relative mx-auto flex h-full max-w-6xl flex-col px-4 pt-5 pb-10">
            <div className="flex items-center justify-between">
              <div className="w-10" />
              <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
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
                onClick={() => setMobileOpen(false)}
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
              <div className={["rounded-3xl p-4", overlayCard].join(" ")}>
                <div className="flex items-center justify-center gap-2">
                  <div className={`flex items-center overflow-hidden rounded-full ${pillWrap}`}>
                    <button
                      type="button"
                      onClick={() => setTheme("light")}
                      aria-label={t("theme.light")}
                      className={[segBase, segBtn, mode === "light" ? pillActive : pillIdle].join(
                        " ",
                      )}
                      title={t("theme.light")}
                    >
                      <IconSun className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setTheme("dark")}
                      aria-label={t("theme.dark")}
                      className={[segBase, segBtn, mode === "dark" ? pillActive : pillIdle].join(
                        " ",
                      )}
                      title={t("theme.dark")}
                    >
                      <IconMoon className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setTheme("system")}
                      aria-label={t("theme.auto")}
                      className={[segBase, segBtn, mode === "system" ? pillActive : pillIdle].join(
                        " ",
                      )}
                      title={t("theme.auto")}
                    >
                      <IconAuto className="h-4 w-4" />
                    </button>
                  </div>

                  <div className={`flex items-center overflow-hidden rounded-full ${pillWrap}`}>
                    <button
                      type="button"
                      onClick={() => setLocale("en")}
                      className={[
                        segBase,
                        segTextBtn,
                        locale === "en" ? pillActive : pillIdle,
                      ].join(" ")}
                      aria-label="English"
                      title="English"
                    >
                      {t("nav.lang.en")} 🇬🇧
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocale("fr")}
                      className={[
                        segBase,
                        segTextBtn,
                        locale === "fr" ? pillActive : pillIdle,
                      ].join(" ")}
                      aria-label="Français"
                      title="Français"
                    >
                      {t("nav.lang.fr")} 🇫🇷
                    </button>
                  </div>
                </div>
              </div>

              <div className={["p-6 flex justify-center -mt-70", overlayCard].join(" ")}>
                <div className="w-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-5 text-center">
                    <NavLink href="/" active={pathname === "/"}>
                      {t("nav.home")}
                    </NavLink>
                    <NavLink href="/about" active={pathname.startsWith("/about")}>
                      {t("nav.about")}
                    </NavLink>
                    <NavLink href="/services" active={pathname.startsWith("/services")}>
                      {t("nav.services")}
                    </NavLink>
                    <NavLink href="/portfolio" active={pathname.startsWith("/portfolio")}>
                      {t("nav.portfolio")}
                    </NavLink>
                    <NavLink href="/contact" active={pathname.startsWith("/contact")}>
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
      )}
    </header>
  );
}
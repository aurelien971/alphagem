"use client";

import Link from "next/link";

export default function DesktopNav({
  pathname,
  t,
  linkBase,
  linkActive,
  linkIdle,
  dropdownShell,
}: {
  pathname: string;
  t: (k: string) => string;
  linkBase: string;
  linkActive: string;
  linkIdle: string;
  dropdownShell: string;
}) {
  const aboutActive = pathname.startsWith("/about");
  const servicesActive = pathname.startsWith("/services");

  return (
    <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
      <Link href="/" className={`${linkBase} ${pathname === "/" ? linkActive : linkIdle}`}>
        {t("nav.home")}
      </Link>

      {/* ABOUT dropdown */}
      <div className="relative group">
        <Link href="/about" className={`${linkBase} ${aboutActive ? linkActive : linkIdle}`}>
          {t("nav.about")}
        </Link>

        {/* hover buffer */}
        <div className="absolute left-0 top-full h-4 w-44" />

        {/* dropdown aligned to About (left edge) */}
        <div className="pointer-events-none absolute left-0 top-full z-50 mt-3 w-[240px] translate-y-1 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <div className={dropdownShell}>
            <Link
              href="/about#about"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453]"
            >
              {t("nav.about.about")}
            </Link>
            <Link
              href="/about#figures"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453]"
            >
              {t("nav.about.figures")}
            </Link>
            <Link
              href="/about#team"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453]"
            >
              {t("nav.about.team")}
            </Link>
            <Link
              href="/about#values"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453]"
            >
              {t("nav.about.values")}
            </Link>
          </div>
        </div>
      </div>

      {/* SERVICES dropdown */}
      <div className="relative group">
        <Link href="/services" className={`${linkBase} ${servicesActive ? linkActive : linkIdle}`}>
          {t("nav.services")}
        </Link>

        {/* hover buffer */}
        <div className="absolute left-0 top-full h-4 w-44" />

        {/* dropdown aligned to Services (left edge) */}
        <div className="pointer-events-none absolute left-0 top-full z-50 mt-3 w-[260px] translate-y-1 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <div className={dropdownShell}>
            <Link
              href="/services#engineering"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453]"
            >
              {t("services.nav.engineering")}
            </Link>
            <Link
              href="/services#balance"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453]"
            >
              {t("services.nav.balance")}
            </Link>
            <Link
              href="/services#securitization"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453]"
            >
              {t("services.nav.securitization")}
            </Link>
          </div>
        </div>
      </div>

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
  );
}
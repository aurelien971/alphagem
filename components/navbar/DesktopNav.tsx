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

  const topLinkClass = (active: boolean) =>
    `${linkBase} ${active ? linkActive : linkIdle} whitespace-nowrap`;

  return (
    <nav className="hidden lg:flex flex-1 items-center justify-center gap-6">
      <Link href="/" className={topLinkClass(pathname === "/")}>
        {t("nav.home")}
      </Link>

      {/* ABOUT dropdown */}
      <div className="relative group">
        <Link href="/about" className={topLinkClass(aboutActive)}>
          {t("nav.about")}
        </Link>

        <div className="absolute left-0 top-full h-4 w-44" />

        <div className="pointer-events-none absolute left-0 top-full z-50 mt-3 w-[240px] translate-y-1 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <div className={dropdownShell}>
            <Link
              href="/about#about"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453] whitespace-nowrap"
            >
              {t("about.nav.about")}
            </Link>
            <Link
              href="/about#figures"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453] whitespace-nowrap"
            >
              {t("about.nav.figures")}
            </Link>
            <Link
              href="/about#team"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453] whitespace-nowrap"
            >
              {t("about.nav.team")}
            </Link>
            <Link
              href="/about#values"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453] whitespace-nowrap"
            >
              {t("about.nav.values")}
            </Link>
          </div>
        </div>
      </div>

      {/* SERVICES dropdown */}
      <div className="relative group">
        <Link href="/services" className={topLinkClass(servicesActive)}>
          {t("nav.services")}
        </Link>

        <div className="absolute left-0 top-full h-4 w-44" />

        <div className="pointer-events-none absolute left-0 top-full z-50 mt-3 w-[260px] translate-y-1 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <div className={dropdownShell}>
            <Link
              href="/services#securitization"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453] whitespace-nowrap"
            >
              {t("services.nav.securitization")}
            </Link>
            <Link
              href="/services#balance"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453] whitespace-nowrap"
            >
              {t("services.nav.balance")}
            </Link>
            <Link
              href="/services#engineering"
              className="block rounded-lg px-3 py-2 text-sm font-normal text-black/80 transition-colors hover:bg-black/5 hover:text-[#0E3453] whitespace-nowrap"
            >
              {t("services.nav.engineering")}
            </Link>
          </div>
        </div>
      </div>

      <Link href="/portfolio" className={topLinkClass(pathname.startsWith("/portfolio"))}>
        {t("nav.portfolio")}
      </Link>

      <Link href="/contact" className={topLinkClass(pathname.startsWith("/contact"))}>
        {t("nav.contact")}
      </Link>
    </nav>
  );
}
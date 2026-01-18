"use client";

import Link from "next/link";
import Image from "next/image";
import { IconHamburger } from "./icons";

export default function MobileTopbar({
  pathname,
  lightNav,
  onOpen,
  mobileHeaderText,
}: {
  pathname: string;
  lightNav: boolean;
  onOpen: () => void;
  mobileHeaderText: string;
}) {
  return (
    <div className="md:hidden w-full">
      <div className="relative flex items-center justify-between">
        <div className="w-10" />

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
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
          onClick={onOpen}
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
  );
}
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function TombstoneModal({
  open,
  onClose,
  src,
  alt,
  title,
  fallbackLogoSrc,
  fallbackLogoAlt,
}: {
  open: boolean;
  onClose: () => void;
  src?: string;
  alt?: string;
  title?: string;
  fallbackLogoSrc: string;
  fallbackLogoAlt: string;
}) {
  const [tombstoneFailed, setTombstoneFailed] = useState(false);

  useEffect(() => {
    if (!open) return;

    setTombstoneFailed(false);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const showTombstone = Boolean(src) && !tombstoneFailed;
  const label = title ?? alt ?? fallbackLogoAlt;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <p className="text-sm font-medium opacity-80">{label}</p>
          <button
            onClick={onClose}
            className="rounded-full border px-3 py-1 text-sm opacity-80"
          >
            Close
          </button>
        </div>

        <div className="relative aspect-[16/10] bg-white">
          {showTombstone ? (
            <Image
              src={src!}
              alt={alt ?? label}
              fill
              className="object-contain p-6"
              onError={() => setTombstoneFailed(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="relative flex h-32 w-full max-w-sm items-center justify-center rounded-2xl border border-black/10 bg-white">
                <Image
                  src={fallbackLogoSrc}
                  alt={fallbackLogoAlt}
                  fill
                  className="object-contain p-6"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
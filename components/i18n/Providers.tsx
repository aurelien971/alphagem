"use client";

import React from "react";
import { I18nProvider } from "@/components/i18n/i18n";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}
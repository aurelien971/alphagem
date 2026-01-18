import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import Providers from "@/components/i18n/Providers";

export const metadata: Metadata = {
  title: "ALPHAGEM",
  description: "Site rebuild",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>
          <Providers>
            <Navbar />
            <main className="min-h-dvh">{children}</main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
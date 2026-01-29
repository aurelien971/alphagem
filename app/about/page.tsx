"use client";

import { useEffect } from "react";
import { useI18n } from "@/components/i18n/i18n";

import AboutHero from "@/components/about/AboutHero";
import SideSectionNav from "@/components/about/SideSectionNav";
import AboutSection from "@/components/about/AboutSection";
import FiguresSection from "@/components/about/FiguresSection";
import TeamSection from "@/components/about/TeamSection";
import ValuesSection from "@/components/about/ValuesSection";

export default function AboutPage() {
  const { setPage } = useI18n();

  useEffect(() => {
    setPage("about");
    return () => setPage(null);
  }, [setPage]);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] pb-[40vh]">
      <AboutHero />

      <section className="bg-[var(--background)] text-[var(--foreground)]">
        <div className="relative mx-auto flex max-w-[1400px] gap-10 px-4">
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24 h-[calc(100vh-6rem)]">
              <div className="flex h-full items-center">
                <SideSectionNav />
              </div>
            </div>
          </aside>

          <div className="w-full">
            <div className="mx-auto max-w-6xl pb-28 pt-16 md:pt-20">
              <div className="space-y-8">
                <AboutSection />
                <div className="h-px w-full bg-[var(--border)]" />

                <FiguresSection />
                <div className="h-px w-full bg-[var(--border)]" />

                <TeamSection />
                <div className="h-px w-full bg-[var(--border)]" />

                <ValuesSection />
              </div>

              <div className="h-24 md:h-32" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
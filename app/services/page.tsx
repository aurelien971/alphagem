"use client";

import ServicesHero from "@/components/services/ServicesHero";
import ServicesIntro from "@/components/services/ServicesIntro";
import ServicesSection from "@/components/services/ServicesSection";
import ServicesSideNav from "@/components/services/ServicesSideNav";
import { SERVICES_SECTIONS } from "@/components/services/servicesContent";

export default function ServicesPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServicesHero />

      <section className="bg-[var(--background)] text-[var(--foreground)]">
        <div className="relative mx-auto flex max-w-[1400px] gap-16 px-4">
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-24 h-[calc(100vh-6rem)]">
              <div className="flex h-full items-center">
                <ServicesSideNav />
              </div>
            </div>
          </aside>

          <div className="w-full">
            <div className="mx-auto max-w-6xl pb-28 pt-16 md:pt-20">
              <section id="overview" className="scroll-mt-28 pb-2">
                <ServicesIntro />
              </section>

              <div className="mt-4 space-y-12 md:mt-6 md:space-y-14">
                {SERVICES_SECTIONS.map((s) => (
                  <ServicesSection key={s.id} {...s} />
                ))}
              </div>

              <div className="h-24 md:h-32" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
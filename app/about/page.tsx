import AboutHero from "@/components/about/AboutHero";
import SideSectionNav from "@/components/about/SideSectionNav";
import AboutSection from "@/components/about/AboutSection";
import FiguresSection from "@/components/about/FiguresSection";
import TeamSection from "@/components/about/TeamSection";
import ValuesSection from "@/components/about/ValuesSection";

export default function AboutPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] pb-[40vh]">
      <div className="relative mx-auto flex max-w-[1400px] gap-10 px-4">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-1/2 -translate-y-1/2">
            <SideSectionNav />
          </div>
        </aside>

        <div className="mx-auto w-full max-w-6xl">
          <AboutHero />

          <div className="mt-24 space-y-24">
            <AboutSection />
            <div className="h-px w-full bg-[var(--border)]" />

            <FiguresSection />
            <div className="h-px w-full bg-[var(--border)]" />

            <TeamSection />
            {/* REMOVE divider here because ValuesSection already has border-t */}

            <ValuesSection />
          </div>
        </div>
      </div>
    </main>
  );
}
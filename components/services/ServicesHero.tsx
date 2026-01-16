import Image from "next/image";

export default function ServicesHero() {
  return (
    <section className="relative h-[72vh] min-h-[560px] w-full overflow-hidden">
      <Image
        src="/services-hero.jpg"
        alt="Services"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/80" />

      <div className="relative mx-auto flex h-full max-w-[1400px] items-end px-4 pb-16 pt-28 md:pb-20">
        {/* Match the page layout: sidebar width (w-60) + gap (gap-16) */}
        <div className="grid w-full items-end lg:grid-cols-[15rem_1fr] lg:gap-16">
          <div className="hidden lg:block" />

          {/* Content column */}
          <div className="w-full">
            <div className="max-w-6xl [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
              <p className="text-xs tracking-[0.26em] text-white/70">SERVICES</p>

              <h1 className="mt-4 max-w-[28ch] text-4xl font-semibold leading-[1.03] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Innovative services built for emerging markets
              </h1>

              <p className="mt-6 max-w-[78ch] text-sm leading-7 text-white/80 md:text-base md:leading-8">
                We design and implement tailored financial engineering solutions across sectors, raising capital locally
                and regionally through rigorous structuring, modeling, and execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
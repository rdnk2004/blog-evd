"use client";

import { useEffect } from "react";
import Link from "next/link";

/* ────────────────────────────────────────────
   HEARTLINES (POEMS) PAGE ROOT
   ──────────────────────────────────────────── */

const poems = [
  {
    title: "A Gentle Return to Self",
    snippet: "The first twenty years of my life\nwere a small, quiet circle —\njust me,\nmy studies,\nstory books...",
    slug: "a-gentle-return-to-self",
    date: "April 21, 2026",
  },
  {
    title: "The Invisible Touch of Divinity",
    snippet: "In the chaos of reality,\nI stand before the divine shrine.\nClosing my eyes,\nI gather that sacred form within.\nSlowly, I drift\nAway from the noise of the world...",
    slug: "the-invisible-touch-of-divinity",
    date: "April 21, 2026",
  }
];

export default function HeartlinesPage() {
  // IntersectionObserver for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex flex-col w-full bg-[#F7F2EB] min-h-screen">
      
      {/* ────────────────────────────────────────────
          HERO SECTION
          ──────────────────────────────────────────── */}
      <section className="relative w-full pt-40 pb-20 md:pt-56 md:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Soft sky gradient background specific to Heartlines */}
        <div
          className="absolute inset-0 z-0 opacity-70"
          style={{
            background: "linear-gradient(175deg, #F7EDD8 0%, #D8B4A8 40%, #A8B5A1 80%, #F7F2EB 100%)",
          }}
        />

        {/* Decorative Orbs */}
        <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] bg-white/40 rounded-full blur-[100px] pointer-events-none animate-breathe" />

        {/* Hero text content */}
        <div className="relative z-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 reveal-on-scroll">
            <div className="h-px w-8 sm:w-12 bg-charcoal/30" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold text-charcoal/60">
              Heartlines
            </span>
            <div className="h-px w-8 sm:w-12 bg-charcoal/30" />
          </div>

          <h1
            className="font-alex text-[4.5rem] sm:text-[7rem] md:text-[9rem] leading-none text-charcoal mb-4 sm:mb-6 reveal-on-scroll"
            style={{ transitionDelay: "0.1s" }}
          >
            Moments in Verse
          </h1>
          
          <p className="text-charcoal/60 font-light text-sm sm:text-base leading-relaxed max-w-lg mb-8 reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
            Unspoken thoughts and fleeting emotions, captured inside the spaces of a stanza.
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────
          POETRY GRID SECTION
          ──────────────────────────────────────────── */}
      <section className="relative w-full py-16 px-4 sm:px-6 md:pb-36 z-10">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8 md:gap-12">
           {poems.map((poem, i) => (
             <Link
               key={i}
               href={`/heartlines/${poem.slug}`}
               className="group flex flex-col items-center text-center p-8 sm:p-12 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-md hover:bg-white/80 transition-all duration-500 reveal-on-scroll shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
               style={{ transitionDelay: `${(i % 2 === 0 ? 0 : 0.15)}s` }}
             >
                <div className="flex flex-col items-center flex-1 w-full relative">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-warm-taupe/60 font-semibold mb-6">{poem.date}</span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-charcoal mb-6 italic group-hover:text-warm-taupe transition-colors duration-300">
                    {poem.title}
                  </h3>
                  <div className="w-12 h-px bg-warm-taupe/20 mb-6" />
                  <p className="text-charcoal/70 font-light text-sm sm:text-base leading-loose italic whitespace-pre-line">
                    {poem.snippet}
                  </p>
                </div>
                
                <div className="mt-10 flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-dusty-rose group-hover:text-warm-taupe transition-colors duration-400">
                  Read Poem
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
             </Link>
           ))}
        </div>
      </section>

    </main>
  );
}

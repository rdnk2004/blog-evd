"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { SeriesWithChapters } from "@/lib/content";

export default function SeriesDetailClient({ series }: { series: SeriesWithChapters }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );
    
    setTimeout(() => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    }, 50);
    
    return () => observer.disconnect();
  }, [series.slug]);

  return (
    <main className="flex flex-col w-full bg-[#F3EDE4] min-h-screen overflow-x-hidden relative">
      
      {/* HERO SECTION */}
      <section className="relative w-full pt-40 pb-20 md:pt-56 md:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-warm-taupe/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-sage/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center reveal-on-scroll">
          <Link
            href="/series"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-taupe hover:text-charcoal transition-colors duration-300 mb-12 sm:mb-16"
          >
            <span className="transform -translate-x-0 hover:-translate-x-1 transition-transform duration-300">←</span>
            Back to Series
          </Link>

          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-taupe/60 font-semibold mb-6">Series Collection</span>
          
          <h1 className="font-alex text-[3.5rem] sm:text-[5rem] md:text-[7rem] leading-[0.9] text-charcoal mb-8 sm:mb-12" style={{textShadow: "0 4px 20px rgba(0,0,0,0.03)"}}>
            {series.title}
          </h1>

          <p className="text-charcoal/60 font-light text-sm sm:text-base leading-relaxed max-w-lg mb-8">
            {series.description}
          </p>

          <div className="w-px h-16 sm:h-24 bg-gradient-to-b from-warm-taupe/40 to-transparent mb-12 sm:mb-16" />
        </div>
      </section>

      {/* CHAPTERS LIST */}
      <section className="relative w-full py-16 px-4 sm:px-6 md:pb-36 z-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
          {series.chapters.map((chapter, i) => (
            <Link
              key={chapter.slug}
              href={`/series/${series.slug}/${chapter.slug}`}
              className="group flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center p-8 sm:p-10 rounded-[2rem] bg-white/40 border border-white/60 backdrop-blur-md transition-all duration-700 reveal-on-scroll shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:bg-white/60"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="flex flex-col items-start flex-1 w-full relative">
                <div className="flex flex-wrap items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.2em] text-warm-taupe/80 font-semibold">
                  {chapter.chapterLabel && (
                    <>
                      <span className="text-charcoal/70">{chapter.chapterLabel}</span>
                      <span className="opacity-40">·</span>
                    </>
                  )}
                  <span>{chapter.displayDate}</span>
                  <span className="opacity-40">·</span>
                  <span>{chapter.readTime}</span>
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal mb-4">
                  {chapter.title}
                </h3>
                
                <p className="text-charcoal/70 font-light text-sm sm:text-base leading-relaxed">
                  {chapter.snippet}
                </p>
                
                <div className="mt-6 flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-warm-taupe group-hover:text-charcoal transition-colors duration-400">
                  Read Chapter
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}

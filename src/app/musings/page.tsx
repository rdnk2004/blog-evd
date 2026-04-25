"use client";

import { useEffect } from "react";
import Link from "next/link";

const musings = [
  {
    title: "Kaartu",
    snippet: "The first thought that rose in me when I woke up today was the same as the past four mornings. Will she be waiting at the doorstep today? But the doorway had remained empty...",
    slug: "kaartu",
    date: "12 Feb, 2026",
    category: "Life",
    readTime: "4 min read"
  }
];

export default function MusingsPage() {
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
    <main className="flex flex-col w-full bg-[#F3EDE4] min-h-screen overflow-x-hidden relative">
      
      {/* HERO SECTION */}
      <section className="relative w-full pt-40 pb-20 md:pt-56 md:pb-32 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Soft background gradient */}
        <div
          className="absolute inset-0 z-0 opacity-60"
          style={{
            background: "linear-gradient(175deg, #A6B6C8 0%, #CFA989 30%, #F0DFC0 70%, #F3EDE4 100%)",
          }}
        />

        {/* Decorative Orb */}
        <div className="absolute top-[10%] right-[20%] w-[40vw] h-[40vw] bg-white/30 rounded-full blur-[120px] pointer-events-none animate-breathe" />

        <div className="relative z-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 reveal-on-scroll">
            <div className="h-px w-8 sm:w-12 bg-charcoal/30" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold text-charcoal/60">
              Musings
            </span>
            <div className="h-px w-8 sm:w-12 bg-charcoal/30" />
          </div>

          <h1
            className="font-alex text-[4.5rem] sm:text-[7rem] md:text-[9rem] leading-none text-charcoal mb-4 sm:mb-6 reveal-on-scroll"
            style={{ transitionDelay: "0.1s" }}
          >
            Wandering Thoughts
          </h1>
          
          <p className="text-charcoal/60 font-light text-sm sm:text-base leading-relaxed max-w-lg mb-8 reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
            Unstructured ideas, gentle observations, and quiet conversations with the self.
          </p>
        </div>
      </section>

      {/* MUSINGS LIST SECTION */}
      <section className="relative w-full py-16 px-4 sm:px-6 md:pb-36 z-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 md:gap-10">
           {musings.map((musing, i) => (
             <Link
               key={i}
               href={`/musings/${musing.slug}`}
               className="group flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center p-8 sm:p-12 rounded-[2rem] bg-white/40 border border-white/60 backdrop-blur-md transition-all duration-700 reveal-on-scroll shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:bg-white/60"
               style={{ transitionDelay: `${i * 0.15}s` }}
             >
                <div className="flex flex-col items-start flex-1 w-full relative">
                  
                  <div className="flex flex-wrap items-center gap-2 mb-5 text-[10px] uppercase tracking-[0.2em] text-warm-taupe/80 font-semibold">
                    <span className="px-3 py-1.5 rounded-full border border-warm-taupe/20 bg-white/50">{musing.category}</span>
                    <span className="opacity-40">·</span>
                    <span>{musing.date}</span>
                    <span className="opacity-40 hidden sm:inline">·</span>
                    <span className="hidden sm:inline">{musing.readTime}</span>
                  </div>
                  
                  <h3 className="font-serif text-3xl sm:text-4xl text-charcoal mb-5">
                    {musing.title}
                  </h3>
                  
                  <p className="text-charcoal/70 font-light text-sm sm:text-base leading-loose max-w-2xl">
                    {musing.snippet}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#A6B6C8] group-hover:text-charcoal transition-colors duration-400">
                    Read Musing
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

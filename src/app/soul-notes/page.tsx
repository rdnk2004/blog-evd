"use client";

import { useEffect } from "react";
import Link from "next/link";

const notes = [
  {
    title: "The Departure of a Soul…",
    snippet: "As the Bhagavad Gita says, there is no death for the soul… the soul may take another attire, not the form we knew. That was the first time she had truly witnessed a soul departing in such a manner...",
    slug: "the-departure-of-a-soul",
    date: "May 5, 2026",
    category: "Soul",
    readTime: "3 min read"
  },
  {
    title: "The Mother’s Silent Answer",
    snippet: "There is a belief often heard among devotees—that one reaches Tirumala Venkateswara Temple only when Venkateswara calls. It is not a place one simply decides to visit...",
    slug: "the-mothers-silent-answer",
    date: "October 18, 2025",
    category: "Soul",
    readTime: "3 min read"
  }
];

export default function SoulNotesPage() {
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
            background: "linear-gradient(175deg, #E8C9A0 0%, #CFA989 30%, #F0DFC0 70%, #F3EDE4 100%)",
          }}
        />

        {/* Decorative Orb */}
        <div className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] bg-white/30 rounded-full blur-[120px] pointer-events-none animate-breathe" />

        <div className="relative z-20 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 reveal-on-scroll">
            <div className="h-px w-8 sm:w-12 bg-charcoal/30" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold text-charcoal/60">
              Soul Notes
            </span>
            <div className="h-px w-8 sm:w-12 bg-charcoal/30" />
          </div>

          <h1
            className="font-alex text-[4.5rem] sm:text-[7rem] md:text-[9rem] leading-none text-charcoal mb-4 sm:mb-6 reveal-on-scroll"
            style={{ transitionDelay: "0.1s" }}
          >
            Whispers of the Heart
          </h1>
          
          <p className="text-charcoal/60 font-light text-sm sm:text-base leading-relaxed max-w-lg mb-8 reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
            Quiet reflections, spiritual encounters, and the gentle unfolding of everyday moments captured in prose.
          </p>
        </div>
      </section>

      {/* NOTES LIST SECTION */}
      <section className="relative w-full py-16 px-4 sm:px-6 md:pb-36 z-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 md:gap-10">
           {notes.map((note, i) => (
             <Link
               key={i}
               href={`/soul-notes/${note.slug}`}
               className="group flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center p-8 sm:p-12 rounded-[2rem] bg-white/40 border border-white/60 backdrop-blur-md hover:bg-white/80 transition-all duration-700 reveal-on-scroll shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
               style={{ transitionDelay: `${i * 0.15}s` }}
             >
                <div className="flex flex-col items-start flex-1 w-full relative">
                  
                  <div className="flex flex-wrap items-center gap-2 mb-5 text-[10px] uppercase tracking-[0.2em] text-warm-taupe/80 font-semibold">
                    <span className="px-3 py-1.5 rounded-full border border-warm-taupe/20 bg-white/50">{note.category}</span>
                    <span className="opacity-40">·</span>
                    <span>{note.date}</span>
                    <span className="opacity-40 hidden sm:inline">·</span>
                    <span className="hidden sm:inline">{note.readTime}</span>
                  </div>
                  
                  <h3 className="font-serif text-3xl sm:text-4xl text-charcoal mb-5 group-hover:text-warm-taupe transition-colors duration-400">
                    {note.title}
                  </h3>
                  
                  <p className="text-charcoal/70 font-light text-sm sm:text-base leading-loose mb-8 max-w-2xl">
                    {note.snippet}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-dusty-rose group-hover:text-warm-taupe transition-colors duration-400">
                    Read Entry
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

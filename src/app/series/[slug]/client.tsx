"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SeriesWithChapters } from "@/lib/content";
import { PeacockDivider, PeacockFeather } from "@/app/components/peacock-feather";

export default function SeriesDetailClient({ series }: { series: SeriesWithChapters }) {
  const isDivineSeries = series.slug === "whispers-of-the-divine";

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
      <section className="relative w-full pt-32 pb-4 sm:pt-40 sm:pb-6 md:pt-44 md:pb-8 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-warm-taupe/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-sage/10 rounded-full blur-[150px] pointer-events-none" />

        {isDivineSeries && (
          <div
            className="absolute top-[120px] right-[5%] opacity-35 pointer-events-none hidden md:block"
            style={{
              transform: "rotate(20deg)",
              filter: "drop-shadow(0 4px 20px rgba(10, 147, 150, 0.2))",
              animation: "float-slow 9s ease-in-out infinite",
            }}
          >
            <PeacockFeather width={120} height={210} />
          </div>
        )}

        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center reveal-on-scroll">
          <Link
            href="/series"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-taupe hover:text-charcoal transition-colors duration-300 mb-8 sm:mb-12"
          >
            <span className="transform -translate-x-0 hover:-translate-x-1 transition-transform duration-300">←</span>
            Back to Series
          </Link>

          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-taupe/60 font-semibold mb-6">Series Collection</span>
          
          <h1 className="font-alex text-[3.5rem] sm:text-[5rem] md:text-[7rem] leading-[0.9] text-charcoal mb-8 sm:mb-10" style={{textShadow: "0 4px 20px rgba(0,0,0,0.03)"}}>
            {series.title}
          </h1>

          <p className="text-charcoal/60 font-light text-sm sm:text-base leading-relaxed max-w-lg mb-6">
            {series.description}
          </p>

          {isDivineSeries ? (
            <PeacockDivider className="mb-2 sm:mb-4 reveal-on-scroll" />
          ) : (
            <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-warm-taupe/40 to-transparent mb-2 sm:mb-4" />
          )}
        </div>
      </section>

      {/* CHAPTERS LIST */}
      <section className="relative w-full pt-0 pb-24 md:pb-36 px-4 sm:px-6 z-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
          {series.chapters.map((chapter, i) => {
            const prevChapter = i > 0 ? series.chapters[i - 1] : null;
            const isNewGroup = Boolean(
              chapter.storyGroup &&
              (!prevChapter || prevChapter.storyGroup !== chapter.storyGroup)
            );

            return (
              <React.Fragment key={chapter.slug}>
                {isNewGroup && (
                  <div className={`w-full flex flex-col items-center gap-2 ${i > 0 ? "pt-10 sm:pt-14 pb-2" : "pt-0 pb-2"} reveal-on-scroll`}>
                    <div className="w-full flex items-center gap-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-warm-taupe/30 to-warm-taupe/40" />
                      <span className="px-5 py-2 rounded-full border border-warm-taupe/25 bg-white/60 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-charcoal/80 shadow-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-warm-taupe/70" />
                        {chapter.storyGroup}
                        {chapter.order <= 2 ? " · 2 Parts (Completed)" : " · Standalone Tale"}
                        <span className="w-1.5 h-1.5 rounded-full bg-warm-taupe/70" />
                      </span>
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-warm-taupe/30 to-warm-taupe/40" />
                    </div>
                  </div>
                )}

                <Link
                  href={`/series/${series.slug}/${chapter.slug}`}
                  className="group relative overflow-hidden flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center p-8 sm:p-10 rounded-[2rem] bg-white/40 border border-white/60 backdrop-blur-md transition-all duration-700 reveal-on-scroll shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:bg-white/60"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  {/* Atmospheric decorative emblem inside the box */}
                  {isDivineSeries && (
                    <div className="absolute right-4 sm:right-8 md:right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none transition-all duration-700">
                      {chapter.birdEffect || chapter.slug === "the-little-bird-and-the-hands-of-destiny" ? (
                        <div className="opacity-25 sm:opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500">
                          <Image
                            src="/little-bird.png"
                            alt=""
                            width={110}
                            height={130}
                            className="w-20 sm:w-24 md:w-28 h-auto object-contain filter drop-shadow(0 4px 12px rgba(0,0,0,0.04))"
                          />
                        </div>
                      ) : (
                        <div className="opacity-20 sm:opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 transform rotate-12">
                          <Image
                            src="/peacock-feather.png"
                            alt=""
                            width={80}
                            height={200}
                            className="w-14 sm:w-16 md:w-20 h-auto object-contain"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Standard thumbnail for any non-divine series chapters */}
                  {!isDivineSeries && chapter.image && (
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-warm-taupe/20 bg-white/50">
                      <Image
                        src={chapter.image.startsWith("/") ? chapter.image : `/${chapter.image}`}
                        alt={chapter.title}
                        fill
                        sizes="(max-width: 640px) 80px, 112px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-col items-start flex-1 w-full relative pr-16 sm:pr-24 md:pr-28">
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
                      {chapter.chapterLabel === "One-Part Story" ? "Read Story" : "Read Chapter"}
                      <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </section>

    </main>
  );
}

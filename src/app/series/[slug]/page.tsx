"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const getSeriesData = (slug: string) => {
  const seriesDB: Record<string, any> = {
    "a-journey-of-hope-and-heart": {
      title: "A Journey of Hope and Heart",
      description: "A story of unfolding chapters, told one part at a time.",
      chapters: [
        {
          title: "Prologue",
          slug: "prologue",
          date: "May 18, 2026",
          readTime: "2 min read",
          snippet: "The beginning of the journey...",
        },
        {
          chapterLabel: "Chapter 1",
          title: "When Destiny Chose The Hour",
          slug: "chapter-1",
          date: "May 19, 2026",
          readTime: "3 min read",
          snippet: "We began our journey together after eight long years of anticipation...",
        },
        {
          chapterLabel: "Chapter 2",
          title: "The Beginning of Sleepless Nights",
          slug: "chapter-2",
          date: "May 24, 2026",
          readTime: "3 min read",
          snippet: "In the midst of the post-delivery procedures, I drifted into a brief sleep, oblivious to the storm quietly unfolding around me...",
        },
        {
          chapterLabel: "Chapter 3",
          title: "When Faith Took Its First Breath",
          slug: "chapter-3",
          date: "May 29, 2026",
          readTime: "3 min read",
          snippet: "The next few hours of that night…they unfolded in a way I did not witness myself. I know them only through Ram’s perspective…",
        },
        {
          chapterLabel: "Chapter 4",
          title: "When Time Stood Still",
          slug: "chapter-4",
          date: "June 3, 2026",
          readTime: "3 min read",
          snippet: "The unforgettable night.. a night where Ram endured the deepest pain .. of placing our little one, who had just taken his very first breath, into the most terrifying unknown...",
        },
        {
          chapterLabel: "Chapter 5",
          title: "The Weight of Waiting",
          slug: "chapter-5",
          date: "June 8, 2026",
          readTime: "3 min read",
          snippet: "Ram sat through the entire night outside the NICU—waiting... just for a word from the doctors.",
        },
        {
          chapterLabel: "Chapter 6",
          title: "The Glimpse Before the Storm",
          slug: "chapter-6",
          date: "June 13, 2026",
          readTime: "3 min read",
          snippet: "Two days passed like that… slow… stretched… suspended between hope and fear. Within me, a quiet excitement began to grow...",
        },
        {
          chapterLabel: "Chapter 7",
          title: "So Near, Yet Beyond My Reach",
          slug: "chapter-7",
          date: "June 18, 2026",
          readTime: "3 min read",
          snippet: "I followed Ram, unaware of my surroundings, carrying an emptiness that words could never describe...",
        },
        {
          chapterLabel: "Chapter 8",
          title: "When Hope Stood Still",
          slug: "chapter-8",
          date: "June 23, 2026",
          readTime: "3 min read",
          snippet: "Ram left me back home. We tried to quiet the storm within us. We spoke very little.. because we both knew that if words came, they would fall as tears...",
        },
        {
          chapterLabel: "Chapter 9",
          title: "The Moment Hope Found My Arms",
          slug: "chapter-9",
          date: "June 28, 2026",
          readTime: "3 min read",
          snippet: "Our waiting… it did not go in vain. Slowly, gently, it began to carry the light of hope. She placed him gently into my arms, as if she were placing my entire world there...",
        }
      ]
    }
  };

  return seriesDB[slug];
};

export default function SeriesSubpage(props: { params: { slug: string } | Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    Promise.resolve(props.params).then((resolved) => {
      setSlug(resolved.slug);
    });
  }, [props.params]);

  useEffect(() => {
    if (!slug) return;
    window.scrollTo(0, 0); // Reset scroll position to top when page loads
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" } // Adjusted rootMargin
    );
    
    setTimeout(() => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    }, 50);
    
    return () => observer.disconnect();
  }, [slug]);

  if (!slug) return null;

  const seriesData = getSeriesData(slug);

  if (!seriesData) {
    return (
      <main className="flex flex-col w-full bg-[#F3EDE4] min-h-screen items-center justify-center">
        <h1 className="font-alex text-4xl text-charcoal">Story Not Found</h1>
        <Link href="/series" className="mt-4 text-warm-taupe hover:text-charcoal transition-colors">
          Back to Series
        </Link>
      </main>
    );
  }

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
            {seriesData.title}
          </h1>

          <p className="text-charcoal/60 font-light text-sm sm:text-base leading-relaxed max-w-lg mb-8">
            {seriesData.description}
          </p>

          <div className="w-px h-16 sm:h-24 bg-gradient-to-b from-warm-taupe/40 to-transparent mb-12 sm:mb-16" />
        </div>
      </section>

      {/* CHAPTERS LIST */}
      <section className="relative w-full py-16 px-4 sm:px-6 md:pb-36 z-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
          {seriesData.chapters.map((chapter: any, i: number) => (
            <Link
              key={i}
              href={`/series/${slug}/${chapter.slug}`}
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
                  <span>{chapter.date}</span>
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

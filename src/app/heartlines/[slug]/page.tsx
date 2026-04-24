"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Shared dummy data representing a poem database
const getPoemBySlug = (slug: string) => {
  const poems: Record<string, any> = {
    "a-gentle-return-to-self": {
      title: "A Gentle Return to Self",
      date: "April 21, 2026",
      content: "The first twenty years of my life\nwere a small, quiet circle —\njust me,\nmy studies,\nstory books,\ndrawings,\nand a few familiar faces from the neighbourhood.\nI lived mostly within myself…\nyet somewhere deep inside,\nthere was a silent yearning —\nfor a sibling,\nfor that unseen bond I often watched in others.\nBut I remained reserved,\nholding my world gently within.\n\nThe next twenty years unfolded differently.\nThrough Ram,\nlife gifted me a circle of relationships —\nwarm, close, and meaningful.\nI embraced them as my own.\nHappiness often outweighed\nthe small differences that came along,\nand in those moments,\nlife quietly taught me\nits most valuable lessons.\n\nIn my forties,\nI began to see the world\nwith a clearer, softer understanding.\nThe pride I once held\nin being surrounded by so much affection\nslowly dissolved…\nThere were moments of guilt too —\nof having unknowingly placed my parents\nin the second space of my heart.\nYet, their love remained unchanged,\nsteady and unconditional,\nas it always had been.\n\nAs life moved through its phases,\nI understood…\nwe meet many people along the way.\nSome walk beside us for long,\nsome drift away,\nand some return again\nwhen paths unexpectedly cross.\n\nAnd now…\nwith a heart that seeks only the positive,\nI find myself returning to my square one —\nbut this time,\nwithout loneliness,\nwithout longing.\nThere is only quiet contentment\nin my small, simple world.\n\nA deeper connection\nwith the universe…\nand a gentle awareness\nof the beauty hidden\nin the smallest gestures.\n\nLife is beautiful."
    },
    "the-invisible-touch-of-divinity": {
      title: "The Invisible Touch of Divinity",
      date: "April 21, 2026",
      content: "In the chaos of reality,\nI stand before the divine shrine.\nClosing my eyes,\nI gather that sacred form within.\nSlowly, I drift\nAway from the noise of the world.\nA gentle breeze…\nCaresses my cheeks,\nAn invisible touch—\nSoft, yet profound,\nWhispering of something unseen,\nSomething eternal.\nMy soul resonates\nIn that silent communion…\nAnd I find myself smiling,\nWithout knowing why."
    }
  };
  
  return poems[slug] || {
    title: "Poem Not Found",
    date: "Unknown",
    content: "The words you seek have drifted away on the wind."
  };
};

export default function PoemSubpage(props: { params: { slug: string } | Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    // Resolve params robustly to support older Next.js 14 objects, or Next.js 15 promises
    Promise.resolve(props.params).then((resolved) => {
      setSlug(resolved.slug);
    });
  }, [props.params]);

  useEffect(() => {
    if (!slug) return;
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
  }, [slug]);

  if (!slug) return null; // Avoid render flash

  const poem = getPoemBySlug(slug);

  return (
    <main className="flex flex-col w-full bg-[#F3EDE4] min-h-screen">
      
      {/* ────────────────────────────────────────────
          READING SECTION
          ──────────────────────────────────────────── */}
      <section className="relative w-full pt-40 pb-32 px-4 sm:px-6 flex flex-col items-center min-h-[80vh]">
        
        {/* Ambient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-dusty-rose/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-sage/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center reveal-on-scroll">
          <Link
            href="/heartlines"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-taupe hover:text-charcoal transition-colors duration-300 mb-12 sm:mb-16"
          >
            <span className="transform -translate-x-0 hover:-translate-x-1 transition-transform duration-300">←</span>
            Back to Collection
          </Link>

          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-taupe/60 font-semibold mb-6">{poem.date}</span>
          
          <h1 className="font-alex text-[4rem] sm:text-[6rem] md:text-[8rem] leading-[0.9] text-charcoal mb-10 sm:mb-16" style={{textShadow: "0 4px 20px rgba(0,0,0,0.03)"}}>
            {poem.title}
          </h1>

          <div className="w-px h-16 sm:h-24 bg-gradient-to-b from-warm-taupe/40 to-transparent mb-12 sm:mb-16" />

          {/* Poetry Content */}
          <div className="text-charcoal/80 font-serif font-light text-lg sm:text-xl md:text-2xl leading-[2.2] sm:leading-[2.5] italic text-center whitespace-pre-line tracking-wide">
            {poem.content}
          </div>

          {/* Footer Signature */}
          <div className="w-12 h-px bg-warm-taupe/30 mt-20 sm:mt-24 mb-6" />
          <span className="font-alex text-2xl sm:text-3xl text-warm-taupe/60">~ DeepaRam 🌙</span>
        </div>
      </section>

    </main>
  );
}

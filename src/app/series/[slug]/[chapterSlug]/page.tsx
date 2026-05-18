"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const getChapterData = (seriesSlug: string, chapterSlug: string) => {
  const data: Record<string, Record<string, any>> = {
    "a-journey-of-hope-and-heart": {
      "prologue": {
        title: "Prologue",
        date: "May 18, 2026",
        content: `Some journeys begin with a choice.
Some… with a plan.
Some … unexpectedly.
And some…
begin in ways we never truly understand.

This is one such journey.

It may seem like a story of days, events, and moments ,
of decisions taken,
of challenges faced,
of a family walking through the unexpected.

Years later…
When I look back,
I see a quiet presence
moving through it all.

There were moments we thought we were deciding.
Moments we believed we were holding things together.
Moments we felt we were losing everything.

And yet…
something unseen
was gently holding us,
guiding us,
carrying us,
preparing us.

This is not just a story of what happened.
It is a story of what was felt
in the spaces between what happened ..
in the silences,
in the waiting,
in the unanswered questions.

It is about faith ..
not loud or declared,
but trembling… searching…
slowly learning to breathe.

It is about hope …
that refused to leave
even when everything seemed uncertain.

And above all…
it is about surrender.
Because there comes a point in life
when we realise ,
we are not the authors of every page.

Some chapters are written for us.
Some paths are chosen for us.
Some turns…
are beyond us.

This journey is one of those.
A journey  of fear and faith .
If you walk through these pages,
walk gently.

Not every word is meant to be understood.
Some are meant to be felt.

Because this is not just our story…
It may, in some silent way,
be yours.`
      }
    }
  };

  return data[seriesSlug]?.[chapterSlug];
};

export default function ChapterSubpage(props: { params: { slug: string, chapterSlug: string } | Promise<{ slug: string, chapterSlug: string }> }) {
  const [slugs, setSlugs] = useState<{ slug: string, chapterSlug: string } | null>(null);

  useEffect(() => {
    Promise.resolve(props.params).then((resolved) => {
      setSlugs({ slug: resolved.slug, chapterSlug: resolved.chapterSlug });
    });
  }, [props.params]);

  useEffect(() => {
    if (!slugs) return;
    window.scrollTo(0, 0); // Reset scroll position to top when page loads

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" } // Less aggressive rootMargin for better text revealing
    );

    // Give DOM a small tick to render the dynamic content before observing
    setTimeout(() => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    }, 50);

    return () => observer.disconnect();
  }, [slugs]);

  if (!slugs) return null;

  const chapter = getChapterData(slugs.slug, slugs.chapterSlug);

  if (!chapter) {
    return (
      <main className="flex flex-col w-full bg-[#F3EDE4] min-h-screen items-center justify-center">
        <h1 className="font-alex text-4xl text-charcoal">Chapter Not Found</h1>
        <Link href={`/series/${slugs.slug}`} className="mt-4 text-warm-taupe hover:text-charcoal transition-colors">
          Back to Story
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col w-full bg-[#F3EDE4] min-h-screen overflow-x-hidden relative">

      {/* READING SECTION */}
      <section className="relative w-full pt-40 pb-32 px-4 sm:px-6 flex flex-col items-center min-h-[80vh]">

        {/* Ambient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-dusty-rose/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-sage/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center reveal-on-scroll">
          <Link
            href={`/series/${slugs.slug}`}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-taupe hover:text-charcoal transition-colors duration-300 mb-12 sm:mb-16"
          >
            <span className="transform -translate-x-0 hover:-translate-x-1 transition-transform duration-300">←</span>
            Back to Chapters
          </Link>

          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-taupe/60 font-semibold mb-6">{chapter.date}</span>

          <h1 className="font-serif text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] leading-[1.1] text-charcoal mb-8 sm:mb-12" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            {chapter.title}
          </h1>

          <div className="w-px h-16 sm:h-24 bg-gradient-to-b from-warm-taupe/40 to-transparent mb-12 sm:mb-16" />

          {/* Chapter Content */}
          <div className="w-full text-charcoal/85">
            {chapter.content.split('\n\n').map((paragraph: string, index: number) => {
              // Some custom styling for short impact lines if needed
              const isShortImpact = paragraph.length < 50 && paragraph.includes('…');

              return (
                <p
                  key={index}
                  className={`mb-8 sm:mb-12 font-serif font-light text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] leading-[2.1] sm:leading-[2.5] text-left whitespace-pre-line tracking-wide reveal-on-scroll transition-all duration-700
                    ${isShortImpact ? 'text-charcoal' : 'text-charcoal/90'}
                  `}
                  style={{ transitionDelay: `${Math.min(index * 0.05, 0.3)}s` }}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Footer Signature */}
          <div className="w-12 h-px bg-warm-taupe/30 mt-20 sm:mt-24 mb-6 reveal-on-scroll" />
          <span className="font-alex text-2xl sm:text-3xl text-warm-taupe/60 reveal-on-scroll">~ DeepaRam 🌙</span>

          {/* Next Chapter Info */}
          <div className="mt-24 md:mt-32 pt-12 border-t border-warm-taupe/10 w-full flex flex-col items-center text-center reveal-on-scroll">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-taupe/50 font-semibold mb-4">Next Chapter</span>
            <div className="flex flex-col items-center">
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
                When Destiny Chose The Hour
              </h3>
              <span className="text-[10px] uppercase tracking-[0.2em] text-warm-taupe/60 italic">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ChapterWithNav } from "@/lib/content";
import { PeacockAuraSpots, PeacockDivider, PeacockFeather } from "@/app/components/peacock-feather";
import { BirdAvatar, BirdDivider, BirdPresenceSpots, LittleBirdImage } from "@/app/components/bird-presence";

const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*|\*)/g);
  let isBold = false;
  let isItalic = false;

  return parts.map((part, index) => {
    if (part === "**") {
      isBold = !isBold;
      return null;
    }
    if (part === "*") {
      isItalic = !isItalic;
      return null;
    }

    if (isBold && isItalic) {
      return <strong key={index} className="font-semibold italic">{part}</strong>;
    } else if (isBold) {
      return <strong key={index} className="font-semibold">{part}</strong>;
    } else if (isItalic) {
      return <em key={index} className="italic text-charcoal font-normal">{part}</em>;
    }
    return part;
  }).filter(Boolean);
};

export default function ChapterClient({
  seriesSlug,
  chapter,
}: {
  seriesSlug: string;
  chapter: ChapterWithNav;
}) {
  const hasBirdEffect = Boolean(chapter.birdEffect || chapter.slug === "the-little-bird-and-the-hands-of-destiny");
  const hasFeatherEffect = !hasBirdEffect && Boolean(chapter.featherEffect || (seriesSlug === "whispers-of-the-divine" && chapter.order < 3));

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
  }, [seriesSlug, chapter.slug]);

  return (
    <main className="flex flex-col w-full bg-[#F3EDE4] min-h-screen overflow-x-hidden relative">

      {/* READING SECTION */}
      <section className="relative w-full pt-40 pb-32 px-4 sm:px-6 flex flex-col items-center min-h-[80vh]">

        {/* Ambient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-dusty-rose/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-sage/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Subtle Peacock Feather Divine Effect (For Kururamma) */}
        {hasFeatherEffect && <PeacockAuraSpots />}

        {/* Subtle Little Bird Presence Effect (For The Little Bird story) */}
        {hasBirdEffect && <BirdPresenceSpots />}

        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
          <header className="w-full flex flex-col items-center reveal-on-scroll">
            <Link
              href={`/series/${seriesSlug}`}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-taupe hover:text-charcoal transition-colors duration-300 mb-12 sm:mb-16"
            >
              <span className="transform -translate-x-0 hover:-translate-x-1 transition-transform duration-300">←</span>
              Back to Chapters
            </Link>

            <div className="flex flex-col items-center mb-6">
              {chapter.chapterLabel && (
                <span className="text-[12px] sm:text-sm uppercase tracking-[0.3em] text-warm-taupe mb-3 font-medium">
                  {chapter.chapterLabel}
                </span>
              )}
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-taupe/60 font-semibold">
                {chapter.displayDate}
              </span>
            </div>

            <h1 className="font-serif text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] leading-[1.1] text-charcoal mb-8 sm:mb-12" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              {chapter.title}
            </h1>

            {hasBirdEffect ? (
              <BirdDivider className="mb-12 sm:mb-16 reveal-on-scroll" />
            ) : hasFeatherEffect ? (
              <PeacockDivider className="mb-12 sm:mb-16 reveal-on-scroll" />
            ) : (
              <div className="w-px h-16 sm:h-24 bg-gradient-to-b from-warm-taupe/40 to-transparent mb-12 sm:mb-16" />
            )}
          </header>

          {/* Optional Top-Level Featured Image (Full Square Photo) */}
          {chapter.image && (
            <div className="w-full mb-12 sm:mb-16 flex justify-center reveal-on-scroll relative">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-warm-taupe/20 bg-white/40 max-w-sm sm:max-w-md w-full aspect-square">
                <Image
                  src={chapter.image.startsWith("/") ? chapter.image : `/${chapter.image}`}
                  alt={chapter.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 448px"
                  className="object-cover filter contrast-[1.02] brightness-[0.98]"
                  priority
                />
              </div>
            </div>
          )}

          {/* Chapter Content */}
          <div className="w-full text-charcoal/85">
            {chapter.content.split('\n\n').map((paragraph: string, index: number) => {
              if (paragraph.startsWith("[IMAGE:")) {
                const src = paragraph.replace("[IMAGE:", "").replace("]", "");
                return (
                  <div key={index} className="w-full mt-8 mb-4 sm:mt-10 sm:mb-6 flex justify-center reveal-on-scroll relative" style={{ transitionDelay: `${Math.min(index * 0.05, 0.3)}s` }}>
                    <Image
                      src={`/${src}`}
                      alt="Story illustration"
                      width={800}
                      height={600}
                      className="rounded-2xl shadow-sm w-full max-w-md h-auto object-cover opacity-95 filter brightness-[0.95]"
                    />
                  </div>
                );
              }

              let cleanParagraph = paragraph;
              let isCentered = false;
              if (cleanParagraph.startsWith("### ")) {
                const headingText = cleanParagraph.replace("### ", "").trim();
                return (
                  <div key={index} className="pt-8 sm:pt-12 pb-4 reveal-on-scroll" style={{ transitionDelay: `${Math.min(index * 0.05, 0.3)}s` }}>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal font-normal tracking-wide mb-3 text-left">
                      {headingText}
                    </h2>
                    <div className="w-12 h-px bg-warm-taupe/40 mb-6" />
                  </div>
                );
              }

              if (cleanParagraph.startsWith("[CENTER]")) {
                isCentered = true;
                cleanParagraph = cleanParagraph.replace("[CENTER]", "").trim();
              } else if (cleanParagraph.toLowerCase().startsWith("to be continued")) {
                isCentered = true;
              }

              const isShortImpact = cleanParagraph.length < 50 && (cleanParagraph.includes('…') || cleanParagraph.includes('..'));
              const isContinued = cleanParagraph.toLowerCase().startsWith("to be continued");

              if (isContinued && chapter.nav.next) {
                return (
                  <div key={index} className="w-full flex flex-col items-center pt-8 pb-4 reveal-on-scroll" style={{ transitionDelay: `${Math.min(index * 0.05, 0.3)}s` }}>
                    <Link
                      href={`/series/${seriesSlug}/${chapter.nav.next.slug}`}
                      className="group inline-flex flex-col sm:flex-row items-center gap-3 px-8 py-4 rounded-full bg-white/50 border border-warm-taupe/20 hover:bg-white/90 hover:border-warm-taupe/40 backdrop-blur-md transition-all duration-400 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    >
                      <span className="font-serif italic text-warm-taupe group-hover:text-charcoal tracking-widest text-base sm:text-lg transition-colors">
                        {renderFormattedText(cleanParagraph)}
                      </span>
                      <span className="hidden sm:inline text-warm-taupe/40">·</span>
                      <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-warm-taupe group-hover:text-charcoal flex items-center gap-1.5 transition-colors">
                        Continue to {chapter.nav.next.chapterLabel || "Next Chapter"}
                        <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </Link>
                  </div>
                );
              }

              return (
                <p
                  key={index}
                  className={`mb-8 sm:mb-12 font-serif font-light text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] leading-[2.1] sm:leading-[2.5] whitespace-pre-line tracking-wide reveal-on-scroll transition-all duration-700
                    ${isCentered ? 'text-center' : 'text-left'}
                    ${isContinued ? 'italic text-warm-taupe/90 tracking-widest text-lg sm:text-xl pt-4' : isShortImpact ? 'text-charcoal' : 'text-charcoal/90'}
                  `}
                  style={{ transitionDelay: `${Math.min(index * 0.05, 0.3)}s` }}
                >
                  {renderFormattedText(cleanParagraph)}
                </p>
              );
            })}
          </div>

          {/* Gratitude Section */}
          {chapter.gratitude && (
            <div className="w-full mt-16 sm:mt-24 p-8 sm:p-12 rounded-[2.5rem] bg-white/30 border border-white/50 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.01)] text-left reveal-on-scroll">
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mb-2 tracking-wide">
                {chapter.gratitude.title}
              </h2>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-taupe/70 font-semibold mb-8">
                {chapter.gratitude.subtitle}
              </p>
              <ul className="flex flex-col gap-6 sm:gap-7">
                {chapter.gratitude.items.map((item, idx: number) => (
                  <li key={idx} className="flex items-start gap-3.5 sm:gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-warm-taupe/60 mt-2.5 flex-shrink-0" />
                    <div className="flex flex-col gap-1 text-left flex-1">
                      <span className="font-serif font-medium text-charcoal text-[1.05rem] sm:text-[1.15rem] leading-snug">
                        {item.name}
                      </span>
                      {item.role && (
                        <p className="italic font-light text-charcoal/75 text-sm sm:text-[0.95rem] leading-relaxed">
                          {item.role}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Signature */}
          <div className="flex items-center justify-center gap-3 mt-8 sm:mt-12 mb-5 reveal-on-scroll">
            <div className="w-8 h-px bg-warm-taupe/30" />
            {hasBirdEffect ? (
              <LittleBirdImage width={28} height={34} glow={false} className="opacity-80" />
            ) : hasFeatherEffect ? (
              <PeacockFeather width={20} height={34} className="transform rotate-12 opacity-80" />
            ) : null}
            <div className="w-8 h-px bg-warm-taupe/30" />
          </div>
          <span className="font-alex text-2xl sm:text-3xl text-warm-taupe/60 reveal-on-scroll">~ DeepaRam 🌙</span>

          {/* Dynamic Chapter Navigation */}
          {chapter.nav.previous || chapter.nav.next ? (
            <div className="mt-24 md:mt-32 pt-12 border-t border-warm-taupe/10 w-full flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-12 sm:gap-8 reveal-on-scroll">
              {chapter.nav.previous ? (
                <div className="flex flex-col items-center sm:items-start flex-1">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-taupe/50 font-semibold mb-4">
                    Previous Chapter
                  </span>
                  <Link href={`/series/${seriesSlug}/${chapter.nav.previous.slug}`} className="group flex flex-col items-center sm:items-start">
                    {chapter.nav.previous.chapterLabel && (
                      <span className="text-[10px] uppercase tracking-[0.2em] text-warm-taupe/80 font-semibold mb-1 group-hover:text-charcoal transition-colors duration-300">
                        {chapter.nav.previous.chapterLabel}
                      </span>
                    )}
                    <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2 group-hover:text-warm-taupe transition-colors duration-300">
                      {chapter.nav.previous.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-taupe group-hover:text-charcoal transition-colors duration-300">
                      <span className="transform -translate-x-0 group-hover:-translate-x-1 transition-transform duration-300">←</span>
                      Read
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}

              {chapter.nav.next ? (
                <div className="flex flex-col items-center sm:items-end flex-1">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-taupe/50 font-semibold mb-4">
                    Next Chapter
                  </span>
                  <Link href={`/series/${seriesSlug}/${chapter.nav.next.slug}`} className="group flex flex-col items-center sm:items-end">
                    {chapter.nav.next.chapterLabel && (
                      <span className="text-[10px] uppercase tracking-[0.2em] text-warm-taupe/80 font-semibold mb-1 group-hover:text-charcoal transition-colors duration-300">
                        {chapter.nav.next.chapterLabel}
                      </span>
                    )}
                    <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2 group-hover:text-warm-taupe transition-colors duration-300">
                      {chapter.nav.next.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-taupe group-hover:text-charcoal transition-colors duration-300">
                      Read
                      <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}
            </div>
          ) : (
            <div className="mt-20 md:mt-24 pt-10 border-t border-warm-taupe/10 w-full flex justify-center reveal-on-scroll">
              <Link
                href={`/series/${seriesSlug}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/50 border border-warm-taupe/20 hover:bg-white/90 hover:border-warm-taupe/40 text-[10px] uppercase tracking-[0.25em] font-semibold text-warm-taupe hover:text-charcoal transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span className="transform -translate-x-0 hover:-translate-x-1 transition-transform">←</span>
                Back to All Stories
              </Link>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

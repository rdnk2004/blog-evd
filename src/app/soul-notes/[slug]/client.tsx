"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SoulNote } from "@/lib/content";

export default function NoteClient({ note }: { note: SoulNote }) {
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
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [note.slug]);

  return (
    <main className="flex flex-col w-full bg-[#F3EDE4] min-h-screen selection:bg-warm-taupe/20 overflow-x-hidden relative">
      
      {/* READING CONTAINER */}
      <article className="relative w-full pt-32 pb-24 px-6 sm:px-8 md:px-12 flex flex-col items-center flex-1">
        
        {/* Background glow for reading focus */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] h-[50vh] bg-white/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-2xl xl:max-w-3xl w-full relative z-10">
          
          {/* META & TITLE */}
          <header className="mb-16 md:mb-20 text-center reveal-on-scroll flex flex-col items-center">
            
            <Link 
              href="/soul-notes"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-taupe hover:text-charcoal transition-colors duration-300 mb-10 sm:mb-12"
            >
              <span className="transform -translate-x-0 hover:-translate-x-1 transition-transform duration-300">←</span>
              Back to Notes
            </Link>

            <div className="flex items-center justify-center gap-2 mb-6 md:mb-8 text-[10px] uppercase tracking-[0.2em] text-warm-taupe/80 font-semibold">
              <span>{note.displayDate}</span>
              <span className="opacity-40">·</span>
              <span>{note.readTime}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal leading-tight mb-8">
              {note.title}
            </h1>

            <div className="flex justify-center">
              <div className="h-px w-24 bg-warm-taupe/30" />
            </div>
          </header>

          {/* Optional Top-Level Featured Image */}
          {note.image && (
            <div className="w-full my-8 sm:my-12 flex justify-center reveal-on-scroll relative">
              <Image 
                src={note.image.startsWith("/") ? note.image : `/${note.image}`} 
                alt={note.title} 
                width={800}
                height={500}
                className="rounded-2xl shadow-sm w-full max-w-xl h-auto object-cover opacity-95 filter brightness-[0.98]"
              />
            </div>
          )}

          {/* CONTENT */}
          <div className="w-full text-charcoal/85">
            {note.content.map((paragraph, index) => {
              if (paragraph.startsWith("[IMAGE:")) {
                const src = paragraph.replace("[IMAGE:", "").replace("]", "");
                return (
                  <div key={index} className="w-full my-12 sm:my-16 flex justify-center reveal-on-scroll relative" style={{ transitionDelay: `${Math.min(index * 0.03, 0.3)}s` }}>
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

              if (paragraph === "A Path I Chose, A Path Yet to Find") {
                return (
                  <div key={index} className="my-12 sm:my-16 text-center reveal-on-scroll" style={{ transitionDelay: `${Math.min(index * 0.03, 0.3)}s` }}>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="h-px w-10 sm:w-16 bg-warm-taupe/40" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-warm-taupe font-semibold">Reflection</span>
                      <div className="h-px w-10 sm:w-16 bg-warm-taupe/40" />
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal leading-snug">
                      {paragraph}
                    </h2>
                  </div>
                );
              }

              const isDialogue = paragraph.startsWith("“") || paragraph.startsWith("\"");
              const isShortThought = paragraph === "Will this fall off?" || 
                                     paragraph === "Perhaps there is a reason for this." ||
                                     paragraph === "Mother, why did that thought come to me yesterday? Why did I lose it?" ||
                                     paragraph === "Will I find an earring before I leave this place?" ||
                                     paragraph === "Perhaps this, too, is part of the journey." ||
                                     paragraph === "Perhaps the path I chose was not entirely the path I was meant to follow." ||
                                     paragraph === "Yet, I often strayed because I failed to heed those signs." ||
                                     paragraph === "And here I stand...still, alone, and searching for my way, yet to find the path that feels truly mine.";
                                     
              const linkRegex = /\[(.*?)\]\((.*?)\)/g;
              const hasLink = linkRegex.test(paragraph);

              let content: ReactNode = paragraph;
              if (hasLink) {
                const elements: ReactNode[] = [];
                let lastIndex = 0;
                let match;
                linkRegex.lastIndex = 0;
                while ((match = linkRegex.exec(paragraph)) !== null) {
                  elements.push(paragraph.substring(lastIndex, match.index));
                  elements.push(<Link key={match.index} href={match[2]} className="text-warm-taupe hover:text-charcoal underline transition-colors">{match[1]}</Link>);
                  lastIndex = linkRegex.lastIndex;
                }
                elements.push(paragraph.substring(lastIndex));
                content = elements;
              }

              return (
                <p 
                  key={index} 
                  className={`mb-6 sm:mb-8 md:mb-10 text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] leading-[2] sm:leading-[2.2] font-light reveal-on-scroll transition-all duration-700
                    ${isDialogue ? 'italic ml-4 sm:ml-8 border-l border-warm-taupe/30 pl-4 sm:pl-6 text-charcoal/90' : ''}
                    ${isShortThought ? 'italic text-charcoal/90 text-center' : ''}
                  `}
                  style={{ transitionDelay: `${Math.min(index * 0.03, 0.3)}s` }}
                >
                  {content}
                </p>
              );
            })}
          </div>

          {/* FOOTER */}
          <footer className="mt-20 pt-12 border-t border-warm-taupe/20 flex flex-col items-center justify-center text-center reveal-on-scroll">
            <p className="text-charcoal/40 italic font-serif mb-8 text-xl">Thank you for sharing this space.</p>
            <Link 
              href="/soul-notes"
              className="inline-flex items-center gap-3 px-8 py-4 border border-charcoal/20 text-charcoal text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-charcoal hover:text-[#F3EDE4] transition-all duration-400 shadow-sm"
            >
              Read More Notes
            </Link>
          </footer>

        </div>
      </article>

    </main>
  );
}

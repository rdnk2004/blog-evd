"use client";

import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────
   HERO SECTION
   ──────────────────────────────────────────── */

function Petal({
  style,
  color,
}: {
  style: React.CSSProperties;
  color: string;
}) {
  return (
    <div
      className="petal pointer-events-none"
      style={{ background: color, ...style }}
    />
  );
}

function HeroSection() {
  const petals = [
    { left: "5%", animationDuration: "12s", animationDelay: "0s", color: "#D8B4A8cc" },
    { left: "15%", animationDuration: "9s", animationDelay: "2s", color: "#A8B5A1aa" },
    { left: "28%", animationDuration: "14s", animationDelay: "1s", color: "#D8B4A888" },
    { left: "42%", animationDuration: "10s", animationDelay: "4s", color: "#A6B6C888" },
    { left: "58%", animationDuration: "11s", animationDelay: "0.5s", color: "#D8B4A8bb" },
    { left: "70%", animationDuration: "13s", animationDelay: "3s", color: "#A8B5A1bb" },
    { left: "82%", animationDuration: "8s", animationDelay: "1.5s", color: "#D8B4A8aa" },
    { left: "93%", animationDuration: "15s", animationDelay: "2.5s", color: "#A6B6C8bb" },
  ];

  return (
    <section className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Bottom section transition — fades hero into the warm beige of JourneySection */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[10] pointer-events-none"
        style={{
          height: "22%",
          background: "linear-gradient(to bottom, transparent 0%, #F7F2EB 100%)",
        }}
      />
      {/* Sky gradient — layered dusk palette */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(175deg, #6B8CAE 0%, #9EB8C5 18%, #CFA989 42%, #E8C9A0 58%, #F0DFC0 75%, #F7EDD8 90%, #F3EDE4 100%)",
        }}
      />

      {/* Stars */}
      {[
        { top: "8%", left: "12%", s: "6px", d: "0s" },
        { top: "12%", left: "30%", s: "4px", d: "0.5s" },
        { top: "6%", left: "55%", s: "5px", d: "1.1s" },
        { top: "10%", left: "72%", s: "3px", d: "0.3s" },
        { top: "5%", left: "85%", s: "6px", d: "1.4s" },
        { top: "16%", left: "92%", s: "4px", d: "0.8s" },
        { top: "18%", left: "18%", s: "3px", d: "1.7s" },
        { top: "22%", left: "45%", s: "4px", d: "2.1s" },
        { top: "14%", left: "62%", s: "5px", d: "0.6s" },
      ].map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.s,
            height: star.s,
            background: "white",
            boxShadow: "0 0 8px 2px rgba(255,255,255,0.8)",
            animation: `twinkle ${2.5 + i * 0.3}s ease-in-out infinite`,
            animationDelay: star.d,
          }}
        />
      ))}

      {/* Perfect Glowing Moon */}
      <div
        className="absolute z-0 rounded-full"
        style={{
          top: "10%",
          right: "15%",
          width: "min(70px, 10vw)",
          height: "min(70px, 10vw)",
          background: "radial-gradient(circle at 30% 30%, #FFFFFA 0%, #F5F0E6 60%, #E0D5C1 100%)",
          boxShadow: "0 0 40px 10px rgba(255,255,230,0.6), 0 0 100px 30px rgba(255,250,200,0.3), inset -6px -6px 12px rgba(200,180,150,0.3)",
        }}
      />

      {/* Birds */}
      <div className="absolute z-0 animate-drift" style={{ top: "28%", left: "18%" }}>
        <svg viewBox="0 0 80 30" className="w-16 h-6 md:w-24 md:h-8 fill-[#4A5D6E]/40">
          <path d="M0 15 Q10 5 20 15 Q30 25 40 15 M48 12 Q56 4 62 12 Q68 20 74 12" stroke="#4A5D6E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="absolute z-0" style={{ top: "22%", left: "30%", animationDelay:"2s" }}>
        <svg viewBox="0 0 40 15" className="w-8 h-4 md:w-12 md:h-5 animate-drift" style={{ animationDelay: "1.5s" }}>
          <path d="M0 8 Q5 2 10 8 Q15 14 20 8 M25 6 Q30 2 35 6" stroke="#4A5D6E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
        </svg>
      </div>



      {/* Falling petals */}
      {petals.map((p, i) => (
        <Petal
          key={i}
          color={p.color}
          style={{
            left: p.left,
            top: "-20px",
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            width: `${6 + (i % 3) * 2}px`,
            height: `${8 + (i % 3) * 3}px`,
          }}
        />
      ))}

      {/* Hero text content */}
      <div
        className="relative z-20 text-center flex flex-col items-center px-4 md:px-6 mt-[-12vh] md:mt-[-18vh]"
        style={{ maxWidth: "960px", margin: "0 auto" }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4 md:mb-5">
          <div className="h-px w-10 md:w-16 bg-charcoal/30" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold text-charcoal/60">
            A creative sanctuary
          </span>
          <div className="h-px w-10 md:w-16 bg-charcoal/30" />
        </div>

        {/* Main heading */}
        <h1
          className="font-alex text-[5rem] sm:text-[7rem] md:text-[10rem] leading-none text-charcoal mb-5 md:mb-6"
          style={{
            textShadow: "0 4px 30px rgba(255,255,255,0.8), 0 1px 0 rgba(255,255,255,0.5)",
            letterSpacing: "0.04em",
          }}
        >
          DeepaRam
        </h1>

        {/* Tagline pill */}
        <div className="glass-card px-6 py-3 md:px-10 md:py-4 rounded-full mb-8 md:mb-12 border border-white/50 bg-white/40 shadow-sm">
          <p className="text-charcoal/75 uppercase tracking-[0.3em] text-[9px] md:text-[11px] font-semibold">
            Painting emotions in stillness
          </p>
        </div>

        {/* Category tags */}
        <div className="glass-card flex flex-wrap justify-center items-center gap-2 md:gap-0 px-2 py-3 md:py-0 rounded-[2rem] md:rounded-full border border-white/50 bg-white/40 shadow-sm w-auto">
          {[
            { label: "Nature", color: "#A8B5A1" },
            { label: "Art", color: "#A6B6C8" },
            { label: "Words", color: "#D8B4A8" },
            { label: "Silence", color: "#C4B09A" },
            { label: "Soul", color: "#B8AABB" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-1 md:gap-2">
              <a
                href={`#${item.label.toLowerCase()}`}
                className="px-3 md:px-4 py-2 md:py-3 text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-charcoal/70 hover:text-charcoal transition-all duration-300 rounded-full hover:bg-white/40"
              >
                {item.label}
              </a>
              {i < 4 && (
                <span className="text-charcoal/20 text-xs hidden md:inline">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   JOURNEY SECTION
   ──────────────────────────────────────────── */

function JourneySection() {
  return (
    <section
      id="journey"
      className="w-full bg-gradient-to-b from-[#F7F2EB] to-[#F3EDE4] py-24 md:py-36 px-6 relative overflow-hidden"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-[-5%] right-[-5%] w-[45vw] h-[45vw] bg-misty-blue/8 rounded-full blur-[150px] pointer-events-none animate-breathe" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[50vw] h-[50vw] bg-dusty-rose/8 rounded-full blur-[150px] pointer-events-none animate-breathe" style={{ animationDelay: "3s" }} />

      {/* Decorative mandala-like ring */}
      <div
        className="absolute right-[-8%] top-[10%] w-[30vw] h-[30vw] rounded-full border border-warm-taupe/10 animate-rotate-slow pointer-events-none"
      >
        <div className="absolute inset-4 rounded-full border border-warm-taupe/8" />
        <div className="absolute inset-10 rounded-full border border-warm-taupe/6" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Text col */}
        <div className="space-y-7 text-center reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-warm-taupe/50" />
            <span className="uppercase tracking-[0.28em] text-[10px] font-bold text-warm-taupe">
              The Story
            </span>
            <div className="h-px w-12 bg-warm-taupe/50" />
          </div>

          <h2 className="font-alex text-6xl sm:text-7xl md:text-8xl text-charcoal leading-tight">
            The Journey
          </h2>

          {/* Decorative quote */}
          <blockquote className="relative pl-5 border-l-2 border-dusty-rose/50 text-left italic text-warm-taupe text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            "In every leaf, in every silence, in every stroke of color — I find a fragment of the infinite."
          </blockquote>

          <div className="space-y-5 text-base md:text-lg leading-relaxed text-charcoal/70 font-light max-w-2xl mx-auto">
            <p>
              Welcome to a space where silence speaks volumes and colors breathe
              life into emotions. Here, we explore the delicate balance between
              the soul's quietest whispers and the vibrant expressions of nature.
            </p>
            <p>
              Every stroke, every word, every moment of stillness is an
              invitation to journey inward—to find peace amidst the noise, and
              meaning in the seemingly mundane.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 py-6 border-t border-b border-warm-taupe/15 max-w-2xl mx-auto">
            {[
              { num: "120+", label: "Art Works" },
              { num: "48", label: "Journal Entries" },
              { num: "4", label: "Years Creating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-alex text-4xl text-charcoal mb-1">{stat.num}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-warm-taupe font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a
              href="#journal"
              className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-soft-beige text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-warm-taupe transition-all duration-400 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Read My Journal
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   FEATURED / QUOTE SECTION
   ──────────────────────────────────────────── */

function QuoteSection() {
  return (
    <section className="w-full py-20 md:py-28 px-6 bg-charcoal text-soft-beige relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-px bg-gradient-to-r from-transparent via-warm-taupe/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-px bg-gradient-to-r from-transparent via-warm-taupe/40 to-transparent" />

      <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
        <div className="font-alex text-[8rem] md:text-[12rem] text-warm-taupe/10 leading-none select-none" aria-hidden>
          "
        </div>
        <blockquote className="-mt-16 md:-mt-20 font-serif text-2xl md:text-3xl lg:text-4xl text-soft-beige/90 leading-relaxed font-light italic">
          In silence, I paint.{" "}
          <span className="text-dusty-rose/80">In words, I breathe.</span>{" "}
          <span className="text-sage/80">In stillness, I become.</span>
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-warm-taupe/30" />
          <span className="font-alex text-2xl text-warm-taupe/60">DeepaRam</span>
          <div className="h-px w-12 bg-warm-taupe/30" />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   JOURNAL PREVIEW SECTION
   ──────────────────────────────────────────── */

const posts = [
  {
    title: "The Language of Leaves",
    date: "October 12, 2026",
    readTime: "4 min read",
    category: "Nature",
    categoryColor: "#A8B5A1",
    excerpt:
      "Listening to the autumn breeze as it carries the stories of ancient trees and forgotten times into the quiet spaces of the heart.",
    tag: "🍃",
  },
  {
    title: "Colors of the Dawn",
    date: "September 28, 2026",
    readTime: "5 min read",
    category: "Art",
    categoryColor: "#A6B6C8",
    excerpt:
      "Waking before the sun to capture the elusive gradient of morning sky on canvas — where poetry and pigment meet.",
    tag: "🎨",
  },
  {
    title: "Embracing the Void",
    date: "September 15, 2026",
    readTime: "6 min read",
    category: "Silence",
    categoryColor: "#D8B4A8",
    excerpt:
      "Why the moments between our thoughts are just as important as the thoughts themselves. A meditation on stillness.",
    tag: "🌕",
  },
];

function JournalCard({
  post,
  index,
}: {
  post: (typeof posts)[0];
  index: number;
}) {
  return (
    <article
      className="group cursor-pointer flex flex-col rounded-3xl overflow-hidden border border-warm-taupe/10 bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-2 reveal-on-scroll"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Content */}
      <div className="flex flex-col gap-4 p-7 md:p-8 flex-1">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] text-warm-taupe/70 font-medium tracking-wide">
          <span style={{ color: post.categoryColor }} className="font-bold border border-warm-taupe/20 px-2 py-0.5 rounded-full bg-warm-taupe/5">{post.tag} {post.category}</span>
          <span className="opacity-40">·</span>
          <span>{post.date}</span>
          <span className="opacity-40">·</span>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl md:text-3xl text-charcoal group-hover:text-warm-taupe transition-colors duration-400 leading-snug font-medium">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-charcoal/60 leading-relaxed font-light flex-1">
          {post.excerpt}
        </p>

        {/* Read more */}
        <div
          className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-400"
          style={{ color: post.categoryColor }}
        >
          <span>Read More</span>
          <svg
            className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </div>
      </div>
    </article>
  );
}

function JournalSection() {
  return (
    <section id="journal" className="w-full py-24 md:py-36 px-6 bg-[#F3EDE4] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-sage/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-misty-blue/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 md:mb-20 text-center reveal-on-scroll">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px w-8 md:w-14 bg-warm-taupe/40" />
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-warm-taupe">Journal</span>
            <div className="h-px w-8 md:w-14 bg-warm-taupe/40" />
          </div>
          <h2 className="font-alex text-6xl sm:text-7xl md:text-8xl text-charcoal mb-5">
            Recent Whispers
          </h2>
          <p className="text-charcoal/50 font-light text-base md:text-lg max-w-md leading-relaxed">
            Thoughts and reflections from the quiet spaces between heartbeats.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, i) => (
            <JournalCard key={i} post={post} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 md:mt-20 reveal-on-scroll">
          <a
            href="/journal"
            className="inline-flex items-center gap-3 px-10 py-4 border-2 border-charcoal text-charcoal text-xs uppercase tracking-[0.22em] font-semibold rounded-full hover:bg-charcoal hover:text-soft-beige transition-all duration-400 shadow-md hover:shadow-2xl transform hover:-translate-y-0.5"
          >
            Explore All Entries
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   PAGE ROOT
   ──────────────────────────────────────────── */

export default function Home() {
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
    <div className="flex flex-col w-full">
      <HeroSection />
      <JourneySection />
      <QuoteSection />
      <JournalSection />
    </div>
  );
}

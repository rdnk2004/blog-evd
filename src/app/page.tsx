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
    <section className="relative w-full h-screen min-h-[500px] sm:min-h-[680px] flex items-center justify-center overflow-hidden">
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

      {/* Perfect Glowing Crescent Moon */}
      <div
        className="absolute z-0"
        style={{
          top: "8%",
          right: "15%",
          width: "min(70px, 10vw)",
          height: "min(70px, 10vw)",
          filter: "drop-shadow(0 0 15px rgba(255,255,230,0.8)) drop-shadow(0 0 50px rgba(255,250,200,0.4))",
          transform: "rotate(-15deg)",
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#FFFFFA]">
          <mask id="crescentMask">
            <rect width="100" height="100" fill="white" />
            <circle cx="35" cy="40" r="48" fill="black" />
          </mask>
          <circle cx="50" cy="50" r="48" mask="url(#crescentMask)" />
        </svg>
      </div>

      {/* The sky is clear and peaceful tonight, no distracting birds */}
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
        className="relative z-20 text-center flex flex-col items-center px-4 sm:px-6 mt-[-10vh] sm:mt-[-12vh] md:mt-[-18vh]"
        style={{ maxWidth: "960px", margin: "0 auto" }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-2 sm:gap-3 mb-4 md:mb-5">
          <div className="h-px w-8 sm:w-10 md:w-16 bg-charcoal/30" />
          <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.35em] font-semibold text-charcoal/60">
            A creative sanctuary
          </span>
          <div className="h-px w-8 sm:w-10 md:w-16 bg-charcoal/30" />
        </div>

        {/* Main heading */}
        <h1
          className="font-alex text-[4rem] sm:text-[6rem] md:text-[10rem] leading-none text-charcoal mb-4 sm:mb-5 md:mb-6"
          style={{
            textShadow: "0 4px 30px rgba(255,255,255,0.8), 0 1px 0 rgba(255,255,255,0.5)",
            letterSpacing: "0.04em",
          }}
        >
          DeepaRam
        </h1>

        {/* Tagline pill */}
        <div className="glass-card px-6 py-3 md:px-10 md:py-4 rounded-full mb-8 md:mb-12 border border-white/50 bg-white/40 shadow-sm w-max mx-auto">
          <p className="text-charcoal/75 uppercase tracking-[0.3em] text-[9px] md:text-[11px] font-semibold">
            Painting emotions in stillness
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-8 mt-2">
          {[
            { label: "Nature", href: "#nature" },
            { label: "Art", href: "#art" },
            { label: "Words", href: "#words" },
            { label: "Silence", href: "#silence" },
            { label: "Soul", href: "#soul" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-4 md:gap-8">
              <a
                href={item.href}
                className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-charcoal/60 hover:text-charcoal transition-all duration-300 relative group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-charcoal/40 group-hover:w-full transition-all duration-500"></span>
              </a>
              {i < 4 && <span className="text-charcoal/30 select-none text-[8px] sm:text-[10px]">✦</span>}
            </div>
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
      className="w-full bg-gradient-to-b from-[#F7F2EB] to-[#F3EDE4] py-20 px-4 sm:px-6 md:py-36 relative overflow-hidden"
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
            About Me
          </h2>

          {/* Decorative quote */}
          <blockquote className="relative pl-5 border-l-2 border-dusty-rose/50 text-left italic text-warm-taupe text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            "A gentle soul with a heart that feels deeply and a mind that turns moments into quiet poetry."
          </blockquote>

          <div className="space-y-5 text-base md:text-lg leading-relaxed text-charcoal/70 font-light max-w-2xl mx-auto">
            <p>
              DeepaRam writes from a place where emotions meet stillness. Her words are not just written, but felt..shaped by quiet reflections,spiritual experiences and the gentle unfolding of everyday moments. With a heart deeply attuned to the unseen and a soul that finds meaning in silence, she transforms life’s subtle whispers into poetic expressions.
            </p>
            <p>
              Through her writing, she invites readers into a world of introspection, where pain softens, love lingers and the divine quietly reveals itself. Each piece is a journey..tender,honest and deeply personal..yet universally resonant.
            </p>
            <p>
              In every line she pens, there is a piece of her soul..soft, sincere and beautifully aware.
            </p>
            
            <div className="pt-4 text-center italic text-warm-taupe/90 space-y-1">
              <p>Pause here for a while….</p>
              <p>Breathe….</p>
              <p>Feel….</p>
              <p>And perhaps,</p>
              <p>Somewhere within these words,</p>
              <p>You may find a part of yourself.</p>
            </div>
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
   HEARTLINES SECTION (POEMS HOMEPAGE PREVIEW)
   ──────────────────────────────────────────── */

const previewPoems = [
  {
    title: "A Gentle Return to Self",
    snippet: "The first twenty years of my life\nwere a small, quiet circle —\njust me,\nmy studies,\nstory books...",
    slug: "a-gentle-return-to-self",
    date: "April 21, 2026",
  },
  {
    title: "The Invisible Touch of Divinity",
    snippet: "In the chaos of reality,\nI stand before the divine shrine.\nClosing my eyes,\nI gather that sacred form within.",
    slug: "the-invisible-touch-of-divinity",
    date: "April 21, 2026",
  }
];

function HeartlinesSection() {
  return (
    <section id="heartlines" className="w-full py-16 px-4 sm:px-6 md:py-32 bg-[#F3EDE4] relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[10%] w-[40vw] h-[40vw] bg-dusty-rose/8 rounded-full blur-[140px] pointer-events-none animate-breathe" />
      <div className="absolute bottom-[-10%] left-[10%] w-[30vw] h-[30vw] bg-misty-blue/8 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Text Col */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left reveal-on-scroll">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="h-px w-6 sm:w-8 md:w-12 bg-warm-taupe/40" />
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-warm-taupe">Heartlines</span>
            <div className="h-px w-6 sm:w-8 md:w-12 bg-warm-taupe/40 md:hidden" />
          </div>
          <h2 className="font-alex text-5xl sm:text-7xl text-charcoal mb-4 sm:mb-6 leading-tight">
            Moments in Verse
          </h2>
          <p className="text-charcoal/50 font-light text-sm sm:text-base leading-relaxed mb-8">
            Quiet poetry reflecting on nature, the passage of time, and the silent dialogues of the soul.
          </p>
          <a
            href="/heartlines"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 border border-warm-taupe/20 text-charcoal bg-white/40 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold rounded-full hover:bg-white hover:shadow-lg transition-all duration-400"
          >
            Read the Poetry
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Poems Col */}
        <div className="md:w-2/3 grid sm:grid-cols-2 gap-6 md:gap-8 relative w-full">
           {previewPoems.map((poem, i) => (
             <a
               key={i}
               href={`/heartlines/${poem.slug}`}
               className="group flex flex-col items-center text-center p-8 sm:p-10 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-md hover:bg-white/80 transition-all duration-500 reveal-on-scroll shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
               style={{ transitionDelay: `${i * 0.15}s` }}
             >
                <span className="text-[10px] uppercase tracking-[0.2em] text-warm-taupe/60 font-semibold mb-6">{poem.date}</span>
                <h3 className="font-serif text-2xl text-charcoal mb-6 italic group-hover:text-warm-taupe transition-colors duration-300">
                  {poem.title}
                </h3>
                <p className="text-charcoal/70 font-light text-sm leading-loose italic whitespace-pre-line">
                  {poem.snippet}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-dusty-rose group-hover:text-warm-taupe transition-colors duration-400">
                  Read
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
             </a>
           ))}
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
    <section className="w-full py-16 px-4 sm:px-6 md:py-28 bg-charcoal text-soft-beige relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-px bg-gradient-to-r from-transparent via-warm-taupe/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-px bg-gradient-to-r from-transparent via-warm-taupe/40 to-transparent" />

      <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
        <div className="font-alex text-[6rem] sm:text-[8rem] md:text-[12rem] text-warm-taupe/10 leading-none select-none" aria-hidden>
          "
        </div>
        <blockquote className="-mt-10 sm:-mt-16 md:-mt-20 font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-soft-beige/90 leading-relaxed font-light italic">
          In silence, I paint.{" "}
          <span className="text-dusty-rose/80">In words, I breathe.</span>{" "}
          <span className="text-sage/80">In stillness, I become.</span>
        </blockquote>
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4">
          <div className="h-px w-8 sm:w-12 bg-warm-taupe/30" />
          <span className="font-alex text-xl sm:text-2xl text-warm-taupe/60">DeepaRam</span>
          <div className="h-px w-8 sm:w-12 bg-warm-taupe/30" />
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
    title: "The Mother’s Silent Answer",
    date: "October 18, 2025",
    readTime: "3 min read",
    category: "Soul",
    categoryColor: "#D8B4A8",
    slug: "the-mothers-silent-answer",
    excerpt:
      "There is a belief often heard among devotees—that one reaches Tirumala Venkateswara Temple only when Venkateswara calls. It is not a place one simply decides to visit. It is a journey that unfolds when the divine wills it.",
    tag: "🌸",
  }
];

function JournalSection() {
  return (
    <section id="journal" className="w-full py-16 px-4 sm:px-6 md:py-32 bg-[#F3EDE4] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-sage/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-misty-blue/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Text Col */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left reveal-on-scroll">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="h-px w-6 sm:w-8 md:w-12 bg-warm-taupe/40" />
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-warm-taupe">Soul Notes</span>
            <div className="h-px w-6 sm:w-8 md:w-12 bg-warm-taupe/40 md:hidden" />
          </div>
          <h2 className="font-alex text-5xl sm:text-7xl text-charcoal mb-4 sm:mb-6 leading-tight">
            Thoughts &<br/>Reflections
          </h2>
          <p className="text-charcoal/50 font-light text-sm sm:text-base leading-relaxed mb-8">
            Where thoughts rest and unfold. Notes from the quiet spaces between heartbeats.
          </p>
          <a
            href="/soul-notes"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 border border-warm-taupe/20 text-charcoal bg-white/40 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold rounded-full hover:bg-white hover:shadow-lg transition-all duration-400"
          >
            Explore Entries
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Posts Col */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 relative w-full">
           {posts.map((post, i) => (
             <a
               key={i}
               href={`/soul-notes/${post.slug}`}
               className="group flex flex-col items-start text-left p-8 sm:p-10 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-md hover:bg-white/80 transition-all duration-500 reveal-on-scroll shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
               style={{ transitionDelay: `${i * 0.15}s` }}
             >
                <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.2em] text-warm-taupe/70 font-semibold">
                  <span style={{ color: post.categoryColor }} className="px-2 py-0.5 rounded-full border border-warm-taupe/20 bg-white/50">
                    {post.tag} {post.category}
                  </span>
                  <span className="opacity-40">·</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 group-hover:text-warm-taupe transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-charcoal/70 font-light text-sm leading-loose line-clamp-4">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-dusty-rose group-hover:text-warm-taupe transition-colors duration-400">
                  Read More
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
             </a>
           ))}
        </div>

      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   MUSINGS SECTION
   ──────────────────────────────────────────── */

const musings = [
  {
    title: "Kaartu",
    date: "12 Feb, 2026",
    category: "Life",
    slug: "kaartu",
    excerpt:
      "The first thought that rose in me when I woke up today was the same as the past four mornings. Will she be waiting at the doorstep today? But the doorway had remained empty...",
    tag: "🐾",
  }
];

function MusingsSection() {
  return (
    <section id="musings-home" className="w-full py-16 px-4 sm:px-6 md:py-32 bg-white/40 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[10%] w-[40vw] h-[40vw] bg-[#A6B6C8]/10 rounded-full blur-[140px] pointer-events-none animate-breathe" />
      
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
        
        {/* Text Col */}
        <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left reveal-on-scroll">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="h-px w-6 sm:w-8 md:w-12 bg-warm-taupe/40" />
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-warm-taupe">Musings</span>
            <div className="h-px w-6 sm:w-8 md:w-12 bg-warm-taupe/40 md:hidden" />
          </div>
          <h2 className="font-alex text-5xl sm:text-7xl text-charcoal mb-4 sm:mb-6 leading-tight">
            Wandering Thoughts
          </h2>
          <p className="text-charcoal/50 font-light text-sm sm:text-base leading-relaxed mb-8">
            Unstructured ideas, gentle observations, and quiet conversations with the self.
          </p>
          <a
            href="/musings"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 border border-warm-taupe/20 text-charcoal bg-white/40 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-[0.22em] font-semibold rounded-full hover:bg-white hover:shadow-lg transition-all duration-400"
          >
            Read Musings
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Musings Col */}
        <div className="md:w-2/3 grid grid-cols-1 gap-6 md:gap-8 relative w-full max-w-xl">
           {musings.map((musing, i) => (
             <a
               key={i}
               href={`/musings/${musing.slug}`}
               className="group flex flex-col items-start text-left p-8 sm:p-10 rounded-3xl bg-white/40 border border-white/60 backdrop-blur-md hover:bg-white/80 transition-all duration-500 reveal-on-scroll shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
               style={{ transitionDelay: `${i * 0.15}s` }}
             >
                <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-[0.2em] text-warm-taupe/70 font-semibold">
                  <span>{musing.tag}</span>
                  <span className="px-2 py-0.5 rounded-full border border-warm-taupe/20 bg-white/50">{musing.category}</span>
                  <span className="opacity-40">·</span>
                  <span>{musing.date}</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4 group-hover:text-warm-taupe transition-colors duration-300">
                  {musing.title}
                </h3>
                <p className="text-charcoal/70 font-light text-sm leading-loose">
                  {musing.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-dusty-rose group-hover:text-warm-taupe transition-colors duration-400">
                  Read
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
             </a>
           ))}
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
    <div className="flex flex-col w-full overflow-x-hidden relative">
      <HeroSection />
      <JourneySection />
      <HeartlinesSection />
      <QuoteSection />
      <JournalSection />
      <MusingsSection />
    </div>
  );
}

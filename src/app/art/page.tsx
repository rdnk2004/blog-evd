"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function ArtPage() {
  const acrylicArt = [
    { src: ["/gallery/canvas-1.jpeg"], caption: "My first acrylic painting - Lakeside in Bloom" },
    { src: ["/gallery/swan.jpeg"], caption: "An elegant swan. Beauty in every ripple." },
    { src: ["/gallery/kathakali-1.jpeg"], caption: "A face that speaks beyond words." },
    { src: ["/gallery/radhekrishna.jpeg"], caption: "The universe listens with her." },
    { src: ["/gallery/peonyflower.jpeg"], caption: "Elegance in layers." },
    { src: ["/gallery/fishesonpond.jpeg"], caption: "pond of colours." },
    { src: ["/gallery/shivaparvati.jpeg"], caption: "Shiva - Parvati. One Energy" },
    { src: ["/gallery/guruvaryoorpan.jpeg"], caption: "Divine in Blue" },
    { src: ["/gallery/beach.jpeg"], caption: "Rhythm of the sea" }
  ];

  const pencilArt = [
    { src: ["/gallery/face-portrait.jpeg"], caption: "Sketched in silence" },
    { src: ["/gallery/eye-1.jpeg", "/gallery/eye-2.jpeg"], caption: "Eyes speak louder than words." },
    { src: ["/gallery/fish.jpeg"], caption: "Betta Fish - Grace in Grey" },
    { src: ["/gallery/rose.jpeg", "/gallery/flower.jpeg"], caption: "Beauty with Thorns" },
    { src: ["/gallery/butterfly-blue.jpeg", "/gallery/butterfly-yellow.jpeg"], caption: "Born to Transform" },
    { src: ["/gallery/applefork.jpeg"], caption: "Still Life" }
  ];

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
    <div className="flex flex-col w-full overflow-x-hidden relative min-h-screen bg-[#F7F2EB]">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-32 md:pt-40 pb-12 md:pb-20 flex flex-col items-center">

        {/* Title & Combined Content Section */}
        <div className="text-center mb-16 md:mb-20 reveal-on-scroll">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="h-px w-6 sm:w-8 md:w-12 bg-warm-taupe/40" />
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-warm-taupe">The Journey of Colors</span>
            <div className="h-px w-6 sm:w-8 md:w-12 bg-warm-taupe/40" />
          </div>
          <h1 className="font-alex text-6xl sm:text-7xl md:text-8xl text-charcoal leading-tight mb-8">
            Art
          </h1>

          <div className="prose prose-sm sm:prose-base md:prose-lg prose-stone max-w-3xl mx-auto text-charcoal/70 font-light leading-relaxed space-y-6 text-left sm:text-center px-4">
            <p>
              Art has been a quiet passion of mine since childhood. Though I never had the opportunity to learn it in a formal or technical way, I continued creating in my own small, intuitive ways. As we often say, everything unfolds in its own time—and for me, that time came two years ago.
            </p>
            <p>
              I was blessed with the opportunity to learn a few styles of painting under the guidance of a passionate teacher, Mrs. Sakthirani of GS Artways. My heartfelt thanks to my dear friend Gayathri, whose initiative opened that door for me.
            </p>
            <p>
              Each phase of this journey came with its own share of challenges. It wasn’t always easy, but beyond my own efforts, Ram stood as my greatest pillar of support.
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal pt-10 pb-2">
              Lalit Kala Akademi, Chennai
            </h2>
            <p>
              One of the most memorable milestones in this journey was exhibiting my paintings at the Lalit Kala Akademi, Chennai, from May 1 to 7, 2025—a true dream-come-true moment.
            </p>
          </div>
        </div>

        {/* Expanding Accordion Gallery Section */}
        <div className="w-full relative py-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-dusty-rose/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="w-full max-w-6xl mx-auto h-[65vh] min-h-[450px] lg:h-[75vh] flex flex-col lg:flex-row gap-2 sm:gap-4 reveal-on-scroll px-2 sm:px-0 relative z-10">
            {[
              { src: "/gallery/lka-1.jpeg", alt: "Lalit Kala Akademi Exhibition - 1" },
              { src: "/gallery/lka-2.jpeg", alt: "Lalit Kala Akademi Exhibition - 2" },
              { src: "/gallery/lka-3.jpeg", alt: "Lalit Kala Akademi Exhibition - 3" },
              { src: "/gallery/lka-4.jpeg", alt: "Lalit Kala Akademi Exhibition - 4" }
            ].map((item, i) => (
              <div
                key={i}
                tabIndex={0}
                className="relative group flex-1 hover:flex-[3] focus:flex-[3] lg:hover:flex-[4] lg:focus:flex-[4] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-2xl cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] focus:shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white/20 outline-none"
                style={{
                  transform: "translateZ(0)"
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transform scale-[1.05] group-hover:scale-100 group-focus:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent group-focus:bg-transparent transition-colors duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section */}
        <section className="w-full relative py-16 md:py-24 mt-12 border-t border-warm-taupe/10">
          <div className="text-center mb-16 md:mb-20 reveal-on-scroll">
            <h2 className="font-alex text-6xl md:text-7xl text-charcoal mb-4">
              Gallery
            </h2>
            <p className="text-charcoal/60 font-light tracking-wide uppercase text-[10px] md:text-xs">
              A collection of moments
            </p>
          </div>

          {/* Acrylic on Canvas */}
          <div className="mb-24 w-full max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4 mb-10 md:mb-12 reveal-on-scroll">
              <h3 className="font-serif text-3xl sm:text-4xl text-charcoal">Acrylic on Canvas</h3>
              <div className="flex-1 h-px bg-warm-taupe/20" />
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 [column-fill:_balance]">
              {acrylicArt.map((art, i) => (
                <div key={i} className="break-inside-avoid mb-6 sm:mb-8 reveal-on-scroll" style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
                  <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group">
                    <div className="flex flex-col gap-2 rounded-xl overflow-hidden relative">
                      {art.src.map((src, j) => (
                        <Image
                          key={j}
                          src={src}
                          alt={art.caption}
                          width={1000}
                          height={1000}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-700 ease-out rounded-lg"
                        />
                      ))}
                    </div>
                    <div className="px-2 pt-4 pb-2 text-center">
                      <p className="text-charcoal/80 font-light italic text-sm leading-relaxed">
                        {art.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pencil Art */}
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4 mb-10 md:mb-12 reveal-on-scroll">
              <h3 className="font-serif text-3xl sm:text-4xl text-charcoal">Pencil Art</h3>
              <div className="flex-1 h-px bg-warm-taupe/20" />
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 [column-fill:_balance]">
              {pencilArt.map((art, i) => (
                <div key={i} className="break-inside-avoid mb-6 sm:mb-8 reveal-on-scroll" style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
                  <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group">
                    <div className={`grid gap-2 rounded-xl overflow-hidden relative ${art.src.length > 1 ? 'grid-cols-2 items-center' : 'grid-cols-1'}`}>
                      {art.src.map((src, j) => (
                        <Image
                          key={j}
                          src={src}
                          alt={art.caption}
                          width={1000}
                          height={1000}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition-transform duration-700 ease-out rounded-lg"
                        />
                      ))}
                    </div>
                    <div className="px-2 pt-4 pb-2 text-center">
                      <p className="text-charcoal/80 font-light italic text-sm leading-relaxed">
                        {art.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

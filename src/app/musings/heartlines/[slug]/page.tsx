"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Shared dummy data representing a poem database
const getPoemBySlug = (slug: string) => {
  const poems: Record<string, { title: string; date: string; content: string; image?: string }> = {
    "feeling-rooted": {
      title: "Feeling Rooted",
      date: "June 30, 2026",
      content: "Living miles away,\na place lingers within.\n\nJust the very thought of it\nfills my heart with a quiet peace.\n\nThe freshness in the air.\nThe fragrance of the wet soil.\nThe endless stretch of green fields.\nThe gentle chime of the temple bells.\nThe wide-spreading branches\nof that old mango tree.\nI feel rooted there.\n\nThe cheerful chirping of birds.\nThe squirrels darting from branch to branch.\nThe moos from the cowshed.\nThe rhythmic creak of the pulley\ndrawing water from the well.\nThe sound of that blowpipe\nfiring the wood.\nI feel rooted there.\n\nThe two storey tiled ancestral house\nThe wall lined with old photographs\nThe piled up newspapers\nThe rays of light through the windows\nFills the little rooms\nThe diya lighting the idol in the shelf\nThe long verandas and the polished floor.\nI feel rooted there.\n\nMy soul finds its way back\nThe breeze whispers...\n“You belong here.”",
      image: "/chatgpt.png"
    },
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
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  useEffect(() => {
    // Resolve params robustly to support older Next.js 14 objects, or Next.js 15 promises
    Promise.resolve(props.params).then((resolved) => {
      setSlug(resolved.slug);
    });
  }, [props.params]);

  useEffect(() => {
    if (!slug) return;
    window.scrollTo(0, 0);
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
    <main className="flex flex-col w-full bg-[#F3EDE4] min-h-screen overflow-x-hidden relative">
      
      {/* Dynamic Ambient Background Cover */}
      {poem.image && (
        <div
          className="absolute inset-0 z-0 opacity-12 blur-[100px] pointer-events-none scale-110"
          style={{
            backgroundImage: `url(${poem.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* ────────────────────────────────────────────
          READING SECTION
          ──────────────────────────────────────────── */}
      <section className="relative w-full pt-40 pb-32 px-4 sm:px-6 flex flex-col items-center min-h-[80vh]">
        
        {/* Ambient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-dusty-rose/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-sage/10 rounded-full blur-[150px] pointer-events-none" />

        {poem.image ? (
          /* Premium Split Layout for poems with images */
          <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Poem Text */}
            <div className="lg:col-span-7 flex flex-col items-center text-center reveal-on-scroll w-full">
              <Link
                href="/musings/heartlines"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-taupe hover:text-charcoal transition-colors duration-300 mb-12 sm:mb-16"
              >
                <span className="transform -translate-x-0 hover:-translate-x-1 transition-transform duration-300">←</span>
                Back to Collection
              </Link>

              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-taupe/60 font-semibold mb-6">{poem.date}</span>
              
              <h1 className="font-alex text-[4rem] sm:text-[5rem] md:text-[6.5rem] leading-[0.9] text-charcoal mb-10 sm:mb-16 animate-slide-up" style={{textShadow: "0 4px 20px rgba(0,0,0,0.03)"}}>
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

            {/* Right Column: Framed Image Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center w-full lg:sticky lg:top-28 reveal-on-scroll" style={{ transitionDelay: "0.2s" }}>
              <span className="text-[9px] uppercase tracking-[0.3em] text-warm-taupe/50 font-bold mb-4 lg:hidden">
                Poem Artwork
              </span>
              
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="relative w-full max-w-sm sm:max-w-md lg:max-w-full group overflow-hidden rounded-3xl border-[6px] border-white shadow-[0_15px_45px_rgba(0,0,0,0.08)] transition-all duration-700 hover:scale-[1.03] hover:rotate-1 hover:shadow-[0_25px_55px_rgba(0,0,0,0.18)] cursor-zoom-in"
              >
                <img
                  src={poem.image}
                  alt={poem.title}
                  className="w-full h-auto object-contain max-h-[60vh] lg:max-h-[72vh] select-none"
                  draggable="false"
                />
                
                {/* Soft elegant frame overlay highlight */}
                <div className="absolute inset-0 border border-black/5 pointer-events-none rounded-[18px]" />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-md text-[10px] uppercase tracking-widest font-semibold text-charcoal flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <svg className="w-3.5 h-3.5 text-charcoal" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    View Original
                  </div>
                </div>
              </button>
              
              <span className="text-[10px] uppercase tracking-[0.25em] text-warm-taupe/60 font-semibold mt-6 hidden lg:inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-dusty-rose animate-pulse" />
                Click to view full artwork
              </span>
            </div>

          </div>
        ) : (
          /* Original Centered Layout */
          <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center reveal-on-scroll">
            <Link
              href="/musings/heartlines"
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
        )}
      </section>

      {/* Lightbox Modal */}
      {poem.image && isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 transition-all duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full transition-all duration-300 z-50 cursor-pointer"
            aria-label="Close original artwork"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Container */}
          <div 
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center animate-slide-up"
            onClick={(e) => e.stopPropagation()} // Prevent clicking the image from closing the modal
          >
            <img 
              src={poem.image} 
              alt={poem.title} 
              className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl select-none border border-white/10"
              draggable="false"
            />
            <span className="text-white/60 font-light text-xs sm:text-sm mt-4 tracking-wider italic text-center">
              "Feeling Rooted" — Original Artwork. Click anywhere outside to close.
            </span>
          </div>
        </div>
      )}

    </main>
  );
}

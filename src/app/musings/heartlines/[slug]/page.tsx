"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Shared dummy data representing a poem database
const getPoemBySlug = (slug: string) => {
  const poems: Record<
    string,
    { title: string; date: string; content: string; image?: string; landscapeBg?: string; portraitBg?: string }
  > = {
    "feeling-rooted": {
      title: "Feeling Rooted",
      date: "June 30, 2026",
      content: "Living miles away,\na place lingers within.\n\nJust the very thought of it\nfills my heart with a quiet peace.\n\nThe freshness in the air.\nThe fragrance of the wet soil.\nThe endless stretch of green fields.\nThe gentle chime of the temple bells.\nThe wide-spreading branches\nof that old mango tree.\nI feel rooted there.\n\nThe cheerful chirping of birds.\nThe squirrels darting from branch to branch.\nThe moos from the cowshed.\nThe rhythmic creak of the pulley\ndrawing water from the well.\nThe sound of that blowpipe\nfiring the wood.\nI feel rooted there.\n\nThe two storey tiled ancestral house\nThe wall lined with old photographs\nThe piled up newspapers\nThe rays of light through the windows\nFills the little rooms\nThe diya lighting the idol in the shelf\nThe long verandas and the polished floor.\nI feel rooted there.\n\nMy soul finds its way back\nThe breeze whispers...\n“You belong here.”",
      image: "/chatgpt.png",
      landscapeBg: "/landscape.png",
      portraitBg: "/portrait.png"
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

// Helper function to render formatted poem lines with custom styling matching chatgpt.png
const renderPoemContent = (content: string) => {
  return content.split("\n").map((line, index) => {
    const trimmed = line.trim();
    
    // Highlight recurring lines in golden-serif italic
    if (trimmed === "I feel rooted there.") {
      return (
        <span 
          key={index} 
          className="block text-[#E1BB5E] font-serif italic font-medium tracking-wide my-4 py-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          {line}
        </span>
      );
    }
    
    // Highlight signature quote in golden font-alex
    if (trimmed === "“You belong here.”" || trimmed === '"You belong here."' || trimmed === "You belong here.") {
      return (
        <span 
          key={index} 
          className="block text-[#E1BB5E] font-alex text-4xl sm:text-5xl md:text-6xl mt-8 mb-4 not-italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          {line}
        </span>
      );
    }
    
    // Spacers for paragraph breaks
    if (trimmed === "") {
      return <span key={index} className="block h-6" />;
    }
    
    // Default body lines styled in off-white with text shadow
    return (
      <span 
        key={index} 
        className="block text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] font-light leading-relaxed my-1.5"
      >
        {line}
      </span>
    );
  });
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
      
      {/* Dynamic Ambient Background Cover (For poems without visual layout backgrounds) */}
      {poem.image && !poem.landscapeBg && (
        <div
          className="absolute inset-0 z-0 opacity-12 blur-[100px] pointer-events-none scale-110"
          style={{
            backgroundImage: `url(${poem.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Intact Fixed Background Image Container (Landscape for Desktop/Laptop, Portrait for Phone) */}
      {poem.landscapeBg && poem.portraitBg && (
        <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
          {/* Desktop/Laptop Landscape Background */}
          <div 
            className="hidden md:block w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${poem.landscapeBg})`,
            }}
          />
          {/* Mobile Portrait Background */}
          <div 
            className="block md:hidden w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${poem.portraitBg})`,
            }}
          />
          {/* Deep Forest-Green Earthen Color Grade Overlays */}
          <div className="absolute inset-0 bg-[#121c10]/30 backdrop-brightness-[0.88] mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#182316]/40 via-transparent to-[#182316]/45" />
        </div>
      )}

      {/* ────────────────────────────────────────────
          READING SECTION
          ──────────────────────────────────────────── */}
      <section className="relative w-full pt-40 pb-32 px-4 sm:px-6 flex flex-col items-center min-h-[80vh]">
        
        {/* Ambient Glow (Only for original clean layouts) */}
        {!poem.landscapeBg && (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-dusty-rose/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] bg-sage/10 rounded-full blur-[150px] pointer-events-none" />
          </>
        )}

        {poem.landscapeBg && poem.portraitBg ? (
          /* Custom Layout: Scrolling words over a fixed landscape/portrait background */
          <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center reveal-on-scroll">
            
            {/* Header Area */}
            <Link
              href="/musings/heartlines"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-semibold text-white/70 hover:text-[#E1BB5E] transition-all duration-300 mb-12 sm:mb-16 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            >
              <span className="transform -translate-x-0 hover:-translate-x-1 transition-transform duration-300">←</span>
              Back to Collection
            </Link>

            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#E1BB5E]/80 font-bold mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              {poem.date}
            </span>
            
            {/* Cursive Golden Title */}
            <h1 className="font-alex text-[4.5rem] sm:text-[6.5rem] md:text-[8.5rem] leading-[0.9] text-[#E1BB5E] mb-10 sm:mb-16 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] animate-slide-up">
              {poem.title}
            </h1>

            <div className="w-px h-16 sm:h-24 bg-gradient-to-b from-[#E1BB5E]/60 to-transparent mb-12 sm:mb-16" />

            {/* Poetry Content (Parsed & styled) */}
            <div className="font-serif font-light text-lg sm:text-xl md:text-2xl leading-[2.2] sm:leading-[2.5] tracking-wide text-center">
              {renderPoemContent(poem.content)}
            </div>

            {/* Footer Signature */}
            <div className="w-12 h-px bg-[#E1BB5E]/40 mt-20 sm:mt-24 mb-6" />
            <span className="font-alex text-2xl sm:text-3xl text-[#E1BB5E]/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">~ DeepaRam 🌙</span>
          </div>
        ) : poem.image ? (
          /* Visual Layout: Focused entirely on the artwork poster */
          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center text-center reveal-on-scroll">
            
            {/* Header Area */}
            <Link
              href="/musings/heartlines"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-taupe hover:text-charcoal transition-colors duration-300 mb-8 sm:mb-12"
            >
              <span className="transform -translate-x-0 hover:-translate-x-1 transition-transform duration-300">←</span>
              Back to Collection
            </Link>

            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-warm-taupe/60 font-semibold mb-6">{poem.date}</span>
            
            {/* Focused Artwork Poster Frame */}
            <div className="w-full flex justify-center items-center px-2 sm:px-4 mb-8 sm:mb-12">
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="relative group overflow-hidden rounded-2xl border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-700 hover:scale-[1.02] hover:rotate-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.22)] cursor-zoom-in flex items-center justify-center max-w-full"
              >
                <img
                  src={poem.image}
                  alt={poem.title}
                  className="w-auto h-auto max-w-full max-h-[68vh] sm:max-h-[72vh] md:max-h-[76vh] object-contain select-none"
                  draggable="false"
                />
                
                {/* Frame border accent */}
                <div className="absolute inset-0 border border-black/5 pointer-events-none rounded-[10px]" />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md text-[10px] uppercase tracking-widest font-semibold text-charcoal flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    Expand Artwork
                  </div>
                </div>
              </button>
            </div>

            {/* Subtle Signature / Caption below the image */}
            <span className="text-[10px] uppercase tracking-[0.25em] text-warm-taupe/60 font-semibold flex items-center gap-2">
              <span className="w-2.5 h-px bg-warm-taupe/30" />
              Click to zoom & read original handwriting
              <span className="w-2.5 h-px bg-warm-taupe/30" />
            </span>

          </div>
        ) : (
          /* Original Centered Layout (For clean text-only poems) */
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

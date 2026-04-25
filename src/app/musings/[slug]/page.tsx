"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// In a real app this might be loaded from a CMS or markdown files.
const musingsData: Record<string, { title: string; date: string; category: string; readTime: string; content: string[] }> = {
  "kaartu": {
    title: "Kaartu",
    date: "12 Feb, 2026",
    category: "Life",
    readTime: "4 min read",
    content: [
      "The first thought that rose in me when I woke up today was the same as the past four mornings.",
      "Will she be waiting at the doorstep today?",
      "But the doorway had remained empty.",
      "It had been four days since she last came. Four quiet mornings. Four untouched moments at the kitchen entrance where she used to sit as if she belonged there.",
      "Maybe she had gone somewhere far.",
      "Maybe she had found another home.",
      "Or… did she forget the way back?",
      "Would she have forgotten?",
      "Even as these questions circled my mind, a small prayer lingered within me — that one day, without warning, she would appear again.",
      "Kaartu….",
      "[IMAGE:kaartu.jpeg]",
      "She was a black cat with soft tinges of yellow and white brushed across her fur. The first name that came to my mind was Kaartu. In Malayalam, it means black — a word so familiar to my ears from a cartoon. The name felt natural, as if it had been waiting for her.",
      "For almost a month, she visited our home regularly. Morning, noon, and night — she would sit at our kitchen door as though it were part of her daily routine. Slowly, without announcement, she became a member of our home. I began keeping aside milk and a small dosa for her.",
      "Every morning she would already be there when I woke up, waiting patiently while I warmed milk from the refrigerator and prepared her dosa. She never rushed me. She simply watched.",
      "The moment she saw me walking toward her with the plate, she would hurry ahead, almost running to where I placed it. Once her stomach was full, she would leave quietly. But if she wanted a little more, she would look up and let out a soft, gentle meow — never demanding, just hopeful.",
      "Only a few days after her visits became regular did we realize she was pregnant. Her belly slowly rounding, her movements slightly heavier. In the last few days before she disappeared, I felt she might deliver any time.",
      "So I tried to comfort myself with the thought that she must have found a safe place to bring her kittens into the world.",
      "Though she had come into our life only a month ago, something felt deeply connected. It is strange how a being can enter from nowhere and leave such a presence behind. Sometimes I felt she came as a silent messenger from the universe — reminding me that life is beautiful when we begin to notice its smallest gestures.",
      "I remember the day she truly entered my life. 7 Jan, 2026",
      "That evening, I was wondering why Nithu had not reached home after school. He usually arrives by 3:50 pm, but that day it was already 4:10. I stood leaning against the staircase near our kitchen door, gazing toward the gate.",
      "Just then I heard a soft meowing behind me.",
      "When I turned, I saw the same black cat I had often noticed along our compound wall .. the one that usually ran away the moment it saw us. Instinctively, I tried to chase her away. I am not really a pet lover. In fact, I am a little afraid of cats and dogs.",
      "But that day, she did not run.",
      "She continued to meow softly and stepped closer again.",
      "There was something different in her eyes .. not fear, not aggression, just a quiet request.",
      "I do not know what changed inside me at that moment, but despite my hesitation, I felt an instinct to give her some milk.",
      "That small act , so ordinary, so simple .. became the beginning of something I never expected.",
      "And today, as I wait for her return, I realize… sometimes love does not arrive loudly.",
      "It comes softly.",
      "With a gentle meow at the doorstep.",
      "And then today…",
      "As I opened the door, there she was.",
      "Right there at the doorstep.",
      "For a moment I could hardly believe it. My eyes filled with tears — a quiet happiness that comes when the universe answers your silent wish just like that.",
      "Kaartu showed her happiness in her own way, rubbing gently against my legs.",
      "Yes… she had delivered her kittens.",
      "She looked a little weak, her body thinner, her eyes softer — the look of a new mother who had given all her strength to her little ones. As usual, I gave her milk and dosa. She ate with hunger, finished quietly, and then left again… back to where her kittens were waiting.",
      "And as she walked away, I did not feel the emptiness I had carried for days.",
      "There was a quiet understanding instead.",
      "Some bonds are not meant to stay beside us… they come, touch our lives gently, and move on to where they are needed more.",
      "Kaartu did not just return — she reminded me that love given never goes lost. It finds its way back, in its own time, in its own form.",
      "And sometimes, all it takes is a small act of kindness…",
      "for the universe to whisper back,",
      "“I heard you.”"
    ]
  }
};

export default function MusingPage() {
  const params = useParams();
  const slug = params.slug as string;
  const musing = musingsData[slug];

  useEffect(() => {
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
  }, [slug]);

  if (!musing) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#F3EDE4]">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal mb-4">Musing not found</h1>
          <Link href="/musings" className="text-warm-taupe hover:text-charcoal uppercase tracking-[0.2em] text-xs font-semibold">
            ← Back to Musings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full bg-[#F3EDE4] min-h-screen selection:bg-warm-taupe/20 overflow-x-hidden relative">
      
      {/* READING CONTAINER */}
      <article className="relative w-full pt-32 pb-24 px-6 sm:px-8 md:px-12 flex flex-col items-center flex-1">
        
        {/* Background glow for reading focus */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] h-[50vh] bg-[#A6B6C8]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-2xl xl:max-w-3xl w-full relative z-10">
          
          {/* META & TITLE */}
          <header className="mb-16 md:mb-20 text-center reveal-on-scroll flex flex-col items-center">

            <Link 
              href="/musings"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-taupe hover:text-charcoal transition-colors duration-300 mb-10 sm:mb-12"
            >
              <span className="transform -translate-x-0 hover:-translate-x-1 transition-transform duration-300">←</span>
              Back to Musings
            </Link>

            <div className="flex items-center justify-center gap-2 mb-6 md:mb-8 text-[10px] uppercase tracking-[0.2em] text-warm-taupe/80 font-semibold">
              <span className="px-3 py-1 rounded-full border border-warm-taupe/20 bg-warm-taupe/5">{musing.category}</span>
              <span className="opacity-40">·</span>
              <span>{musing.date}</span>
              <span className="opacity-40">·</span>
              <span>{musing.readTime}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal leading-tight mb-8">
              {musing.title}
            </h1>

            <div className="flex justify-center">
              <div className="h-px w-24 bg-warm-taupe/30" />
            </div>
          </header>

          {/* CONTENT */}
          <div className="w-full text-charcoal/85">
            {musing.content.map((paragraph, index) => {
              if (paragraph.startsWith("[IMAGE:")) {
                const src = paragraph.replace("[IMAGE:", "").replace("]", "");
                return (
                  <div key={index} className="w-full my-12 sm:my-16 flex justify-center reveal-on-scroll" style={{ transitionDelay: `${Math.min(index * 0.02, 0.2)}s` }}>
                    <img 
                      src={`/${src}`} 
                      alt="Story illustration" 
                      className="rounded-2xl shadow-sm w-full max-w-md h-auto object-cover opacity-95 filter brightness-[0.95]"
                    />
                  </div>
                );
              }

              const isDialogue = paragraph.startsWith("“") || paragraph.startsWith("\"");
              const isShortThought = paragraph === "Will she be waiting at the doorstep today?" || 
                                     paragraph === "Maybe she had gone somewhere far." ||
                                     paragraph === "Maybe she had found another home." ||
                                     paragraph === "Or… did she forget the way back?" ||
                                     paragraph === "Would she have forgotten?" ||
                                     paragraph === "Kaartu…." ||
                                     paragraph === "It comes softly." ||
                                     paragraph === "With a gentle meow at the doorstep." ||
                                     paragraph === "And then today…" ||
                                     paragraph === "As I opened the door, there she was." ||
                                     paragraph === "Right there at the doorstep.";
                                     
              return (
                <p 
                  key={index} 
                  className={`mb-6 sm:mb-8 md:mb-10 text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] leading-[2] sm:leading-[2.2] font-light reveal-on-scroll transition-all duration-700
                    ${isDialogue ? 'italic ml-4 sm:ml-8 border-l border-[#A6B6C8]/40 pl-4 sm:pl-6 text-charcoal/90' : ''}
                    ${isShortThought ? 'italic text-charcoal/90 text-center' : ''}
                  `}
                  style={{ transitionDelay: `${Math.min(index * 0.02, 0.2)}s` }}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* FOOTER */}
          <footer className="mt-20 pt-12 border-t border-warm-taupe/20 flex flex-col items-center justify-center text-center reveal-on-scroll">
            <p className="text-charcoal/40 italic font-serif mb-8 text-xl">Thank you for sharing this space.</p>
            <Link 
              href="/musings"
              className="inline-flex items-center gap-3 px-8 py-4 border border-charcoal/20 text-charcoal text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-charcoal hover:text-[#F3EDE4] transition-all duration-400 shadow-sm"
            >
              Read More Musings
            </Link>
          </footer>

        </div>
      </article>

    </main>
  );
}

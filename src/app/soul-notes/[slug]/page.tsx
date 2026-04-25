"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// In a real app this might be loaded from a CMS or markdown files.
const notesData: Record<string, { title: string; date: string; category: string; readTime: string; content: string[] }> = {
  "the-mothers-silent-answer": {
    title: "The Mother’s Silent Answer",
    date: "October 18, 2025",
    category: "Soul",
    readTime: "3 min read",
    content: [
      "There is a belief often heard among devotees—that one reaches Tirumala Venkateswara Temple only when Venkateswara calls.",
      "It is not a place one simply decides to visit.",
      "It is a journey that unfolds when the divine wills it.",
      "On the early morning of October 18, 2025, at around 4:30 a.m., Ram and I stepped down from a bus into the sacred town of Tirupati. The night had been long and drenched in rain. The roads were wet, the air cool, and the sky still carried the silence of dawn. Yet, as our feet touched that soil, there was an unexpected freshness within us.",
      "Without much delay, we went to the rest house to get ready.",
      "As I stood before the mirror, adjusting myself for the day ahead, I noticed something unusual.",
      "One of my earrings was missing.",
      "It was just a small artificial stud—simple and insignificant in value. But what stirred me was not the loss itself. It was a thought.",
      "The previous day, while wearing that very earring, a quiet question had crossed my mind:",
      "Will this fall off?",
      "It had come uninvited and left just as quickly. I had dismissed it, trusting that the stud was secure. I hadn’t even considered carrying a spare.",
      "And now, it was gone.",
      "For a brief moment, I wondered if I should search for it. But something within me remained calm. There was no urgency, no disappointment.",
      "Instead, a gentle acceptance arose.",
      "Perhaps there is a reason for this.",
      "We were traveling with a group, and soon the day began to unfold. After visiting the sacred Srikalahasteeswara Temple, we walked through the bustling streets nearby. Shops lined both sides, filled with colorful items—bags, toys, glass bangles, snacks, and souvenirs.",
      "Somewhere in my mind, I thought I might find a simple pair of earrings.",
      "But none appeared.",
      "Shop after shop, there were many things—but not what I was looking for.",
      "Slowly, the thought dissolved.",
      "It doesn’t matter, I told myself.",
      "And truly, it didn’t.",
      "The day flowed with an ease that felt almost guided. Though it had begun with a light drizzle, the rain never disturbed us. The crowds were large, yet everything felt smooth. There was no discomfort, no rush—only a quiet sense of being carried through each moment.",
      "By evening, we went to seek the blessings of the Divine Mother at Padmavathi Ammavari Temple, the abode of Padmavathi.",
      "Earlier that day, I had read about the temple and felt a deep eagerness to witness Her divine form.",
      "As we stood in the queue, surrounded by devotees, moving slowly toward the sanctum, a familiar thought returned.",
      "My earring.",
      "Quietly, within my heart, I spoke to Her.",
      "Mother, why did that thought come to me yesterday? Why did I lose it?",
      "And then, almost playfully, another thought arose—",
      "Will I find an earring before I leave this place?",
      "But the moment I entered the sanctum and saw Her, everything else disappeared.",
      "She stood there—radiant, graceful, and infinitely compassionate.",
      "In that instant, the mind fell silent.",
      "Tears welled up in my eyes as I folded my hands. There was no prayer, no request—only a deep, overwhelming presence.",
      "A connection beyond words.",
      "When we stepped out, Ram gently reminded me,",
      "“Let’s check if you find earrings in the shops here.”",
      "I walked to a few nearby shops. They displayed bangles, chains, and various ornaments—but no earrings.",
      "I was ready to leave.",
      "But Ram insisted once more, pointing to a small shop at the back.",
      "With no expectation, I walked toward it.",
      "Inside, only a few earrings were hanging on the wall—mostly large jhumkas. I asked if they had something smaller.",
      "The shopkeeper shook his head.",
      "“These are the only ones.”",
      "Among them, my eyes rested on the smallest pair.",
      "Without hesitation, I chose it.",
      "I didn’t even ask for it to be packed. Holding it gently in my palm, I stepped out of the shop.",
      "And then, something made me pause.",
      "I turned back.",
      "My eyes moved toward the temple entrance… and then upward, to the tall gopuram rising into the evening sky.",
      "In that quiet moment, my heart overflowed.",
      "With eyes filled with gratitude, I silently thanked the unseen divine presence that had guided me through the day.",
      "We hurried toward the parking area to board our bus.",
      "Once seated, I opened my palm again to look at the earrings.",
      "They were attached to a small card—a simple detail, easily overlooked.",
      "But when my eyes fell upon the name printed on it, time seemed to pause.",
      "It read:",
      "“Mataji.”",
      "[IMAGE:mataji.jpeg]",
      "In that instant, something deep within me stirred.",
      "There were no words, no thoughts—only a knowing.",
      "A gentle, silent assurance.",
      "To me, it meant everything.",
      "It felt as though the Divine Mother had heard my unspoken question… and answered it in Her own quiet way.",
      "And somewhere within, I felt that She had chosen those earrings for me—",
      "So that the next day, when I stood before Venkateswara, I would stand adorned not just with ornaments…",
      "But with Her grace.",
      "For sometimes, the divine does not reveal itself through grand miracles.",
      "Sometimes, it speaks through the smallest things—",
      "Even through a missing earring.",
      "For in losing something so small,",
      "I was given something far greater—",
      "a silent assurance that the Mother was always listening. 🌸"
    ]
  }
};

export default function NotePage() {
  const params = useParams();
  const slug = params.slug as string;
  const note = notesData[slug];

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

  if (!note) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#F3EDE4]">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-charcoal mb-4">Note not found</h1>
          <Link href="/soul-notes" className="text-warm-taupe hover:text-charcoal uppercase tracking-[0.2em] text-xs font-semibold">
            ← Back to Soul Notes
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
              <span className="px-3 py-1 rounded-full border border-warm-taupe/20 bg-warm-taupe/5">{note.category}</span>
              <span className="opacity-40">·</span>
              <span>{note.date}</span>
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

          {/* CONTENT */}
          <div className="w-full text-charcoal/85">
            {note.content.map((paragraph, index) => {
              if (paragraph.startsWith("[IMAGE:")) {
                const src = paragraph.replace("[IMAGE:", "").replace("]", "");
                return (
                  <div key={index} className="w-full my-12 sm:my-16 flex justify-center reveal-on-scroll" style={{ transitionDelay: `${Math.min(index * 0.03, 0.3)}s` }}>
                    <img 
                      src={`/${src}`} 
                      alt="Story illustration" 
                      className="rounded-2xl shadow-sm w-full max-w-md h-auto object-cover opacity-95 filter brightness-[0.95]"
                    />
                  </div>
                );
              }

              const isDialogue = paragraph.startsWith("“") || paragraph.startsWith("\"");
              const isShortThought = paragraph === "Will this fall off?" || 
                                     paragraph === "Perhaps there is a reason for this." ||
                                     paragraph === "Mother, why did that thought come to me yesterday? Why did I lose it?" ||
                                     paragraph === "Will I find an earring before I leave this place?";
                                     
              return (
                <p 
                  key={index} 
                  className={`mb-6 sm:mb-8 md:mb-10 text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] leading-[2] sm:leading-[2.2] font-light reveal-on-scroll transition-all duration-700
                    ${isDialogue ? 'italic ml-4 sm:ml-8 border-l border-warm-taupe/30 pl-4 sm:pl-6 text-charcoal/90' : ''}
                    ${isShortThought ? 'italic text-charcoal/90 text-center' : ''}
                  `}
                  style={{ transitionDelay: `${Math.min(index * 0.03, 0.3)}s` }}
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

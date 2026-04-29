"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="relative text-[10px] tracking-[0.22em] uppercase font-semibold text-charcoal/80 hover:text-charcoal transition-colors duration-300 group"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-warm-taupe group-hover:w-full transition-all duration-400 ease-out" />
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu with Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#journey", label: "About Me" },
    { href: "/heartlines", label: "Heartlines" },
    { href: "/soul-notes", label: "Soul Notes" },
    { href: "/musings", label: "Musings" },
    { href: "/art", label: "Art" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-warm-taupe/10 shadow-[0_2px_30px_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-10">
            <div className="relative w-11 h-11 flex-shrink-0">
              <Image
                src="/im4.png"
                alt="DeepaRam Logo"
                fill
                sizes="44px"
                quality={100}
                className="object-contain transition-transform group-hover:scale-110 duration-500"
              />
            </div>
            <span className="font-alex text-3xl tracking-wide pt-1 text-charcoal group-hover:text-warm-taupe transition-colors duration-300">
              DeepaRam
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-soft-beige text-[10px] uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-warm-taupe transition-colors duration-300"
            >
              Subscribe
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>

            {/* Animated burger */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11"
            >
              <span className={`block w-6 h-[1.5px] bg-charcoal transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block w-6 h-[1.5px] bg-charcoal transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-6 h-[1.5px] bg-charcoal transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center items-center transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(243,237,228,0.98)", backdropFilter: "blur(20px)" }}
      >
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-20%] w-[70vw] h-[70vw] bg-dusty-rose/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-sage/10 rounded-full blur-[120px]" />
        </div>

        <nav className="relative flex flex-col items-center gap-6 sm:gap-7">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-alex text-4xl sm:text-5xl text-charcoal/80 hover:text-charcoal transition-all duration-300 hover:tracking-wider"
              style={{
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.5s ease ${i * 60}ms, opacity 0.5s ease ${i * 60}ms, letter-spacing 0.3s ease`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 px-8 py-3 bg-charcoal text-soft-beige text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-warm-taupe transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            Subscribe
          </a>
        </nav>

        <div className="absolute bottom-8 text-xs text-warm-taupe/60 tracking-widest uppercase">
          © {new Date().getFullYear()} DeepaRam
        </div>
      </div>
    </>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="relative bg-charcoal text-soft-beige overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-taupe/40 to-transparent" />

      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-warm-taupe/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-sage/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Community strip */}
      <div className="relative border-b border-white/5 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-warm-taupe/60 font-semibold">
            Stay connected
          </span>
          <h2 className="font-alex text-5xl md:text-6xl mt-3 mb-3 text-soft-beige">
            Join the Community
          </h2>
          <p className="text-soft-beige/50 text-sm font-light mb-8 max-w-md mx-auto leading-relaxed">
            Quiet words, art, nature, reflections, and announcements, shared directly with you.
          </p>
          <a
            href="https://chat.whatsapp.com/J7WPIWyNN5v8AfB87D5miy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center gap-3 px-8 py-3.5 bg-warm-taupe hover:bg-dusty-rose text-white text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold rounded-full transition-all duration-300 mx-auto"
          >
            Join on WhatsApp
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom content */}
      <div className="relative py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="relative w-16 h-16 mb-4">
              <Image src="/im4.png" alt="DeepaRam Logo" fill sizes="64px" quality={100} className="object-contain invert opacity-80" />
            </div>
            <span className="font-alex text-4xl text-soft-beige mb-3">DeepaRam</span>
            <p className="text-soft-beige/40 text-xs leading-relaxed font-light max-w-[16rem]">
              Painting emotions in stillness. A space for art, words, nature, and the quiet spaces between.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-warm-taupe/60 font-semibold mb-1">Explore</span>
            {[
              { href: "/", label: "Home" },
              { href: "/#journey", label: "About Me" },
              { href: "/heartlines", label: "Heartlines" },
              { href: "/soul-notes", label: "Soul Notes" },
              { href: "/musings", label: "Musings" },
              { href: "/art", label: "Art" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="text-soft-beige/50 hover:text-soft-beige text-sm transition-colors duration-300 font-light">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-warm-taupe/60 font-semibold mb-1">Connect</span>
            {[
              { href: "mailto:evdeepa.6@gmail.com", label: "evdeepa.6@gmail.com", icon: "✉️" },
            ].map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith('mailto') ? undefined : "_blank"} rel="noopener noreferrer" className="flex items-center gap-2 text-soft-beige/50 hover:text-soft-beige text-sm transition-colors duration-300 font-light">
                <span className="text-base">{s.icon}</span>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Signature + copyright */}
        <div className="mt-14 pt-8 border-t border-white/5 max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-alex text-3xl text-soft-beige/30">~ DeepaRam</p>
          <p className="text-xs font-sans tracking-widest text-soft-beige/25 uppercase">
            © {new Date().getFullYear()} DeepaRam · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

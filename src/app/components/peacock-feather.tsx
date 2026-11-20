"use client";

import React from "react";
import Image from "next/image";

/**
 * Peacock Feather component using the user's custom colored-pencil sketch.
 * Blends naturally onto the #F3EDE4 background with soft divine aura.
 */
export function PeacockFeatherImage({
  className = "",
  style = {},
  width = 120,
  height = 310,
  glow = true,
}: {
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
    >
      {/* Subtle divine aura behind the feather eye */}
      {glow && (
        <div
          className="absolute top-[8%] left-[20%] w-[60%] h-[25%] rounded-full bg-[#0A9396]/15 blur-[25px] pointer-events-none animate-breathe"
        />
      )}
      <Image
        src="/peacock-feather.png"
        alt="Peacock feather"
        width={width}
        height={height}
        className="w-full h-full object-contain filter drop-shadow(0 4px 16px rgba(10,147,150,0.18))"
        style={{
          mixBlendMode: "multiply",
        }}
        priority
      />
    </div>
  );
}

export const PeacockFeather = PeacockFeatherImage;

/**
 * Centered ornamental divider featuring the peacock feather flanked by delicate hairline rules.
 */
export function PeacockDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 sm:my-12 w-full max-w-md mx-auto ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0A9396]/30 to-[#D4AF37]/50" />
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-[#0A9396]/10 blur-sm absolute" />
        <PeacockFeatherImage
          width={36}
          height={90}
          glow={false}
          className="transform rotate-12 opacity-85"
        />
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#0A9396]/30 to-[#D4AF37]/50" />
    </div>
  );
}

/**
 * Ambient Peacock Feather spots and divine motes.
 * Gently places translucent feathers at key spots down the page margins without touching the background.
 */
export function PeacockAuraSpots() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Spot 1: Upper Right (beside opening reflections on Krishna and devotion) */}
      <div
        className="absolute top-[180px] sm:top-[220px] right-[-15px] sm:right-[2%] md:right-[5%] opacity-40 sm:opacity-50 transition-transform duration-1000"
        style={{
          transform: "rotate(22deg)",
          animation: "float-slow 9s ease-in-out infinite",
        }}
      >
        <PeacockFeatherImage width={140} height={360} />
      </div>

      {/* Spot 2: Middle Left (beside Kururamma's loving devotion) */}
      <div
        className="absolute top-[48%] left-[-20px] sm:left-[1%] md:left-[4%] opacity-35 sm:opacity-45 transition-transform duration-1000"
        style={{
          transform: "rotate(-25deg)",
          animation: "float-slow 11s ease-in-out infinite",
          animationDelay: "2s",
        }}
      >
        <PeacockFeatherImage width={150} height={380} />
      </div>

      {/* Spot 3: Lower Right (beside Bala Gopala's arrival as a child) */}
      <div
        className="absolute top-[75%] right-[-15px] sm:right-[1.5%] md:right-[4%] opacity-40 sm:opacity-55 transition-transform duration-1000"
        style={{
          transform: "rotate(16deg)",
          animation: "float-slow 10s ease-in-out infinite",
          animationDelay: "4s",
        }}
      >
        <PeacockFeatherImage width={145} height={370} />
      </div>

      {/* Spot 4: Bottom Ambient Divine Shimmer / Motes */}
      {[
        { top: "25%", left: "15%", delay: "0s", color: "#D4AF37" },
        { top: "35%", right: "12%", delay: "1.2s", color: "#0A9396" },
        { top: "58%", left: "8%", delay: "2.4s", color: "#48CAE4" },
        { top: "72%", right: "18%", delay: "0.8s", color: "#D4AF37" },
        { top: "86%", left: "14%", delay: "1.8s", color: "#0A9396" },
      ].map((mote, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: mote.top,
            left: mote.left,
            right: mote.right,
            width: "4px",
            height: "4px",
            backgroundColor: mote.color,
            boxShadow: `0 0 10px 2px ${mote.color}88`,
            animation: `twinkle ${3 + i * 0.4}s ease-in-out infinite`,
            animationDelay: mote.delay,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

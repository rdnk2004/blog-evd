"use client";

import React from "react";
import Image from "next/image";

/**
 * Isolated Little Bird component (transparent background, no circular frame).
 * Renders the sparrow standalone on the #F3EDE4 canvas.
 */
export function LittleBirdImage({
  className = "",
  style = {},
  width = 90,
  height = 106,
  glow = false,
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
      {/* Soft warm glow */}
      {glow && (
        <div
          className="absolute inset-[-12%] rounded-full bg-warm-taupe/15 blur-[22px] pointer-events-none animate-breathe"
        />
      )}
      <Image
        src="/little-bird.png"
        alt="The Little Bird"
        width={width}
        height={height}
        className="w-full h-full object-contain filter drop-shadow(0 4px 14px rgba(0,0,0,0.06)) contrast-[1.02] brightness-[0.98]"
        priority
      />
    </div>
  );
}

// Backward-compatible alias
export const BirdAvatar = LittleBirdImage;
export const LittleBird = LittleBirdImage;

/**
 * Centered ornamental divider featuring the standalone little bird between delicate hairline rules.
 * No circular frame — just the bird resting serenely between the lines.
 */
export function BirdDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 sm:my-12 w-full max-w-md mx-auto ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-warm-taupe/30 to-warm-taupe/50" />
      <div className="relative flex items-center justify-center">
        <LittleBirdImage width={38} height={45} glow={false} className="opacity-85" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-warm-taupe/30 to-warm-taupe/50" />
    </div>
  );
}

/**
 * Ambient Little Bird presence spots and gentle motes throughout the reading page margins.
 * Leaves the background completely untouched while subtly placing the little bird in the atmosphere.
 */
export function BirdPresenceSpots() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Spot 1: Upper Right */}
      <div
        className="absolute top-[200px] sm:top-[240px] right-[-10px] sm:right-[2%] md:right-[5%] opacity-25 sm:opacity-35 transition-transform duration-1000"
        style={{
          animation: "float-slow 8s ease-in-out infinite",
        }}
      >
        <LittleBirdImage width={105} height={124} glow={true} />
      </div>

      {/* Spot 2: Middle Left (facing towards content) */}
      <div
        className="absolute top-[46%] left-[-15px] sm:left-[1%] md:left-[4%] opacity-20 sm:opacity-30 transition-transform duration-1000"
        style={{
          transform: "scaleX(-1)",
          animation: "float-slow 10s ease-in-out infinite",
          animationDelay: "2.5s",
        }}
      >
        <LittleBirdImage width={115} height={136} glow={true} />
      </div>

      {/* Spot 3: Lower Right */}
      <div
        className="absolute top-[74%] right-[-12px] sm:right-[1.5%] md:right-[4%] opacity-25 sm:opacity-35 transition-transform duration-1000"
        style={{
          animation: "float-slow 9s ease-in-out infinite",
          animationDelay: "4.5s",
        }}
      >
        <LittleBirdImage width={110} height={130} glow={true} />
      </div>

      {/* Subtle ambient floating motes */}
      {[
        { top: "22%", left: "12%", delay: "0s", color: "#8E7D6B" },
        { top: "38%", right: "14%", delay: "1.4s", color: "#D8B4A8" },
        { top: "54%", left: "8%", delay: "2.2s", color: "#A8B5A1" },
        { top: "68%", right: "16%", delay: "0.9s", color: "#8E7D6B" },
        { top: "82%", left: "15%", delay: "1.7s", color: "#D8B4A8" },
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
            boxShadow: `0 0 10px 2px ${mote.color}66`,
            animation: `twinkle ${3.2 + i * 0.4}s ease-in-out infinite`,
            animationDelay: mote.delay,
            opacity: 0.35,
          }}
        />
      ))}
    </div>
  );
}

import type { Metadata } from "next";
import { Lora, Alex_Brush } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "./components";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepaRam — Painting Emotions in Stillness",
  description:
    "A journey through nature, words, silence and the soul. In silence, I paint. In words, I breathe. In stillness, I become.",
  openGraph: {
    title: "DeepaRam — Painting Emotions in Stillness",
    description:
      "A creative sanctuary exploring nature, art, words and silence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${alexBrush.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className="min-h-screen flex flex-col bg-background text-foreground font-serif overflow-x-hidden w-full"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1 w-full flex flex-col overflow-x-hidden relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
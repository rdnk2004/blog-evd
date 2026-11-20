import fs from "fs";
import path from "path";

/* ────────────────────────────────────────────
   CONTENT TYPES
   ──────────────────────────────────────────── */

export interface SoulNote {
  slug: string;
  title: string;
  date: string; // ISO "YYYY-MM-DD"
  displayDate: string; // "October 18, 2025"
  category: string;
  readTime: string;
  snippet: string;
  image: string | null;
  draft: boolean;
  content: string[];
}

export interface Musing {
  slug: string;
  title: string;
  date: string; // ISO "YYYY-MM-DD"
  displayDate: string;
  category: string;
  readTime: string;
  snippet: string;
  image: string | null;
  draft: boolean;
  content: string[];
}

export interface Poem {
  slug: string;
  title: string;
  date: string; // ISO "YYYY-MM-DD"
  displayDate: string;
  snippet: string;
  content: string;
  image: string | null;
  landscapeBg: string | null;
  portraitBg: string | null;
  draft: boolean;
}

export interface SeriesMeta {
  slug: string;
  title: string;
  date: string; // ISO "YYYY-MM-DD"
  displayDate: string;
  category: string;
  description: string;
  draft: boolean;
}

export interface ChapterGratitudeItem {
  name: string;
  role?: string;
}

export interface ChapterGratitude {
  title: string;
  subtitle: string;
  items: ChapterGratitudeItem[];
}

export interface Chapter {
  slug: string;
  order: number;
  chapterLabel: string | null;
  title: string;
  date: string; // ISO "YYYY-MM-DD"
  displayDate: string;
  readTime: string;
  snippet: string;
  image: string | null;
  content: string;
  gratitude: ChapterGratitude | null;
  featherEffect?: boolean;
  draft: boolean;
}

export interface ChapterNavigationItem {
  slug: string;
  title: string;
  chapterLabel?: string | null;
}

export interface ChapterNavigation {
  previous: ChapterNavigationItem | null;
  next: ChapterNavigationItem | null;
}

export interface ChapterWithNav extends Chapter {
  nav: ChapterNavigation;
}

export interface SeriesWithChapters extends SeriesMeta {
  chapters: Chapter[];
}

export interface ArtItem {
  id: string;
  src: string[];
  caption: string;
  date: string;
  draft: boolean;
}

export interface GalleryData {
  acrylicArt: ArtItem[];
  pencilArt: ArtItem[];
}

/* ────────────────────────────────────────────
   CONTENT DIRECTORY ROOT
   ──────────────────────────────────────────── */

const contentDir = path.join(process.cwd(), "content");

function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading JSON file at ${filePath}:`, err);
    return null;
  }
}

/* ────────────────────────────────────────────
   SOUL NOTES LOADERS
   ──────────────────────────────────────────── */

export function getAllSoulNotes(): SoulNote[] {
  const dir = path.join(contentDir, "soul-notes");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const items: SoulNote[] = [];

  for (const file of files) {
    const data = readJsonFile<SoulNote>(path.join(dir, file));
    if (data && !data.draft) {
      items.push(data);
    }
  }

  // Newest first by ISO date
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export function getSoulNoteBySlug(slug: string): SoulNote | null {
  // Support historical alias
  const targetSlug = slug === "a-path-i-chose-a-path-yet-to-find" 
    ? "a-reflection-on-the-paths-we-take" 
    : slug;

  const filePath = path.join(contentDir, "soul-notes", `${targetSlug}.json`);
  const data = readJsonFile<SoulNote>(filePath);
  if (!data || data.draft) return null;
  return data;
}

/* ────────────────────────────────────────────
   MUSINGS LOADERS
   ──────────────────────────────────────────── */

export function getAllMusings(): Musing[] {
  const dir = path.join(contentDir, "musings");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const items: Musing[] = [];

  for (const file of files) {
    const data = readJsonFile<Musing>(path.join(dir, file));
    if (data && !data.draft) {
      items.push(data);
    }
  }

  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export function getMusingBySlug(slug: string): Musing | null {
  const filePath = path.join(contentDir, "musings", `${slug}.json`);
  const data = readJsonFile<Musing>(filePath);
  if (!data || data.draft) return null;
  return data;
}

/* ────────────────────────────────────────────
   HEARTLINES (POETRY) LOADERS
   ──────────────────────────────────────────── */

export function getAllPoems(): Poem[] {
  const dir = path.join(contentDir, "heartlines");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const items: Poem[] = [];

  for (const file of files) {
    const data = readJsonFile<Poem>(path.join(dir, file));
    if (data && !data.draft) {
      items.push(data);
    }
  }

  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPoemBySlug(slug: string): Poem | null {
  const filePath = path.join(contentDir, "heartlines", `${slug}.json`);
  const data = readJsonFile<Poem>(filePath);
  if (!data || data.draft) return null;
  return data;
}

/* ────────────────────────────────────────────
   SERIES & CHAPTERS LOADERS
   ──────────────────────────────────────────── */

export function getAllSeries(): SeriesMeta[] {
  const dir = path.join(contentDir, "series");
  if (!fs.existsSync(dir)) return [];

  const subdirs = fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory());
  const items: SeriesMeta[] = [];

  for (const d of subdirs) {
    const filePath = path.join(dir, d.name, "series.json");
    const data = readJsonFile<SeriesMeta>(filePath);
    if (data && !data.draft) {
      items.push(data);
    }
  }

  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export function getSeriesBySlug(slug: string): SeriesWithChapters | null {
  const seriesPath = path.join(contentDir, "series", slug, "series.json");
  const seriesData = readJsonFile<SeriesMeta>(seriesPath);
  if (!seriesData || seriesData.draft) return null;

  const chaptersDir = path.join(contentDir, "series", slug, "chapters");
  const chapters: Chapter[] = [];

  if (fs.existsSync(chaptersDir)) {
    const chapterFiles = fs.readdirSync(chaptersDir).filter((f) => f.endsWith(".json"));
    for (const file of chapterFiles) {
      const ch = readJsonFile<Chapter>(path.join(chaptersDir, file));
      if (ch && !ch.draft) {
        chapters.push(ch);
      }
    }
  }

  // Sort chapters ascending by order (0 = prologue, 1..N = chapters, 999 = epilogue)
  chapters.sort((a, b) => a.order - b.order);

  return {
    ...seriesData,
    chapters,
  };
}

export function getChapter(seriesSlug: string, chapterSlug: string): ChapterWithNav | null {
  const series = getSeriesBySlug(seriesSlug);
  if (!series) return null;

  const chapters = series.chapters;
  const index = chapters.findIndex((c) => c.slug === chapterSlug);
  if (index === -1) return null;

  const current = chapters[index];
  const prev = index > 0 ? chapters[index - 1] : null;
  const next = index < chapters.length - 1 ? chapters[index + 1] : null;

  const nav: ChapterNavigation = {
    previous: prev
      ? {
          slug: prev.slug,
          title: prev.title,
          chapterLabel: prev.chapterLabel,
        }
      : null,
    next: next
      ? {
          slug: next.slug,
          title: next.title,
          chapterLabel: next.chapterLabel,
        }
      : null,
  };

  return {
    ...current,
    nav,
  };
}

/* ────────────────────────────────────────────
   GALLERY LOADERS
   ──────────────────────────────────────────── */

export function getGallery(): GalleryData {
  const filePath = path.join(contentDir, "gallery.json");
  const data = readJsonFile<GalleryData>(filePath);
  if (!data) {
    return { acrylicArt: [], pencilArt: [] };
  }

  return {
    acrylicArt: (data.acrylicArt || []).filter((item) => !item.draft),
    pencilArt: (data.pencilArt || []).filter((item) => !item.draft),
  };
}

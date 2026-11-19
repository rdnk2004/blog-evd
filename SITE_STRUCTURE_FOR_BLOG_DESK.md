# Site Structure & Content Specification for "My Blog Desk"

**Repository:** `blog-evd`  
**Site Identity:** DeepaRam — Painting Emotions in Stillness  
**Target User:** Non-technical mobile companion app ("My Blog Desk") publishing content via GitHub Contents API commits triggering Vercel auto-deploys.  
**Architecture:** Root `content/` JSON files loaded via server-side loader (`src/lib/content.ts`) with dynamic static generation (SSG/App Router).  
**Last Updated:** November 2026  

---

## 1. Tech Stack & Project Tree

### 1.1 Technology Stack & Dependencies

* **Framework:** Next.js `16.2.6` (configured with Turbopack for builds, React `19.2.4`, React DOM `19.2.4`)
* **Router Type:** Next.js **App Router** (`src/app/`)
* **Architecture Pattern:** Server Component page wrappers (`src/app/**/page.tsx`) performing filesystem I/O via `src/lib/content.ts` and passing typed props to interactive Client Components (`src/app/**/client.tsx`). Dynamic routes pre-rendered at build time via `generateStaticParams()`.
* **Styling Engine:** Tailwind CSS `v4` (`tailwindcss: ^4`, `@tailwindcss/postcss: ^4`, `postcss: ^8.5.10`)
  * Global design tokens defined via `@theme inline` in [src/app/globals.css](file:///d:/Profiles/blog-evd/src/app/globals.css).
  * Brand palette:
    * `--color-background`: `#F3EDE4` (Warm canvas / soft beige)
    * `--color-foreground`: `#1D1D1D` (Charcoal)
    * `--color-sage`: `#A8B5A1`
    * `--color-dusty-rose`: `#D8B4A8`
    * `--color-misty-blue`: `#A6B6C8`
    * `--color-warm-taupe`: `#8E7D6B`
    * `--color-charcoal`: `#1D1D1D`
    * `--color-soft-beige`: `#F3EDE4`
* **Typography:** Managed via `next/font/google` in [src/app/layout.tsx](file:///d:/Profiles/blog-evd/src/app/layout.tsx):
  * `Lora` (`--font-lora` / `--font-serif`) — Used for all body text, headings, and reflections.
  * `Alex_Brush` (`--font-alex-brush` / `--font-alex`) — Used for calligraphy signatures, grand hero titles, and decorative accents.
* **Analytics:** `@vercel/analytics/next` mounted in `RootLayout`.
* **Content Storage:** File-based JSON storage inside `content/`, parsed losslessly and safely using Node.js `fs`.

---

### 1.2 Repository Tree

```text
blog-evd/
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── SITE_STRUCTURE_FOR_BLOG_DESK.md
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── content/
│   ├── gallery.json
│   ├── heartlines/
│   │   ├── a-gentle-return-to-self.json
│   │   ├── feeling-rooted.json
│   │   ├── in-the-quiet-corners-of-your-world.json
│   │   └── the-invisible-touch-of-divinity.json
│   ├── musings/
│   │   └── kaartu.json
│   ├── series/
│   │   └── a-journey-of-hope-and-heart/
│   │       ├── series.json
│   │       └── chapters/
│   │           ├── prologue.json
│   │           ├── chapter-1.json
│   │           ├── chapter-2.json
│   │           ├── chapter-3.json
│   │           ├── chapter-4.json
│   │           ├── chapter-5.json
│   │           ├── chapter-6.json
│   │           ├── chapter-7.json
│   │           ├── chapter-8.json
│   │           ├── chapter-9.json
│   │           ├── chapter-10.json
│   │           ├── chapter-11.json
│   │           ├── chapter-12.json
│   │           └── epilogue.json
│   └── soul-notes/
│       ├── a-reflection-on-the-paths-we-take.json
│       ├── the-departure-of-a-soul.json
│       ├── the-mothers-silent-answer.json
│       └── when-silence-spoke-love.json
├── public/
│   ├── birthdayletter.jpeg
│   ├── chatgpt.png
│   ├── FB_IMG_1558854274277.jpg
│   ├── im4.png                     # Primary site logo
│   ├── image3.png                  # Secondary site logo (light/gold for feeling-rooted)
│   ├── kaartu.jpeg
│   ├── landscape.png
│   ├── mataji.jpeg
│   ├── portrait.png
│   ├── steelcont.jpeg
│   ├── WA_1786207878858.jpg.jpeg
│   └── gallery/
│       ├── applefork.jpeg
│       ├── beach.jpeg
│       ├── buddha.jpeg
│       ├── butterfly-blue.jpeg
│       ├── butterfly-yellow.jpeg
│       ├── canvas-1.jpeg
│       ├── eye-1.jpeg
│       ├── eye-2.jpeg
│       ├── face-portrait.jpeg
│       ├── fish.jpeg
│       ├── fishesonpond.jpeg
│       ├── flower.jpeg
│       ├── glass.jpeg
│       ├── glassofwater.jpeg
│       ├── guruvaryoorpan.jpeg
│       ├── kathakali-1.jpeg
│       ├── kathakali-2.jpeg
│       ├── kathakali-3.jpeg
│       ├── krishna.jpeg
│       ├── lips.jpeg
│       ├── lka-1.jpeg              # Lalit Kala Akademi exhibition feature 1
│       ├── lka-2.jpeg              # Lalit Kala Akademi exhibition feature 2
│       ├── lka-3.jpeg              # Lalit Kala Akademi exhibition feature 3
│       ├── lka-4.jpeg              # Lalit Kala Akademi exhibition feature 4
│       ├── peonyflower.jpeg
│       ├── pouringwater.jpeg
│       ├── radhekrishna.jpeg
│       ├── rose.jpeg
│       ├── shivaparvati.jpeg
│       ├── swan.jpeg
│       └── woman.jpeg
└── src/
    ├── lib/
    │   └── content.ts              # Server-side content loader & typed interfaces
    └── app/
        ├── components.tsx          # Header, Footer, navigation state
        ├── favicon.ico
        ├── globals.css             # Tailwind v4 theme, animations
        ├── home-client.tsx         # Interactive client component for homepage
        ├── layout.tsx              # Root HTML layout, font injection, analytics
        ├── page.tsx                # Homepage Server Component (reads content/ automatically)
        ├── art/
        │   ├── client.tsx          # Interactive art gallery & Lalit Kala accordion
        │   └── page.tsx            # Art Server Component (reads gallery.json)
        ├── musings/
        │   ├── client.tsx          # Musings index client
        │   ├── page.tsx            # Musings index Server Component
        │   ├── [slug]/
        │   │   ├── client.tsx      # Musing reading view client
        │   │   └── page.tsx        # Musing reading view Server Component
        │   └── heartlines/
        │       ├── client.tsx      # Heartlines poetry directory client
        │       ├── page.tsx        # Heartlines poetry Server Component
        │       └── [slug]/
        │           ├── client.tsx  # Heartlines poem reader client (wallpaper, poster, text-only)
        │           └── page.tsx    # Heartlines poem Server Component
        ├── series/
        │   ├── client.tsx          # Series directory client
        │   ├── page.tsx            # Series directory Server Component
        │   └── [slug]/
        │       ├── client.tsx      # Series chapter index client
        │       ├── page.tsx        # Series chapter index Server Component
        │       └── [chapterSlug]/
        │           ├── client.tsx  # Chapter reader client with dynamic prev/next nav
        │           └── page.tsx    # Chapter reader Server Component
        └── soul-notes/
            ├── client.tsx          # Soul notes directory client
            ├── page.tsx            # Soul notes directory Server Component
            └── [slug]/
                ├── client.tsx      # Soul note reader client
                └── page.tsx        # Soul note reader Server Component
```

---

## 2. Content Storage & Exact Schemas

All published content is stored as individual JSON files inside `content/`. The loader `src/lib/content.ts` automatically ignores any item where `"draft": true`.

### 2.1 Soul Notes (`content/soul-notes/<slug>.json`)
```json
{
  "slug": "a-reflection-on-the-paths-we-take",
  "title": "A Reflection on the Paths We Take",
  "date": "2026-10-27",
  "displayDate": "October 27, 2026",
  "category": "Soul",
  "readTime": "3 min read",
  "snippet": "Observing different journeys, each unique in its choices...",
  "image": null,
  "draft": false,
  "content": [
    "Paragraph 1...",
    "[IMAGE:mataji.jpeg]",
    "Paragraph 2..."
  ]
}
```

### 2.2 Musings (`content/musings/<slug>.json`)
```json
{
  "slug": "kaartu",
  "title": "Kaartu",
  "date": "2026-02-12",
  "displayDate": "12 Feb, 2026",
  "category": "Life",
  "readTime": "4 min read",
  "snippet": "The first thought that rose in me when I woke up today...",
  "image": null,
  "draft": false,
  "content": [
    "Paragraph 1...",
    "[IMAGE:kaartu.jpeg]",
    "Paragraph 2..."
  ]
}
```

### 2.3 Heartlines Poems (`content/heartlines/<slug>.json`)
```json
{
  "slug": "in-the-quiet-corners-of-your-world",
  "title": "In the Quiet Corners of Your World",
  "date": "2026-11-18",
  "displayDate": "November 18, 2026",
  "snippet": "She wished to walk beside you,\nif only for a little while...",
  "content": "She wished to walk beside you,\nif only for a little while,\nfollowing the rhythm of your footsteps,\nadoring the path you chose,\nthough she knew\nyou walked at a different pace.\n\nShe could sense the rhythm of your days...",
  "image": null,
  "landscapeBg": null,
  "portraitBg": null,
  "draft": false
}
```
*Note for Wallpaper layout:* To trigger the full-bleed ambient wallpaper layout (as in `feeling-rooted`), set `"image": "/chatgpt.png"`, `"landscapeBg": "/landscape.png"`, `"portraitBg": "/portrait.png"`.

### 2.4 Series Definition (`content/series/<seriesSlug>/series.json`)
```json
{
  "slug": "a-journey-of-hope-and-heart",
  "title": "A Journey of Hope and Heart",
  "date": "2026-05-18",
  "displayDate": "May 18, 2026",
  "category": "Story",
  "description": "A story of unfolding chapters, told one part at a time.",
  "draft": false
}
```

### 2.5 Series Chapters (`content/series/<seriesSlug>/chapters/<chapterSlug>.json`)
```json
{
  "slug": "chapter-1",
  "order": 1,
  "chapterLabel": "Chapter 1",
  "title": "When Destiny Chose The Hour",
  "date": "2026-05-19",
  "displayDate": "May 19, 2026",
  "readTime": "3 min read",
  "snippet": "We began our journey together after eight long years of anticipation...",
  "image": null,
  "content": "Multi-line text content...\n\n[IMAGE:steelcont.jpeg]\n\n[CENTER]Centered impact line...",
  "gratitude": {
    "title": "Gratefully Remembered",
    "subtitle": "With heartfelt gratitude to:",
    "items": [
      {
        "name": "Dr. Diraviaraj, Pediatric Surgeon",
        "role": "Devi Hospital, Coimbatore."
      }
    ]
  },
  "draft": false
}
```
*Order values:* `0` for prologue, `1..N` for sequential chapters, `999` for epilogue. The server-side loader computes dynamic Previous / Next navigation automatically based on `order`.

### 2.6 Art Gallery (`content/gallery.json`)
```json
{
  "acrylicArt": [
    {
      "id": "acrylic-1",
      "src": ["/gallery/canvas-1.jpeg"],
      "caption": "My first acrylic painting - Lakeside in Bloom",
      "date": "2024-01-01",
      "draft": false
    }
  ],
  "pencilArt": [
    {
      "id": "pencil-1",
      "src": ["/gallery/face-portrait.jpeg"],
      "caption": "Sketched in silence",
      "date": "2024-01-15",
      "draft": false
    }
  ]
}
```

---

## 3. How "My Blog Desk" Publishes Content

"My Blog Desk" can now publish content **solely by committing JSON files and uploading media to GitHub**:

1. **Publish a Soul Note:**
   - Create and commit `content/soul-notes/<new-slug>.json`.
   - (Optional) Upload featured/inline image to `public/<filename>.jpeg`.
2. **Publish a Musing:**
   - Create and commit `content/musings/<new-slug>.json`.
3. **Publish a Poem:**
   - Create and commit `content/heartlines/<new-slug>.json`.
4. **Publish a Series Chapter:**
   - Create and commit `content/series/<seriesSlug>/chapters/<chapterSlug>.json` with the appropriate numeric `order`.
5. **Publish an Artwork:**
   - Upload images to `public/gallery/<filename>.jpeg`.
   - Append the artwork entry to `content/gallery.json`.

**No website code, components, routes, or styles need to be touched.** Vercel will detect the GitHub commit, run `npm run build`, and statically generate the new pages automatically.

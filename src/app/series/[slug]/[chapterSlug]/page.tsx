import { notFound } from "next/navigation";
import { getAllSeries, getSeriesBySlug, getChapter } from "@/lib/content";
import ChapterClient from "./client";

export function generateStaticParams() {
  const allSeries = getAllSeries();
  const params: Array<{ slug: string; chapterSlug: string }> = [];

  for (const s of allSeries) {
    const fullSeries = getSeriesBySlug(s.slug);
    if (fullSeries) {
      for (const ch of fullSeries.chapters) {
        params.push({ slug: s.slug, chapterSlug: ch.slug });
      }
    }
  }

  return params;
}

export default async function ChapterSubpage(props: {
  params: Promise<{ slug: string; chapterSlug: string }>;
}) {
  const { slug, chapterSlug } = await props.params;
  const chapter = getChapter(slug, chapterSlug);

  if (!chapter) {
    notFound();
  }

  return <ChapterClient seriesSlug={slug} chapter={chapter} />;
}

import { notFound } from "next/navigation";
import { getAllSeries, getSeriesBySlug } from "@/lib/content";
import SeriesDetailClient from "./client";

export function generateStaticParams() {
  return getAllSeries().map((series) => ({
    slug: series.slug,
  }));
}

export default async function SeriesSubpage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  return <SeriesDetailClient series={series} />;
}

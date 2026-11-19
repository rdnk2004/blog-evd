import { notFound } from "next/navigation";
import { getAllMusings, getMusingBySlug } from "@/lib/content";
import MusingClient from "./client";

export function generateStaticParams() {
  return getAllMusings().map((musing) => ({
    slug: musing.slug,
  }));
}

export default async function MusingPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const musing = getMusingBySlug(slug);

  if (!musing) {
    notFound();
  }

  return <MusingClient musing={musing} />;
}

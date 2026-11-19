import { notFound } from "next/navigation";
import { getAllPoems, getPoemBySlug } from "@/lib/content";
import PoemClient from "./client";

export function generateStaticParams() {
  return getAllPoems().map((poem) => ({
    slug: poem.slug,
  }));
}

export default async function PoemPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const poem = getPoemBySlug(slug);

  if (!poem) {
    notFound();
  }

  return <PoemClient poem={poem} />;
}

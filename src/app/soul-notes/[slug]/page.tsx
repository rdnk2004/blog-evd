import { notFound } from "next/navigation";
import { getAllSoulNotes, getSoulNoteBySlug } from "@/lib/content";
import NoteClient from "./client";

export function generateStaticParams() {
  return getAllSoulNotes().map((note) => ({
    slug: note.slug,
  }));
}

export default async function NotePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const note = getSoulNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return <NoteClient note={note} />;
}

import { getAllSoulNotes } from "@/lib/content";
import SoulNotesClient from "./client";

export default function SoulNotesPage() {
  const notes = getAllSoulNotes();
  return <SoulNotesClient notes={notes} />;
}

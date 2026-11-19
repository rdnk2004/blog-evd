import { getAllMusings } from "@/lib/content";
import MusingsClient from "./client";

export default function MusingsPage() {
  const musings = getAllMusings();
  return <MusingsClient musings={musings} />;
}

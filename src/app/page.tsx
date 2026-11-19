import { getAllSeries, getAllSoulNotes, getAllMusings, getAllPoems } from "@/lib/content";
import HomeClient from "./home-client";

export default function Home() {
  const series = getAllSeries();
  const soulNotes = getAllSoulNotes();
  const musings = getAllMusings();
  const poems = getAllPoems();

  return (
    <HomeClient
      series={series}
      soulNotes={soulNotes}
      musings={musings}
      poems={poems}
    />
  );
}

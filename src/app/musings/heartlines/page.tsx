import { getAllPoems } from "@/lib/content";
import HeartlinesClient from "./client";

export default function HeartlinesPage() {
  const poems = getAllPoems();
  return <HeartlinesClient poems={poems} />;
}

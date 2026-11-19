import { getAllSeries } from "@/lib/content";
import SeriesListClient from "./client";

export default function SeriesPage() {
  const seriesList = getAllSeries();
  return <SeriesListClient seriesList={seriesList} />;
}

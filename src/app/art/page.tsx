import { getGallery } from "@/lib/content";
import ArtClient from "./client";

export default function ArtPage() {
  const gallery = getGallery();
  return <ArtClient gallery={gallery} />;
}

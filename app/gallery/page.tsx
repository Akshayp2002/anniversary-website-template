import type { Metadata } from "next";
import { GalleryView } from "./gallery-view";

export const metadata: Metadata = {
  title: "Private Gallery — Two Years Together",
  description: "Our private photo gallery.",
};

export default function GalleryPage() {
  return <GalleryView />;
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { InfiniteImageField } from "@/components/ui/infinite-image-field";

const DEMO_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=560&fit=crop&q=80",
];

interface FieldConfig {
  imageWidth: number;
  imageHeight: number;
  gap: number;
  maxSpeed: number;
  isMobile: boolean;
}

function getFieldConfig(width: number): FieldConfig {
  if (width < 380) {
    return { imageWidth: 108, imageHeight: 150, gap: 12, maxSpeed: 3, isMobile: true };
  }
  if (width < 640) {
    return { imageWidth: 128, imageHeight: 178, gap: 16, maxSpeed: 3.5, isMobile: true };
  }
  if (width < 1024) {
    return { imageWidth: 155, imageHeight: 217, gap: 20, maxSpeed: 4, isMobile: false };
  }
  return { imageWidth: 200, imageHeight: 280, gap: 26, maxSpeed: 4.5, isMobile: false };
}

export function GalleryView() {
  const [field, setField] = useState<FieldConfig>(() =>
    getFieldConfig(typeof window !== "undefined" ? window.innerWidth : 1024)
  );

  useEffect(() => {
    const update = () => setField(getFieldConfig(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <div className="gallery-header-top">
          <Link href="/" className="gallery-back" aria-label="Back to home">
            ← Back
          </Link>
          <div className="gallery-header-text">
            <span className="gallery-eyebrow">Just for us</span>
            <h1 className="gallery-title">
              Private <em>gallery</em>
            </h1>
          </div>
        </div>
        <p className="gallery-hint">
          {field.isMobile
            ? "Drag your finger to explore our moments"
            : "Move your cursor to wander through our moments"}
        </p>
      </header>

      <div className="gallery-canvas-wrap">
        <InfiniteImageField
          key={`${field.imageWidth}-${field.imageHeight}`}
          images={DEMO_GALLERY_IMAGES}
          className="gallery-canvas"
          imageWidth={field.imageWidth}
          imageHeight={field.imageHeight}
          gap={field.gap}
          borderRadius={field.isMobile ? 2 : 3}
          maxSpeed={field.maxSpeed}
          smoothing={field.isMobile ? 0.09 : 0.07}
        />
      </div>
    </div>
  );
}

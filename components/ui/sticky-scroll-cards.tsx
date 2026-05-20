"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import { useEffect, useRef, useState } from "react";

export interface StickyScrollCardItem {
  title: string;
  src: string;
}

const DEFAULT_CARDS: StickyScrollCardItem[] = [
  {
    title: "Misty Alps",
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=85",
  },
  {
    title: "Sunlit Grove",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=85",
  },
  {
    title: "Turquoise Shore",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
  },
  {
    title: "Mountain Pass",
    src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&q=85",
  },
  {
    title: "Rolling Hills",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85",
  },
];

// Very subtle tilts — natural scatter without looking messy
const CARD_ROTATIONS = [-1.4, 1.0, -0.8, 1.6, -1.1];

interface StickyScrollCardProps {
  i: number;
  title: string;
  src: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  targetScale: number;
  isMobile: boolean;
}

function StickyScrollCard({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
  isMobile,
}: StickyScrollCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const rotation = CARD_ROTATIONS[i % CARD_ROTATIONS.length];

  // Adjust stagger offset so cards stack neatly below the sticky header without overflowing on shorter screens
  const staggerOffset = isMobile ? i * 8 + 15 : i * 16 + 32;

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center pt-[22vh] md:pt-[24vh]">
      <motion.div
        style={{
          scale,
          rotate: rotation,
          top: `${staggerOffset}px`,
          borderRadius: 6,
          boxShadow:
            "0 4px 20px rgba(60,30,10,0.12), 0 10px 40px rgba(0,0,0,0.08)",
        }}
        className="relative origin-center overflow-hidden bg-white w-[88vw] max-w-[360px] md:w-[480px] md:max-w-none lg:w-[560px] border border-neutral-100/60"
      >
        {/* White border on three sides — classic polaroid style */}
        <div className="p-3 pb-0 md:p-4 md:pb-0">
          <div className="w-full overflow-hidden rounded-sm">
            <img
              src={src}
              alt={title}
              className="block h-[200px] sm:h-[220px] md:h-[310px] lg:h-[370px] w-full object-cover border border-neutral-100/30"
              draggable={false}
            />
          </div>
        </div>

        {/* Caption strip with romantic editorial font style */}
        <div className="flex h-[48px] md:h-[64px] items-center justify-center px-4">
          <p className="text-[11px] md:text-[12px] lg:text-[13px] font-serif font-medium italic tracking-[0.1em] text-[#6b5a50]">
            {title}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

interface StickyScrollCardsProps {
  /** Array of card items, each with a title and image src URL */
  cards?: StickyScrollCardItem[];
  /** Hint label shown above the stack */
  hint?: string;
  /** Additional CSS classes for the outer container */
  className?: string;
}

export function StickyScrollCards({
  cards = DEFAULT_CARDS,
  hint = "scroll to explore",
  className,
}: StickyScrollCardsProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hide the native scrollbar while this component is mounted
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "__sticky-scroll-cards-no-bar";
    style.textContent =
      "html { scrollbar-width: none; -ms-overflow-style: none; } html::-webkit-scrollbar { display: none; }";
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("__sticky-scroll-cards-no-bar");
      if (el) el.remove();
    };
  }, []);

  return (
    <ReactLenis root>
      <main
        ref={container}
        className={cn(
          "relative flex w-full flex-col items-center justify-center pt-[15vh] pb-[50vh] md:pt-[25vh] md:pb-[75vh]",
          className
        )}
      >
        {/* Persistent Sticky Header */}
        <div className="sticky top-[85px] md:top-[125px] z-20 w-full text-center pointer-events-none pb-2 px-4">
          <span className="text-[0.6rem] tracking-[0.3em] uppercase text-[#c97b7b] block mb-1">
            Our memories
          </span>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-normal text-[#2d2520] leading-tight">
            A year of <em className="italic text-[#c97b7b] font-light">moments</em>
          </h2>
          <p className="text-[0.7rem] md:text-[0.82rem] text-[#6b5a50] mt-1 mx-auto text-center">
            Scroll through the chapters of our story.
          </p>
        </div>

        {/* Hint label */}
        <div className="absolute left-1/2 top-[3%] md:top-[6%] flex -translate-x-1/2 flex-col items-center gap-2">
          <p className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.2em] opacity-30 text-[#6b5a50]">
            {hint}
          </p>
          <span className="h-8 md:h-12 w-px bg-gradient-to-b from-[#6b5a50]/30 to-transparent" />
        </div>

        {cards.map((card, i) => {
          const targetScale = Math.max(0.6, 1 - (cards.length - i - 1) * 0.06);
          const step = 0.75 / (cards.length - 1 || 1);
          const startRange = i * step;
          return (
            <StickyScrollCard
              key={`card_${i}`}
              i={i}
              {...card}
              progress={scrollYProgress}
              range={[startRange, 1]}
              targetScale={targetScale}
              isMobile={isMobile}
            />
          );
        })}
      </main>
    </ReactLenis>
  );
}


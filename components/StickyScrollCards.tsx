"use client";

import { useEffect, useRef, useState } from "react";

export interface MemoryCard {
  id: string;
  caption: string;
  date: string;
  title: string;
  src: string;
}

interface Props { cards: MemoryCard[]; }

// Per-card stack rotations for depth
const ROTS   = [-5, 4, -7, 6, -3, 5, -6, 3];
const SHIFTS = [
  { x: -8, y: 10 },
  { x: 6,  y: -6 },
  { x: -4, y: 8  },
  { x: 7,  y: -4 },
  { x: -6, y: 6  },
  { x: 5,  y: 10 },
];

export default function StickyScrollCards({ cards }: Props) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const handleScroll = () => {
      if (!wrapperRef.current || !containerRef.current) return;

      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      
      // Calculate scroll progress through the entire memory section
      const sectionTop = wrapperRect.top + window.scrollY;
      const sectionBottom = wrapperRect.bottom + window.scrollY;
      const sectionHeight = sectionBottom - sectionTop;
      
      const scrollProgress = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / sectionHeight));
      const cardIndex = Math.min(cards.length - 1, Math.floor(scrollProgress * cards.length));
      
      setActive(cardIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cards.length]);

  return (
    <>
      {/* ══ DESKTOP — split layout with pinning ══ */}
      <div className="polaroid-sticky-wrap" ref={wrapperRef}>

        {/* LEFT — pinned stack that scales down */}
        <div className="polaroid-stack-pane">
          <div className="polaroid-stage-wrap">

            {/* Floating number badge */}
            <div className="pol-badge">
              <span className="pol-badge-num">0{active + 1}</span>
              <span className="pol-badge-of">/ 0{cards.length}</span>
            </div>

            {/* Card stack — all cards 0..active rendered, active on top */}
            <div className="polaroid-stage" ref={stageRef}>
              {cards.map((card, i) => {
                // Show all cards that have been reached or are next
                if (i > active + 1) return null;

                const isTop   = i === active;
                const isNext  = i === active + 1;
                const depth   = active - i;            // 0 = top, 1 = one below, etc
                
                // Sequential animation: cards come from bottom, layer without overlapping, then overlap
                const fromBottom = isNext ? 450 : 0;  // Next card starts 450px below
                const stackY   = depth * 20 + fromBottom;  // Layered stacking with from-bottom offset
                const rot     = ROTS[i % ROTS.length];
                const shift   = SHIFTS[i % SHIFTS.length];
                const stackX  = depth * 6;
                const stackS  = 1 - depth * 0.14;     // More pronounced scale for better layering

                return (
                  <div
                    key={card.id}
                    className={`p-card${isTop ? " p-card-top" : ""}`}
                    style={{
                      zIndex:     50 - depth,
                      transform:  isTop
                        ? `translateY(0) rotate(${rot * 0.3}deg) scale(1)`
                        : `translateY(${stackY}px) rotate(${rot * 0.5}deg) translate(${shift.x + stackX}px, ${shift.y}px) scale(${stackS})`,
                      opacity:    1,
                      transition: "transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1.4s ease, box-shadow 1.4s ease",
                      boxShadow:  isTop
                        ? "12px 24px 64px rgba(60,30,10,0.35), 0 4px 12px rgba(0,0,0,0.15)"
                        : "6px 12px 32px rgba(60,30,10,0.2)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.src} alt={card.caption} loading="lazy" />

                    {/* Caption INSIDE the white bottom strip of the polaroid */}
                    {isTop && (
                      <div className="p-card-inner-caption">
                        <div>{card.caption}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Caption & date BELOW the polaroid */}
            <div className="pol-below">
              <div className="pol-below-title">{cards[active].title}</div>
              <div className="pol-below-date">{cards[active].date}</div>
            </div>

            {/* Progress dots */}
            <div className="pol-dots">
              {cards.map((_, i) => (
                <div
                  key={i}
                  className={`pol-dot${i <= active ? " pol-dot-active" : ""}${i === active ? " pol-dot-current" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — scroll track */}
        <div className="polaroid-scroll-track" ref={containerRef}>
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={`polaroid-scroll-item${i === active ? " active" : ""}`}
            >
              <div className="polaroid-scroll-num">0{i + 1}</div>
              <div className="polaroid-scroll-title">{card.title}</div>
              <div className="polaroid-scroll-date">{card.date}</div>
              <p className="polaroid-scroll-desc">{card.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ MOBILE — scattered grid ══ */}
      <div className="mobile-grid">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className="mob-pol"
            style={{ "--rot": `${ROTS[i % ROTS.length] / 2}deg` } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.src} alt={card.caption} loading="lazy" />
            <div className="mob-pol-cap">{card.caption}</div>
          </div>
        ))}
      </div>
    </>
  );
}
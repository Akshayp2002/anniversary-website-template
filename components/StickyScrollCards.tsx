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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = itemRefs.current.indexOf(e.target as HTMLDivElement);
            if (i !== -1) setActive(i);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-72px 0px -72px 0px" }
    );
    itemRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ══ DESKTOP — sticky split ══ */}
      <div className="polaroid-sticky-wrap">

        {/* LEFT — sticky image stack */}
        <div className="polaroid-stack-pane">
          <div className="polaroid-stage-wrap">

            {/* Floating number badge */}
            <div className="pol-badge">
              <span className="pol-badge-num">0{active + 1}</span>
              <span className="pol-badge-of">/ 0{cards.length}</span>
            </div>

            {/* Card stack — all cards 0..active rendered, active on top */}
            <div className="polaroid-stage">
              {cards.map((card, i) => {
                // Only render up to active + 1 (cards pile up)
                if (i > active) return null;

                const isTop   = i === active;
                const depth   = active - i;            // 0 = top, 1 = one below, etc
                const rot     = ROTS[i % ROTS.length];
                const shift   = SHIFTS[i % SHIFTS.length];
                const stackY  = depth * 6;            // push older cards down slightly
                const stackS  = 1 - depth * 0.04;    // slightly shrink older cards

                return (
                  <div
                    key={card.id}
                    className={`p-card${isTop ? " p-card-top" : ""}`}
                    style={{
                      zIndex:     50 - depth,
                      transform:  isTop
                        ? `rotate(${rot * 0.3}deg) translate(0px, 0px) scale(1)`
                        : `rotate(${rot}deg) translate(${shift.x}px, ${shift.y + stackY}px) scale(${stackS})`,
                      opacity:    isTop ? 1 : Math.max(0.35, 1 - depth * 0.2),
                      transition: "transform 0.75s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease, box-shadow 0.5s ease",
                      boxShadow:  isTop
                        ? "6px 12px 48px rgba(60,30,10,0.35), 0 2px 6px rgba(0,0,0,0.15)"
                        : "3px 5px 18px rgba(60,30,10,0.18)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.src} alt={card.caption} loading="lazy" />

                    {/* Caption INSIDE the white bottom strip of the polaroid */}
                    {isTop && (
                      <div className="p-card-inner-caption">{card.caption}</div>
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
        <div className="polaroid-scroll-track">
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
      <div className="mobile-text-list">
        {cards.map((card, i) => (
          <div key={card.id} style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
            <div className="polaroid-scroll-num" style={{ fontSize: "2rem" }}>0{i + 1}</div>
            <div className="polaroid-scroll-title" style={{ fontSize: "1.1rem" }}>{card.title}</div>
            <div className="polaroid-scroll-date">{card.date}</div>
            <p className="polaroid-scroll-desc" style={{ marginTop: "0.5rem" }}>{card.caption}</p>
          </div>
        ))}
      </div>
    </>
  );
}
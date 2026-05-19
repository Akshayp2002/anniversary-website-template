"use client";

import { useEffect } from "react";
import StickyScrollCards, { MemoryCard } from "@/components/StickyScrollCards";

/* ─── DATA ─── */
const CARDS: MemoryCard[] = [
  {
    id: "m1",
    title: "The very first hello",
    date: "May 2024 · Where it all began",
    caption: "That nervous smile, that first conversation — neither of us knew this was the start of everything.",
    src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80&fit=crop",
  },
  {
    id: "m2",
    title: "Golden hour walks",
    date: "Summer 2024 · Every weekend",
    caption: "Those long evenings where we forgot what time it was. The world softened around us.",
    src: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=600&q=80&fit=crop",
  },
  {
    id: "m3",
    title: "Our kitchen mornings",
    date: "Autumn 2024 · Home",
    caption: "Coffee too hot, music too loud, and laughing at absolutely nothing. That was home.",
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&fit=crop",
  },
  {
    id: "m4",
    title: "Rainy day reading",
    date: "Winter 2024 · Cozy & quiet",
    caption: "Rain on the windows, a shared blanket, two books — and still choosing to talk instead.",
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80&fit=crop",
  },
  {
    id: "m5",
    title: "Somewhere new together",
    date: "Spring 2025 · Adventures",
    caption: "Getting lost was never scary with you. Every wrong turn became a favourite memory.",
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80&fit=crop",
  },
  {
    id: "m6",
    title: "Just the two of us",
    date: "Year Two · Still us",
    caption: "No grand occasion. Just an ordinary Tuesday that somehow felt like the whole world.",
    src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&q=80&fit=crop",
  },
];

const QUOTES = [
  { text: "I love you not only for what you are, but for what I am when I am with you.", author: "Roy Croft" },
  { text: "You are my today and all of my tomorrows.", author: "Leo Christopher" },
  { text: "Whatever our souls are made of, his and mine are the same.", author: "Emily Brontë" },
  { text: "I would rather spend one lifetime with you than face all the ages of this world alone.", author: "J.R.R. Tolkien" },
  { text: "In all the world, there is no heart for me like yours.", author: "Maya Angelou" },
  { text: "Every love story is beautiful, but ours is my favourite.", author: "Anonymous" },
];

const TIMELINE = [
  {
    date: "May 2024", event: "Day one",
    desc: "The moment our story quietly began.",
    img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=220&q=75&fit=crop",
    rot: "-4deg",
  },
  {
    date: "June 2024", event: "First adventure",
    desc: "We got lost and found something better.",
    img: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=220&q=75&fit=crop",
    rot: "3deg",
  },
  {
    date: "Autumn 2024", event: "You became home",
    desc: "Somewhere along the way, home became a person.",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=220&q=75&fit=crop",
    rot: "-6deg",
  },
  {
    date: "New Year 2025", event: "First midnight",
    desc: "Midnight felt different. Better. Ours.",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=220&q=75&fit=crop",
    rot: "5deg",
  },
  {
    date: "Spring 2025", event: "One year together",
    desc: "365 days and still choosing each other every morning.",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=220&q=75&fit=crop",
    rot: "-3deg",
  },
  {
    date: "May 2026", event: "Two whole years",
    desc: "730 days of ordinary moments made extraordinary.",
    img: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=220&q=75&fit=crop",
    rot: "4deg",
  },
];

/* ─── BOTANICAL SVG ─── */
function LeafSvg({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main branch */}
      <path d="M20 160 Q80 80 200 20" stroke="#8fa688" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Leaves */}
      <ellipse cx="60"  cy="120" rx="22" ry="12" fill="#a8c4a0" opacity="0.55" transform="rotate(-40 60 120)" />
      <ellipse cx="95"  cy="90"  rx="20" ry="10" fill="#c4d9b8" opacity="0.50" transform="rotate(-55 95 90)" />
      <ellipse cx="130" cy="62"  rx="18" ry="9"  fill="#8fa688" opacity="0.45" transform="rotate(-65 130 62)" />
      <ellipse cx="162" cy="40"  rx="16" ry="8"  fill="#a8c4a0" opacity="0.40" transform="rotate(-70 162 40)" />
      {/* Small rose buds */}
      <circle cx="55"  cy="130" r="5" fill="#e8b4b4" opacity="0.6" />
      <circle cx="145" cy="52"  r="4" fill="#d4997a" opacity="0.5" />
      {/* Stem offshoots */}
      <path d="M60 120 Q45 100 35 95" stroke="#8fa688" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M130 62 Q118 45 110 38" stroke="#8fa688" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ─── BACKGROUND ─── */
function Background() {
  const petals = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left:     `${5 + (i * 6.2) % 90}%`,
    delay:    `${(i * 1.7) % 18}s`,
    duration: `${14 + (i * 1.3) % 12}s`,
    size:     `${5 + (i % 3) * 2}px`,
    color:    i % 3 === 0 ? "var(--rose-light)" : i % 3 === 1 ? "var(--gold-light)" : "var(--rose-pale)",
  }));

  return (
    <div className="botanical-canvas" aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
            borderRadius: p.id % 2 === 0 ? "50% 0 50% 0" : "50%",
          }}
        />
      ))}
    </div>
  );
}

/* ─── REVEAL ON SCROLL ─── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .timeline-item").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── PAGE ─── */
export default function Home() {
  useReveal();

  return (
    <>
      <Background />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Two Years ♥</div>
        <div className="nav-date">May 19, 2024 — May 19, 2026</div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero">
        {/* Botanical corner decorations */}
        <LeafSvg className="hero-botanical hero-botanical-tl" />
        <LeafSvg className="hero-botanical hero-botanical-tr" />
        <LeafSvg className="hero-botanical hero-botanical-bl" />
        <LeafSvg className="hero-botanical hero-botanical-br" />

        <p className="hero-eyebrow">A celebration of us</p>

        <h1 className="hero-title">
          Two
          <em>years together</em>
        </h1>

        <p className="hero-subtitle">
          Still us. Still here. Still choosing each other — every single day.
        </p>

        <div className="hero-divider">
          <div className="hero-divider-line" />
          <span className="hero-divider-icon">✦</span>
          <div className="hero-divider-line" />
        </div>

        <div className="hero-counter">
          {[
            { num: "730", label: "Days" },
            { num: "∞",   label: "Memories" },
            { num: "1",   label: "Us" },
          ].map(({ num, label }) => (
            <div className="hero-counter-item" key={label}>
              <span className="hero-counter-num">{num}</span>
              <span className="hero-counter-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="scroll-hint">
          <span>scroll</span>
          <div className="scroll-mouse" />
        </div>
      </section>

      {/* ══ FEATURED QUOTE 1 ══ */}
      <section className="featured-quote">
        <span className="quote-ornament">&ldquo;</span>
        <blockquote className="featured-quote-text reveal">
          I&apos;d choose you. In a hundred lifetimes, in a hundred worlds, in any version of reality —{" "}
          <em>I&apos;d find you and I&apos;d choose you.</em>
        </blockquote>
        <div className="quote-line" />
        <cite className="featured-quote-source reveal d1">— Kiersten White</cite>
      </section>

      {/* ══ MEMORIES / POLAROID STACK ══ */}
      <section className="memories-section">
        <div className="memories-header">
          <span className="section-label reveal">Our memories</span>
          <h2 className="section-title reveal d1">A year of <em>moments</em></h2>
          <p style={{ color: "var(--text3)", fontSize: "0.82rem" }} className="reveal d2">
            Scroll through the chapters of our story.
          </p>
        </div>
        <StickyScrollCards cards={CARDS} />
      </section>

      {/* ══ QUOTES GRID ══ */}
      <section className="quotes-section">
        <div style={{ textAlign: "center" }}>
          <span className="section-label reveal">Words for us</span>
          <h2 className="section-title reveal d1">Love, <em>written down</em></h2>
        </div>
        <div className="quotes-grid">
          {QUOTES.map((q, i) => (
            <div className={`quote-card reveal d${(i % 3) + 1}`} key={i}>
              <p className="quote-text">&ldquo;{q.text}&rdquo;</p>
              <p className="quote-author">— {q.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURED QUOTE 2 ══ */}
      <section className="featured-quote featured-quote-bg">
        <span className="quote-ornament">&ldquo;</span>
        <blockquote className="featured-quote-text reveal">
          Whatever our souls are made of,{" "}
          <em>his and mine are the same.</em>
        </blockquote>
        <div className="quote-line" />
        <cite className="featured-quote-source reveal d1">— Emily Brontë, Wuthering Heights</cite>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="timeline-section">
        <div style={{ textAlign: "center" }}>
          <span className="section-label reveal">Our story</span>
          <h2 className="section-title reveal d1">Chapter by <em>chapter</em></h2>
        </div>
        <div className="timeline-inner">
          {TIMELINE.map((item, i) => (
            <div
              className="timeline-item"
              key={i}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Pinned polaroid image — alternates left/right */}
              <div
                className="timeline-pin-img"
                style={{
                  "--pin-rot": item.rot,
                  "--pin-side": i % 2 === 0 ? "1" : "-1",
                } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.event} loading="lazy" />
                <div className="timeline-pin-caption">{item.event}</div>
              </div>
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-event">{item.event}</div>
              <div className="timeline-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURED QUOTE 3 ══ */}
      <section className="featured-quote">
        <span className="quote-ornament">&ldquo;</span>
        <blockquote className="featured-quote-text reveal">
          You are my today and{" "}
          <em>all of my tomorrows.</em>
        </blockquote>
        <div className="quote-line" />
        <cite className="featured-quote-source reveal d1">— Leo Christopher</cite>
      </section>

      {/* ══ CLOSING ══ */}
      <section className="closing">
        {/* Botanical accents */}
        <LeafSvg className="hero-botanical hero-botanical-tl" />
        <LeafSvg className="hero-botanical hero-botanical-tr" />

        <span className="closing-label reveal">May 19, 2026</span>
        <h2 className="closing-title reveal d1">
          To the next<br /><em>chapter</em>
        </h2>
        <div className="closing-heart reveal d2">🌸</div>
        <p className="closing-msg reveal d3">
          Thank you for every ordinary Tuesday. Every shared silence.
          Every laugh that turned into something more.
          Here&apos;s to two years — and every day after.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Two Years Together &bull; May 19, 2024 – May 19, 2026 &bull; Made with love ♥</p>
      </footer>
    </>
  );
}

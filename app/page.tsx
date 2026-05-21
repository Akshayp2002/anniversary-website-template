"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { StickyScrollCards } from "@/components/ui/sticky-scroll-cards";
import type { StickyScrollCardItem } from "@/components/ui/sticky-scroll-cards";

/* ══════════════════════════════════════════════════
   HEART BURST COMPONENT
   ══════════════════════════════════════════════════ */
function Heart({ x, y, size, duration, delay, color }: { x: number; y: number; size: number; duration: number; delay: number; color: string }) {
  return (
    <motion.span
      className="love-heart"
      style={{ left: x, top: y } as React.CSSProperties}
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        scale: [0, 1.6, 1.1, 0.9],
        opacity: [1, 0.85, 0.5, 0],
        y: [0, window.innerHeight * 0.6],
        x: [0, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 220],
        rotate: [0, (Math.random() - 0.5) * 35, (Math.random() - 0.5) * 60],
      }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ filter: "drop-shadow(0 0 5px rgba(255,80,120,0.45))" }}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.span>
  );
}

function LoveHearts({ hearts }: { hearts: Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number; color: string }> }) {
  return (<div aria-hidden="true">{hearts.map(({ id, x, y, size, duration, color }) => (<Heart key={id} x={x} y={y} size={size} duration={duration} delay={0} color={color} />))}</div>);
}

/* ─── DATA ─── */
const MEMORY_CARDS: StickyScrollCardItem[] = [
  {
    title: "The very first hello",
    src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80&fit=crop",
  },
  {
    title: "Golden hour walks",
    src: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=600&q=80&fit=crop",
  },
  {
    title: "Our kitchen mornings",
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&fit=crop",
  },
  {
    title: "Rainy day reading",
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80&fit=crop",
  },
  {
    title: "Somewhere new together",
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80&fit=crop",
  },
  {
    title: "Just the two of us",
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
    date: "July 2024", event: "Day one",
    desc: "The moment our story quietly began.",
    img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&q=80&fit=crop",
    rot: "-6deg",
  },
  {
    date: "June 2024", event: "First adventure",
    desc: "We got lost and found something better.",
    img: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=300&q=80&fit=crop",
    rot: "5deg",
  },
  {
    date: "Autumn 2024", event: "You became home",
    desc: "Somewhere along the way, home became a person.",
    img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=300&q=80&fit=crop",
    rot: "-7deg",
  },
  {
    date: "New Year 2025", event: "First midnight",
    desc: "Midnight felt different. Better. Ours.",
    img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&q=80&fit=crop",
    rot: "6deg",
  },
  {
    date: "Spring 2025", event: "One year together",
    desc: "365 days and still choosing each other every morning.",
    img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&q=80&fit=crop",
    rot: "-4deg",
  },
  {
    date: "July 2026", event: "Two whole years",
    desc: "730 days of ordinary moments made extraordinary.",
    img: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=300&q=80&fit=crop",
    rot: "7deg",
  },
];

const FALLING_HEARTS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: `${(i * 3.4 + 1) % 97}%`,
  delay: `${(i * 0.48) % 16}s`,
  duration: `${8 + (i % 11)}s`,
  size: 5 + (i % 6) * 2,
  opacity: 0.12 + (i % 4) * 0.08,
  drift: (i % 2 === 0 ? -1 : 1) * (6 + (i % 8)),
}));

const HERO_SPARKLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  top: `${10 + (i * 6.1) % 78}%`,
  left: `${6 + (i * 7.4) % 88}%`,
  delay: `${i * 0.35}s`,
}));

const CLOSING_SPARKLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  top: `${15 + (i * 7.5) % 70}%`,
  left: `${6 + (i * 9.2) % 88}%`,
  delay: `${i * 0.4}s`,
}));

/* ─── ROSE SVG ─── */
function RoseSvg({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M40 95 Q38 70 40 55" stroke="#8fa688" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M40 70 Q25 65 18 55" stroke="#8fa688" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M40 75 Q55 68 62 58" stroke="#8fa688" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <circle cx="40" cy="38" r="14" fill="#e8b4b4" opacity="0.5" />
      <circle cx="34" cy="32" r="10" fill="#f5e6e6" opacity="0.7" />
      <circle cx="46" cy="32" r="10" fill="#d4997a" opacity="0.45" />
      <circle cx="40" cy="28" r="8" fill="#c97b7b" opacity="0.55" />
      <circle cx="40" cy="26" r="4" fill="#e8b4b4" opacity="0.8" />
    </svg>
  );
}

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

/* ─── Realistic push pin ─── */
function PushPin({ className }: { className: string }) {
  const uid = useId().replace(/:/g, "");
  const headId = `pinHead-${uid}`;
  const needleId = `pinNeedle-${uid}`;

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={headId} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#f4a4a4" />
            <stop offset="45%" stopColor="#d46262" />
            <stop offset="100%" stopColor="#9e3d3d" />
          </radialGradient>
          <linearGradient id={needleId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e8e8e8" />
            <stop offset="50%" stopColor="#a8a8a8" />
            <stop offset="100%" stopColor="#6a6a6a" />
          </linearGradient>
        </defs>
        <ellipse cx="16" cy="28" rx="4" ry="1.2" fill="rgba(0,0,0,0.12)" />
        <line x1="16" y1="22" x2="16" y2="44" stroke={`url(#${needleId})`} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="16" y1="44" x2="16" y2="46" stroke="#555" strokeWidth="0.8" strokeLinecap="round" />
        <ellipse cx="16" cy="14" rx="9" ry="7.5" fill={`url(#${headId})`} />
        <ellipse cx="13" cy="11" rx="3" ry="2" fill="rgba(255,255,255,0.45)" />
        <ellipse cx="16" cy="20" rx="6" ry="1.5" fill="rgba(0,0,0,0.08)" />
      </svg>
    </div>
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

function useHeroParallax() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.setProperty("--mx", String(mx));
      el.style.setProperty("--my", String(my));
    };

    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return heroRef;
}

/* ─── PAGE ─── */
export default function Home() {
  useReveal();
  const heroRef = useHeroParallax();

  const mkHeart = () => ({ id: Math.random(), x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1280), y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 720), size: 20 + Math.random() * 28, duration: 1.8 + Math.random() * 1, delay: Math.random() * 0.6, color: ["#ff4d6d", "#e63946", "#c1121f"][Math.random() * 3 | 0] });
  const [hearts, setHearts] = useState<ReturnType<typeof mkHeart>[]>([]);

  const burst = useCallback(() => {
    const n = 32;
    const fresh = Array.from({ length: n }, mkHeart);
    setHearts((prev) => [...prev, ...fresh]);
    setTimeout(() => {
      const idSet = new Set(fresh.map(h => h.id));
      setHearts((prev) => prev.filter((h) => !idSet.has(h.id)));
    }, 4_500);
  }, []);

  return (
    <>
      <Background />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-brand">
          <div className="nav-logo">Two Years ♥</div>
          <div className="nav-date">July 21, 2024 — July 21, 2026</div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero" ref={heroRef}>
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-royal-rays" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-shimmer" aria-hidden="true" />

        <div className="hero-hearts-fall" aria-hidden="true">
          {FALLING_HEARTS.map((h) => (
            <span
              key={h.id}
              className="hero-falling-heart"
              style={{
                "--heart-left": h.left,
                "--heart-delay": h.delay,
                "--heart-dur": h.duration,
                "--heart-size": `${h.size}px`,
                "--heart-o": h.opacity,
                "--heart-drift": `${h.drift}px`,
              } as React.CSSProperties}
            >
              ♥
            </span>
          ))}
        </div>

        <div className="hero-floats" aria-hidden="true">
          {["♥", "✦", "❋", "♥", "✦", "♥"].map((icon, i) => (
            <span className="hero-float" key={i} style={{ "--float-i": i } as React.CSSProperties}>
              {icon}
            </span>
          ))}
        </div>

        <div className="hero-sparkles" aria-hidden="true">
          {HERO_SPARKLES.map((s) => (
            <button
              key={s.id}
              type="button"
              className="hero-sparkle"
              tabIndex={-1}
              aria-hidden="true"
              style={{
                top: s.top,
                left: s.left,
                animationDelay: s.delay,
              }}
            />
          ))}
        </div>

        <LeafSvg className="hero-botanical hero-botanical-tl" />
        <LeafSvg className="hero-botanical hero-botanical-tr" />
        <LeafSvg className="hero-botanical hero-botanical-bl" />
        <LeafSvg className="hero-botanical hero-botanical-br" />
        <RoseSvg className="hero-rose hero-rose-l" />
        <RoseSvg className="hero-rose hero-rose-r" />

        <div className="hero-content">
          <div className="hero-frame" aria-hidden="true">
            <span className="hero-frame-corner hero-frame-tl" />
            <span className="hero-frame-corner hero-frame-tr" />
            <span className="hero-frame-corner hero-frame-bl" />
            <span className="hero-frame-corner hero-frame-br" />
            <span className="hero-jewel hero-jewel-t" />
            <span className="hero-jewel hero-jewel-b" />
          </div>

          <div className="hero-ornament-line" aria-hidden="true">
            <span className="hero-ornament-wing">— ✦ —</span>
            <span className="hero-ornament-center">♥</span>
            <span className="hero-ornament-wing">— ✦ —</span>
          </div>

          <p className="hero-eyebrow">A celebration of us</p>
          <p className="hero-since">Since July 21, 2024</p>

          <h1 className="hero-title">
            Two
            <em>years together</em>
          </h1>

          <p className="hero-subtitle">
            Still us. Still here. Still choosing each other — every single day.
          </p>
          <p className="hero-whisper">
            Two hearts, one story — and I&apos;d write every page with you again.
          </p>

          <div className="hero-divider">
            <span className="hero-divider-line" />
            <span className="hero-divider-icon" aria-hidden="true">♥</span>
            <span className="hero-divider-line" />
          </div>

          <div className="hero-date-badge" onClick={burst}>
            <span>July 21, 2024</span>
            <span className="hero-date-heart" aria-hidden="true">♥</span>
            <span>July 21, 2026</span>
          </div>

          <div className="hero-counter">
            {[
              { num: "730", label: "Days" },
              { num: "∞",   label: "Memories" },
              { num: "1",   label: "Us" },
            ].map(({ num, label }) => (
              <div className="hero-counter-item" key={label} onClick={burst}>
                <span className="hero-counter-num">{num}</span>
                <span className="hero-counter-label">{label}</span>
              </div>
            ))}
          </div>
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
        <StickyScrollCards cards={MEMORY_CARDS} hint="scroll to explore" onLove={burst} />
      </section>

      {/* ══ QUOTES GRID ══ */}
      <section className="quotes-section">
        <div style={{ textAlign: "center" }}>
          <span className="section-label reveal">Words for us</span>
          <h2 className="section-title reveal d1">Love, <em>written down</em></h2>
        </div>
        <div className="quotes-grid">
          {QUOTES.map((q, i) => (
            <div className={`quote-card reveal d${(i % 3) + 1}`} key={i} onClick={burst}>
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
        <div className="timeline-grid">
          {TIMELINE.map((item, i) => (
            <div
              className="timeline-card reveal"
              key={i}
              style={{ transitionDelay: `${i * 0.12}s` }}
              onClick={burst}
            >
              <div
                className="timeline-polaroid-wrap"
                style={{ "--tilt": item.rot } as React.CSSProperties}
              >
                <div className="timeline-polaroid">
                  <PushPin className="timeline-pin" />
                  <div className="timeline-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.event} loading="lazy" />
                  </div>
                </div>
              </div>
              {/* Text content */}
              <div className="timeline-card-text">
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-event">{item.event}</div>
                <div className="timeline-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURED QUOTE 3 + GALLERY CTA ══ */}
      <section className="featured-quote featured-quote-cta">
        <span className="quote-ornament">&ldquo;</span>
        <blockquote className="featured-quote-text reveal">
          You are my today and{" "}
          <em>all of my tomorrows.</em>
        </blockquote>
        <div className="quote-line" />
        <cite className="featured-quote-source reveal d1">— Leo Christopher</cite>

        <div className="gallery-cta reveal d2">
          <p className="gallery-cta-eyebrow">Just for us</p>
          <Link href="/gallery" className="gallery-cta-btn">
            <span className="gallery-cta-btn-shine" aria-hidden="true" />
            <span className="gallery-cta-btn-text">Open private gallery</span>
            <span className="gallery-cta-btn-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ══ CLOSING ══ */}
      <section className="closing">
        <div className="closing-glow" aria-hidden="true" />
        <div className="closing-shimmer" aria-hidden="true" />

        <div className="closing-floats" aria-hidden="true">
          {["♥", "✦", "❋", "♥"].map((icon, i) => (
            <span className="closing-float" key={i} style={{ "--cf-i": i } as React.CSSProperties}>
              {icon}
            </span>
          ))}
        </div>

        <div className="closing-sparkles" aria-hidden="true">
          {CLOSING_SPARKLES.map((s) => (
            <button
              key={s.id}
              type="button"
              className="closing-sparkle"
              tabIndex={-1}
              aria-hidden="true"
              style={{ top: s.top, left: s.left, animationDelay: s.delay }}
            />
          ))}
        </div>

        <LeafSvg className="hero-botanical hero-botanical-tl" />
        <LeafSvg className="hero-botanical hero-botanical-tr" />
        <LeafSvg className="hero-botanical hero-botanical-bl" />
        <LeafSvg className="hero-botanical hero-botanical-br" />
        <RoseSvg className="hero-rose hero-rose-l closing-rose-l" />
        <RoseSvg className="hero-rose hero-rose-r closing-rose-r" />

        <div className="closing-content">
          <div className="closing-frame" aria-hidden="true">
            <span className="closing-frame-corner closing-frame-tl" />
            <span className="closing-frame-corner closing-frame-tr" />
            <span className="closing-frame-corner closing-frame-bl" />
            <span className="closing-frame-corner closing-frame-br" />
          </div>

          <div className="closing-ornament reveal" aria-hidden="true">
            <span className="closing-ornament-wing">— ✦ —</span>
            <span className="closing-ornament-center">♥</span>
            <span className="closing-ornament-wing">— ✦ —</span>
          </div>

          <span className="closing-label reveal">July 21, 2026</span>
          <h2 className="closing-title reveal d1">
            To the next <em>chapter</em>
          </h2>

          <button type="button" className="closing-bloom reveal d2" aria-label="Love" onClick={burst}>
            🌸
          </button>

          <p className="closing-msg reveal d3">
            Thank you for every ordinary Tuesday. Every shared silence.
            Every laugh that turned into something more.
            Here&apos;s to two years — and every day after.
          </p>

          <p className="closing-tagline reveal d3">Forever &amp; always ♥</p>
        </div>
      </section>

      <LoveHearts hearts={hearts} />

      {/* FOOTER */}
      <footer className="footer">
        <p>Two Years Together &bull; July 21, 2024 – July 21, 2026 &bull; Made with love ♥</p>
      </footer>
    </>
  );
}

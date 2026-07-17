import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { uiPatterns } from "../data";

// ============================================================
// Ambient "live content" band — inspired by Glance TV's
// always-on idle screen and Glance's live lock-screen feed.
// Two rows scroll in opposite directions; scroll VELOCITY warps
// the speed and direction, so the band reacts to how fast you
// move through the page. A modern scroll-linked motion pattern.
// ============================================================

const rowA = uiPatterns.slice(0, Math.ceil(uiPatterns.length / 2));
const rowB = uiPatterns.slice(Math.ceil(uiPatterns.length / 2));

function Pill({ label, live }) {
  return (
    <span className="flex shrink-0 items-center gap-2 rounded-full border border-[--color-border] bg-[--color-surface] px-5 py-2.5 text-sm font-medium text-[--color-ink-soft] shadow-sm">
      {live && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--color-orange] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[--color-orange]" />
        </span>
      )}
      {label}
    </span>
  );
}

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Row({ items, baseSpeed = 40, direction = 1, scrollVelocity }) {
  const doubled = [...items, ...items];
  const baseX = useMotionValue(0);
  const smoothV = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  // Scroll velocity nudges the factor: fast scroll = faster ticker.
  const velFactor = useTransform(smoothV, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dirRef = useRef(direction);

  useAnimationFrame((_, delta) => {
    let move = dirRef.current * (baseSpeed / 1000) * (delta / 16.67) * 0.6;
    const vf = velFactor.get();
    if (vf < 0) dirRef.current = -Math.abs(direction);
    else if (vf > 0) dirRef.current = Math.abs(direction);
    move += (direction * (baseSpeed / 1000) * vf * delta) / 100;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div aria-hidden style={{ x }} className="flex shrink-0 gap-3 pr-3">
        {doubled.map((p, i) => (
          <Pill key={i} label={p} live={i % 4 === 0} />
        ))}
      </motion.div>
    </div>
  );
}

export default function LiveBand() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  return (
    <section
      aria-label="UI patterns Ananya has shipped"
      className="relative overflow-hidden border-y border-[--color-border] bg-[--color-bg-soft] py-14"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(135,37,214,0.06), transparent 70%)" }}
      />

      <div className="relative mx-auto mb-8 max-w-6xl px-6">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-widest text-[--color-ink-mute] uppercase">
          <span className="flex items-center gap-2 text-[--color-orange]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--color-orange] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[--color-orange]" />
            </span>
            Live
          </span>
          Patterns I've shipped in production
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Row items={rowA} direction={1} scrollVelocity={scrollVelocity} />
        <Row items={rowB} direction={-1} scrollVelocity={scrollVelocity} />
      </div>
    </section>
  );
}

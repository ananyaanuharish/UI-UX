import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ============================================================
// One-time page-load intro. The name assembles word by word, a
// counter races 0→100, then the whole panel slides up like a
// lifting curtain to reveal the hero. Locks scroll while active.
// Skipped entirely for prefers-reduced-motion.
// ============================================================
export default function Preloader({ onDone }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Reduced-motion: skip the animation entirely; notify parent directly
    // without touching component state (avoids a synchronous setState in
    // an effect body, which triggers a wasted cascading render).
    if (reduce) {
      onDone?.();
      return;
    }
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const dur = 1500;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      // easeOutCubic
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setGone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, onDone]);

  // Restore scroll + fire callback once the exit animation starts.
  useEffect(() => {
    if (gone) {
      document.body.style.overflow = "";
      onDone?.();
    }
  }, [gone, onDone]);

  if (reduce) return null;

  const words = ["Ananya", "A", "H"];

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[--color-bg]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Name assembling */}
          <div className="overflow-hidden">
            <motion.h1 className="flex gap-3 font-[family-name:--font-display] text-4xl font-extrabold tracking-tight text-[--color-ink] md:text-6xl">
              {words.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={i === 2 ? "text-gradient" : ""}
                >
                  {w}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Counter + progress line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex w-56 flex-col items-center gap-3"
          >
            <div className="h-px w-full overflow-hidden bg-[--color-border]">
              <motion.div
                className="bg-gradient-brand h-full origin-left"
                style={{ scaleX: count / 100 }}
              />
            </div>
            <span className="font-[family-name:--font-sans] text-sm font-semibold tabular-nums text-[--color-ink-mute]">
              {count}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

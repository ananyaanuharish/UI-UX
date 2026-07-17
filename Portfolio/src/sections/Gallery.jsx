import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";
import Section from "../components/Section";
import { gallery } from "../data";

// ============================================================
// Coverflow gallery carousel. The active photo sits center-stage,
// flanked by scaled-down, dimmed neighbors. Drag, arrows, dots,
// and autoplay drive it; clicking the center opens a lightbox.
// The "made in Glance AI" shots wear a sparkle badge.
// ============================================================

// Position each slide relative to the active index (wrapping both ways).
function offsetFrom(index, active, len) {
  let d = index - active;
  if (d > len / 2) d -= len;
  if (d < -len / 2) d += len;
  return d;
}

export default function Gallery() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const len = gallery.length;

  const go = useCallback((dir) => setActive((a) => (a + dir + len) % len), [len]);

  // Autoplay — pauses while the lightbox is open or reduced motion is set.
  useEffect(() => {
    if (reduce || lightbox) return;
    const id = setInterval(() => go(1), 3600);
    return () => clearInterval(id);
  }, [go, reduce, lightbox]);

  // Keyboard support.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <Section
      id="gallery"
      eyebrow="Made with Glance AI ✦"
      title="I use what I'm joining"
      intro="Before designing for Glance, I became a fan. These looks were generated in the Glance AI app — styling myself, testing the product, learning the magic I'll help build."
    >
      {/* Stage */}
      <div
        className="relative flex h-[460px] items-center justify-center overflow-hidden md:h-[540px]"
        style={{ perspective: 1400 }}
      >
        {gallery.map((photo, i) => {
          const d = offsetFrom(i, active, len);
          const abs = Math.abs(d);
          if (abs > 2) return null; // only render nearby slides
          const isCenter = d === 0;
          return (
            <motion.figure
              key={photo.src}
              className="absolute h-[380px] w-[260px] cursor-pointer overflow-hidden rounded-3xl border border-[--color-border] bg-[--color-surface] shadow-2xl md:h-[460px] md:w-[320px]"
              animate={{
                x: `${d * 62}%`,
                scale: isCenter ? 1 : 0.82 - (abs - 1) * 0.08,
                rotateY: d * -12,
                opacity: abs > 2 ? 0 : 1 - abs * 0.28,
                zIndex: 10 - abs,
                filter: isCenter ? "brightness(1)" : "brightness(0.7)",
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => (isCenter ? setLightbox(true) : setActive(i))}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
              {/* Caption + AI badge on the center card */}
              {isCenter && (
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-sm font-semibold text-white">{photo.caption}</span>
                  {photo.ai && (
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                      <Sparkles size={11} /> Glance AI
                    </span>
                  )}
                </figcaption>
              )}
            </motion.figure>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="grid h-11 w-11 place-items-center rounded-full border border-[--color-border-strong] bg-[--color-surface] text-[--color-ink] transition-colors hover:bg-[--color-bg-soft]"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to photo ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 26 : 8,
                background: i === active ? "var(--color-violet)" : "var(--color-border-strong)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next photo"
          className="grid h-11 w-11 place-items-center rounded-full border border-[--color-border-strong] bg-[--color-surface] text-[--color-ink] transition-colors hover:bg-[--color-bg-soft]"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-6 backdrop-blur-md"
          >
            <button
              aria-label="Close"
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <motion.img
              key={gallery[active].src}
              src={gallery[active].src}
              alt={gallery[active].caption}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

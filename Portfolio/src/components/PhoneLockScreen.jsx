import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Lock, Phone, Camera } from "lucide-react";

const floatingWidgets = [
  { emoji: "🌃", label: "Bengaluru nights", side: "left",  top: "18%" },
  { emoji: "🎵", label: "Music + code",     side: "right", top: "30%" },
  { emoji: "☕", label: "Coffee-fuelled",   side: "left",  top: "48%" },
  { emoji: "🤓", label: "Design nerd",      side: "right", top: "60%" },
  { emoji: "🌍", label: "Wanderlust",       side: "left",  top: "73%" },
];

// ============================================================
// Signature element — a live phone LOCK SCREEN faithful to
// Glance's real product: full-bleed photo wallpaper, a lock
// icon + big clock + date, and FLOATING glanceable cards
// arranged around the phone (each with an emoji, a headline, and
// Glance's pink CTA pill). Content tells Ananya's story instead
// of news/shopping. The clock ticks live; the phone tilts in 3D.
// ============================================================

// Floating cards positioned around the phone, Glance-style.
// `side` controls which edge they hang off; they stagger in on load.

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
  const date = now
    .toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })
    .toUpperCase();
  return { time, date };
}


export default function PhoneLockScreen() {
  const { time, date } = useClock();

  // 3D mouse-parallax tilt — the phone leans toward the cursor.
  const shell = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(px, [0, 1], [-12, 12]), { stiffness: 150, damping: 15 });

  const onMove = (e) => {
    const r = shell.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={shell}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="relative mx-auto w-[220px] sm:w-[270px] overflow-visible"
      aria-label="Interactive Glance-style phone lock screen showcasing Ananya's highlights"
    >
      {/* Glow behind the phone */}
      <div
        className="absolute inset-0 -z-10 scale-110 rounded-[3rem] opacity-50 blur-3xl"
        style={{ background: "linear-gradient(160deg, #5a34f5, #be52c4 60%, #5ec2f9)" }}
      />

      {/* Floating skill widgets */}
      {floatingWidgets.map((w, i) => (
        <motion.div
          key={w.label}
          initial={{ opacity: 0, x: w.side === "left" ? -20 : 20 }}
          animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: 0.8 + i * 0.15, duration: 0.5 },
            x: { delay: 0.8 + i * 0.15, duration: 0.5 },
            y: { delay: 0.8 + i * 0.15, duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatType: "loop" },
          }}
          className="absolute z-20 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1.5 backdrop-blur-md"
          style={{
            top: w.top,
            ...(w.side === "left" ? { right: "calc(100% - 55px)" } : { left: "calc(100% - 55px)" }),
          }}
        >
          <span className="text-[13px] leading-none">{w.emoji}</span>
          <span className="whitespace-nowrap text-[10px] font-semibold text-white/90">{w.label}</span>
        </motion.div>
      ))}

      {/* Phone body */}
      <div className="relative overflow-hidden rounded-[2.6rem] border-[6px] border-[#0e0b1a] bg-[#0e0b1a] shadow-2xl shadow-[--color-violet]/30">
        {/* Wallpaper — Ananya's real photo */}
        <div className="relative aspect-[9/19.5] w-full">
          <img
            src="/images/ananya-3.jpeg"
            alt="Ananya"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          {/* Legibility gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />

          {/* Lock screen chrome */}
          <div className="relative flex h-full flex-col px-5 pt-5 pb-6 text-white">
            {/* Lock icon */}
            <Lock size={16} className="mx-auto opacity-90" />

            {/* Clock */}
            <div className="mt-4 text-center">
              <p className="font-[family-name:--font-display] text-6xl font-bold tabular-nums leading-none tracking-tight drop-shadow-lg">
                {time}
              </p>
              <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-white/85">{date}</p>
            </div>

            {/* Bottom corner actions */}
            <div className="mt-auto flex items-center justify-between px-1 text-white/85">
              <Phone size={18} className="fill-current" />
              <Camera size={18} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

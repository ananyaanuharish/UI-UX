import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Interactive gradient cursor (CodePen-style): a large blend-mode color blob
// that tints whatever it passes over, plus a small precise dot that tracks
// tightly. Hidden on touch devices and for prefers-reduced-motion.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // Two follow speeds: the blob lags (loose spring), the dot is snappy.
  const blobX = useSpring(x, { stiffness: 180, damping: 26, mass: 0.6 });
  const blobY = useSpring(y, { stiffness: 180, damping: 26, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 700, damping: 34, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 700, damping: 34, mass: 0.3 });

  useEffect(() => {
    const fineMq = window.matchMedia("(pointer: fine)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    // Re-evaluate when the user toggles reduced-motion or connects a pointer.
    const sync = () => {
      const on = fineMq.matches && !reduceMq.matches;
      setEnabled(on);
      window.removeEventListener("mousemove", move);
      if (on) window.addEventListener("mousemove", move);
    };
    sync();
    reduceMq.addEventListener("change", sync);
    fineMq.addEventListener("change", sync);
    return () => {
      reduceMq.removeEventListener("change", sync);
      fineMq.removeEventListener("change", sync);
      window.removeEventListener("mousemove", move);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Color blob — blends with content underneath */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[70] h-[380px] w-[380px] rounded-full mix-blend-multiply"
        style={{
          x: blobX,
          y: blobY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(90,52,245,0.14), rgba(190,82,196,0.10) 40%, transparent 65%)",
          filter: "blur(8px)",
        }}
      />
      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[71] h-2.5 w-2.5 rounded-full bg-[--color-violet] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}

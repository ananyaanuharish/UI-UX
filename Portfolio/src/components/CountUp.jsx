import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

// Animated number that counts up when scrolled into view.
// Splits a value like "$20M+" into prefix + number + suffix so the
// numeric part animates while symbols stay put.
export default function CountUp({ value, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const match = String(value).match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2].replace(/,/g, "")) : 0;
  const suffix = match?.[3] ?? "";
  const hasComma = /,/.test(match?.[2] ?? "");

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18, mass: 0.8 });

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, target, mv]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (!ref.current) return;
      const rounded = Math.round(latest);
      const shown = hasComma ? rounded.toLocaleString("en-IN") : String(rounded);
      ref.current.textContent = `${prefix}${shown}${suffix}`;
    });
  }, [spring, prefix, suffix, hasComma]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

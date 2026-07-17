import { motion, useReducedMotion } from "framer-motion";
import { inView } from "../motion";

// Word-by-word rise-in reveal for headings. Each word animates up from
// behind a clipping mask, staggered — a polished editorial motion pattern.
// Respects prefers-reduced-motion (renders static, no transform).
const wordV = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 },
  }),
};

export default function AnimatedText({ text, className = "" }) {
  const reduce = useReducedMotion();
  const words = String(text).split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-flex overflow-hidden pb-[0.18em] -mb-[0.18em] align-bottom">
            <motion.span custom={i} variants={wordV} className="inline-block">
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}

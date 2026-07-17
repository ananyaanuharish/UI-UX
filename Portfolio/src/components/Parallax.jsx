import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Scroll-linked vertical parallax. Wrap any element; it drifts by `distance`
// px across its own scroll traversal, adding depth as the page moves.
export default function Parallax({ children, distance = 60, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

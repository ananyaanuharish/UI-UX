import { motion } from "framer-motion";
import { fadeUp, inView } from "../motion";

// Scroll-triggered fade-up wrapper. Accessible: animates once, respects
// reduced-motion via the CSS override in index.css.
export default function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

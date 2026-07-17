import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { profile } from "../data";
import { easeExpo } from "../motion";
import PhoneLockScreen from "../components/PhoneLockScreen";
import Magnetic from "../components/Magnetic";
import ScrambleText from "../components/ScrambleText";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeExpo } },
};

export default function Hero({ start = true }) {
  // Scroll parallax: the phone drifts up and fades as you leave the hero.
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — the pitch */}
        <motion.div variants={container} initial="hidden" animate={start ? "show" : "hidden"}>
          {/* Availability pill */}
          <motion.div variants={item}>
            <span className="chip inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-[--color-ink-soft]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--color-green] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[--color-green]" />
              </span>
              UI/UX Developer & Designer
            </span>
          </motion.div>

          {/* Headline — Glance's rhythmic two-verb cadence ("Glance it. Shop it.") */}
          <motion.h1
            variants={item}
            className="mt-6 font-[family-name:--font-display] text-5xl leading-[0.92] font-extrabold tracking-tight text-[--color-ink] sm:text-6xl sm:mt-7 lg:text-[6.5rem]"
          >
            Design it.
            <br />
            <ScrambleText text="Ship it." start={start} className="text-gradient" />
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-lg leading-relaxed text-[--color-ink-soft]"
          >
            {profile.tagline}
          </motion.p>

          {/* CTAs — magnetic buttons that lean toward the cursor */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group bg-gradient-brand inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[--color-violet]/25 transition-transform hover:scale-[1.03]"
              >
                View my work
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-[--color-border-strong] bg-[--color-surface] px-7 py-3.5 text-base font-semibold text-[--color-ink] transition-colors hover:bg-[--color-bg-soft]"
              >
                <Sparkles size={16} className="text-[--color-purple]" /> Get in touch
              </a>
            </Magnetic>
          </motion.div>

        </motion.div>

        {/* Right — the signature: a live phone lock screen (parallax on scroll) */}
        <motion.div style={{ y: phoneY, opacity: phoneOpacity }} className="flex justify-center lg:justify-end">
          <PhoneLockScreen />
        </motion.div>
      </div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
<div className="relative h-10 w-px overflow-hidden rounded-full bg-[--color-border]">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[--color-violet] to-[--color-magenta]"
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ height: "50%" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

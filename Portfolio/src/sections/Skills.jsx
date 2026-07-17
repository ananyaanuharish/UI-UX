import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../components/Section";
import { skillGroups } from "../data";
import { inView } from "../motion";

// Interactive capability switcher: pick a category on the left, its toolkit
// animates in on the right. An accent pill slides behind the active tab.
export default function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];

  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="A designer who ships"
      intro="I research, design, and build — end to end. Explore what I bring to each area."
    >
      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        {/* Category tabs */}
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
          {skillGroups.map((g, i) => {
            const isActive = i === active;
            return (
              <button
                key={g.title}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className="relative shrink-0 rounded-2xl px-5 py-4 text-left transition-colors md:w-full"
              >
                {isActive && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-2xl border border-[--color-border-strong] bg-[--color-surface] shadow-lg shadow-[--color-violet]/8"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-[family-name:--font-display] text-sm font-extrabold"
                    style={{
                      background: `color-mix(in oklab, ${g.accent} 14%, transparent)`,
                      color: g.accent,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span
                      className={`block font-[family-name:--font-display] text-lg font-bold ${
                        isActive ? "text-[--color-ink]" : "text-[--color-ink-soft]"
                      }`}
                    >
                      {g.title}
                    </span>
                    <span className="hidden text-xs text-[--color-ink-mute] md:block">{g.tagline}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Active toolkit */}
        <div className="card relative min-h-[280px] overflow-hidden p-8">
          {/* Accent wash tied to the active category */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl transition-colors duration-500"
            style={{ background: group.accent }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <p className="mb-1 font-[family-name:--font-display] text-2xl font-bold text-[--color-ink]">
                {group.title}
              </p>

              <motion.ul
                className="flex flex-wrap gap-2.5"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.04 } } }}
              >
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 8 },
                      show: { opacity: 1, scale: 1, y: 0 },
                    }}
                    whileHover={{ y: -3 }}
                    className="cursor-default rounded-xl border border-[--color-border] bg-[--color-bg-soft] px-4 py-2 text-sm font-medium text-[--color-ink-soft] transition-colors hover:border-[--color-border-strong] hover:text-[--color-ink]"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

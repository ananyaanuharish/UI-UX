import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Plus, Check } from "lucide-react";
import Section from "../components/Section";
import { projects } from "../data";
import { fadeUp, inView } from "../motion";

// Glance-AI shopping-feed-inspired project card: a gradient "cover" with a
// live style-match %, tappable to expand into highlights (like tapping a
// product to see details). Pointer glow + hover lift for tactile feel.
const accentGlowMap = {
  violet: "rgba(90,52,245,0.30)",
  magenta: "rgba(190,82,196,0.30)",
  sky: "rgba(94,194,249,0.28)",
};

function ProjectCard({ project, index }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };
  const glow = useMotionTemplate`radial-gradient(460px circle at ${mx}px ${my}px, rgba(135,37,214,0.10), transparent 70%)`;
  const accentGlow = accentGlowMap[project.accent] ?? "rgba(135,37,214,0.25)";

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay: index * 0.1 }}
      className="card group relative overflow-hidden transition-all duration-500 hover:-translate-y-1"
      style={{ boxShadow: `0 0 0 1px ${accentGlow}, 0 8px 48px ${accentGlow}` }}
    >
      {/* Gradient cover */}
      <div className="relative h-52 overflow-hidden" style={{ background: project.gradient }}>
        {/* Shimmer sweep */}
        <div className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

        {/* Decorative orbs */}
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-sm" />
        <div className="absolute right-8 top-16 h-16 w-16 rounded-full bg-white/10" />
        <div className="absolute left-1/2 -bottom-6 h-24 w-24 -translate-x-1/2 rounded-full bg-black/15" />

        {/* Ghost initial */}
        <span className="absolute -bottom-4 left-3 select-none font-[family-name:--font-display] text-[9rem] font-extrabold leading-none text-white/15">
          {project.name.charAt(0)}
        </span>

        {/* Year + role chip */}
        <div className="absolute left-4 top-4 rounded-full bg-black/25 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          {project.year} · {project.role}
        </div>

        {/* Project index */}
        <span className="absolute right-5 top-4 font-mono text-xs font-bold tracking-widest text-white/35">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Metric badge — glassmorphic, anchored in cover */}
        <div className="absolute bottom-4 right-4 rounded-xl border border-white/25 bg-black/30 px-3.5 py-2 text-sm font-bold text-white backdrop-blur-md">
          {project.metric}
        </div>
      </div>

      {/* Cursor glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div className="relative p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[--color-ink-mute]">{project.org}</p>
        <h3 className="mt-1.5 font-[family-name:--font-display] text-2xl font-bold leading-tight text-[--color-ink] md:text-[1.65rem]">
          {project.name}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-[--color-ink-soft]">{project.blurb}</p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 space-y-2.5 overflow-hidden border-t border-[--color-border] pt-4"
            >
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-[--color-ink-soft]">
                  <Check size={14} className="mt-0.5 shrink-0 text-[--color-green]" />
                  {h}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[--color-border] bg-[--color-bg-soft] px-2.5 py-1 text-xs font-medium text-[--color-ink-mute]"
              >
                {tech}
              </span>
            ))}
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[--color-border-strong] px-4 py-2 text-sm font-semibold text-[--color-ink] transition-colors hover:bg-[--color-bg-soft]"
          >
            {open ? "Less" : "Highlights"}
            <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
              <Plus size={14} />
            </motion.span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Problems, solved end-to-end"
      intro="Not just screens — I find the pain, design the flow, and ship the code. Tap a card to see the highlights."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import Section from "../components/Section";
import { experience } from "../data";
import { fadeUp, inView } from "../motion";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've done the work"
      intro="One deep, end-to-end role, a 0-to-1 SaaS platform I designed and built across five role-based portals."
    >
      <div className="relative">
        {/* Timeline spine */}
        <div className="absolute top-2 left-[19px] hidden h-full w-0.5 bg-gradient-to-b from-[--color-violet] via-[--color-magenta]/40 to-transparent md:block" />

        {experience.map((job, i) => (
          <motion.article
            key={i}
            className="relative md:pl-20"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            {/* Pulsing node */}
            <span className="absolute top-1 left-0 hidden h-10 w-10 place-items-center rounded-full border border-[--color-border-strong] bg-[--color-surface] md:grid">
              {job.current && (
                <span className="absolute inset-0 animate-ping rounded-full border border-[--color-violet]/40" />
              )}
              <Briefcase size={16} className="text-[--color-magenta]" />
            </span>

            <div className="card overflow-hidden p-8">
              {/* Header */}
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-[family-name:--font-display] text-2xl font-bold text-[--color-ink]">
                      {job.role}
                    </h3>
                    {job.current && (
                      <span className="flex items-center gap-1.5 rounded-full bg-[--color-green]/12 px-2.5 py-1 text-xs font-semibold text-[#2f9e4b]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[--color-green]" /> Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[--color-ink-soft]">
                    <span className="text-gradient font-bold">{job.company}</span> · {job.context}
                    <a
                      href="https://hire.wisemonk.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-brand inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-105"
                    >
                      hire.wisemonk.io ↗
                    </a>
                  </p>
                </div>
                <div className="shrink-0 text-sm text-[--color-ink-mute] md:text-right">
                  <p className="font-medium text-[--color-ink-soft]">{job.period}</p>
                  <p className="flex items-center gap-1 md:justify-end">
                    <MapPin size={12} /> {job.location}
                  </p>
                </div>
              </div>

              {/* Metrics strip */}
              {job.metrics && (
                <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-[--color-border] bg-[--color-bg-soft] p-4">
                  {job.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="font-[family-name:--font-display] text-2xl font-extrabold text-gradient">
                        {m.value}
                      </p>
                      <p className="mt-0.5 text-xs text-[--color-ink-mute]">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Points — stagger in */}
              <motion.ul
                className="mt-6 space-y-3.5"
                initial="hidden"
                whileInView="show"
                viewport={inView}
                variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              >
                {job.points.map((pt, pi) => (
                  <motion.li
                    key={pi}
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                    className="flex gap-3 leading-relaxed text-[--color-ink-soft]"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[--color-violet] to-[--color-magenta]" />
                    <span>{pt}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Tech tags */}
              {job.tags && (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-[--color-border] pt-5">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-[--color-bg-soft] px-2.5 py-1 font-[family-name:--font-sans] text-xs font-medium text-[--color-ink-mute]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

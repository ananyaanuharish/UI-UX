import { motion } from "framer-motion";
import Section from "../components/Section";
import Reveal from "../components/Reveal";
import { profile, education } from "../data";
import { inView } from "../motion";

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Bridging design & engineering">
      <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Portrait — Ananya, shot in the Glance AI app */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-[--color-violet]/30 via-[--color-magenta]/20 to-[--color-sky]/30 opacity-70 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[--color-border]">
            <img
              src="/images/ananya-1.jpeg"
              alt="Ananya A H"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Glanceable-style name tag */}
            <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-black/40 px-4 py-3 backdrop-blur-md">
              <p className="font-[family-name:--font-display] text-lg font-bold text-white">{profile.name}</p>
              <p className="text-xs text-white/80">{profile.role}</p>
            </div>
          </div>
        </motion.div>

        {/* Narrative + education */}
        <div className="space-y-6">
          <Reveal>
            <p className="text-xl leading-relaxed text-[--color-ink-soft]">{profile.summary}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-[--color-ink-mute]">
              Design and code aren't separate steps for me — I can sit in a design critique defining a
              user journey, then open the editor and ship the same flow in production React. That loop,
              tight and honest, is where good products come from.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <div className="card p-6">
                <h3 className="text-xs font-semibold tracking-widest text-[--color-ink-mute] uppercase">
                  Education
                </h3>
                <p className="mt-3 font-semibold text-[--color-ink]">{education.degree}</p>
                <p className="mt-1 text-sm text-[--color-ink-soft]">{education.school}</p>
                <p className="mt-2 text-xs text-[--color-ink-mute]">
                  {education.period} · {education.detail.split(" · ").map((seg, i, arr) => {
                    const [label, val] = seg.split(": ");
                    return (
                      <span key={i}>
                        <span className="font-bold text-[--color-ink]">{label}:</span> {val}{i < arr.length - 1 ? " · " : ""}
                      </span>
                    );
                  })}
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-xs font-semibold tracking-widest text-[--color-ink-mute] uppercase">
                  Based in
                </h3>
                <p className="mt-3 font-semibold text-[--color-ink]">{profile.location}</p>
                <p className="mt-1 text-sm text-[--color-ink-soft]">Open to remote & on-site</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

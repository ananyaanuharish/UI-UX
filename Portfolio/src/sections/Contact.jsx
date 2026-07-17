import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, MapPin, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { profile } from "../data";
import { scaleIn, inView } from "../motion";

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: Github, label: "GitHub", value: "View code", href: profile.github },
  { icon: Linkedin, label: "LinkedIn", value: "Connect", href: profile.linkedin },
];

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="relative overflow-hidden rounded-[2.5rem] border border-[--color-border] bg-[--color-bg-soft] px-8 py-16 text-center md:px-16 md:py-24"
      >
        {/* Inner glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-70"
          style={{ background: "radial-gradient(ellipse at top, rgba(135,37,214,0.14), transparent 70%)" }}
        />

        <div className="relative">
          <p className="flex items-center justify-center gap-2 text-sm font-medium tracking-widest text-[--color-ink-mute] uppercase">
            <MapPin size={14} /> {profile.location}
          </p>

          <h2 className="mx-auto mt-6 max-w-3xl font-[family-name:--font-display] text-5xl leading-[1.02] tracking-tight text-[--color-ink] md:text-7xl">
            Let's build something <span className="text-gradient">people love.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg text-[--color-ink-soft]">
            Always up for good design conversations. Say hello.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="bg-gradient-brand mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[--color-violet]/25 transition-transform hover:scale-[1.03]"
          >
            {profile.email} <ArrowUpRight size={16} />
          </a>

          {/* Channels */}
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 rounded-2xl border border-[--color-border] bg-[--color-surface]/50 px-4 py-5 transition-colors hover:border-[--color-border-strong] hover:bg-[--color-surface]"
              >
                <Icon size={20} className="text-[--color-magenta]" />
                <span className="text-xs tracking-wider text-[--color-ink-mute] uppercase">{label}</span>
                <span className="w-full truncate text-center text-sm font-medium text-[--color-ink-soft] group-hover:text-[--color-ink]">
                  {value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[--color-border] pt-8 text-sm text-[--color-ink-mute] md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Designed & built with React, Tailwind & Framer Motion.
        </p>
      </footer>
    </section>
  );
}

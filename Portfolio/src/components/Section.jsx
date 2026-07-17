import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";

// Consistent section shell: id anchor, padding, container width, and an
// optional eyebrow + heading. Keeps every section rhythmically aligned.
export default function Section({ id, eyebrow, title, intro, children, className = "" }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 py-24 md:py-32 ${className}`}>
      {(eyebrow || title) && (
        <header className="mb-14 max-w-2xl">
          {eyebrow && (
            <Reveal>
              <p className="mb-4 flex items-center gap-3 text-sm font-medium tracking-widest text-[--color-ink-mute] uppercase">
                <span className="h-px w-8 bg-gradient-to-r from-[--color-violet] to-[--color-magenta]" />
                {eyebrow}
              </p>
            </Reveal>
          )}
          {title && (
            <h2>
              <AnimatedText
                text={title}
                className="block font-[family-name:--font-display] text-4xl font-extrabold leading-[1.05] tracking-tight text-[--color-ink] md:text-6xl"
              />
            </h2>
          )}
          {intro && (
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-[--color-ink-soft]">{intro}</p>
            </Reveal>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

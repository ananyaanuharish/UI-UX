import { Layers, Accessibility, GitPullRequestArrow, Palette, Gauge, TestTube2 } from "lucide-react";
import Section from "../components/Section";
import StickyStack from "../components/StickyStack";

// A bento grid — glance.com's signature feature layout. Each tile states one
// thing Ananya does, with a playful accent pulled from Glance's tile palette.
const tiles = [
  {
    icon: Layers,
    title: "Design systems that scale",
    body: "A shared ShadCN + Tailwind component library — skeletons, modals, toasts — kept one visual language across four product portals.",
    span: "md:col-span-2",
    accent: "var(--color-violet)",
  },
  {
    icon: Accessibility,
    title: "Accessible by default",
    body: "WCAG-minded: keyboard paths, focus states, reduced-motion.",
    span: "",
    accent: "var(--color-green)",
  },
  {
    icon: GitPullRequestArrow,
    title: "Design → production, no handoff gap",
    body: "I prototype in Figma, then ship the same flow in React — responsive across all breakpoints. One person, one loop.",
    span: "",
    accent: "var(--color-sky)",
  },
  {
    icon: Gauge,
    title: "10+ explicit UI states",
    body: "Loading, empty, error, validation, success — every state designed, never an afterthought.",
    span: "md:col-span-2",
    accent: "var(--color-orange)",
  },
  {
    icon: Palette,
    title: "Motion with intent",
    body: "Framer Motion transitions that guide attention, not just decorate.",
    span: "",
    accent: "var(--color-magenta)",
  },
  {
    icon: TestTube2,
    title: "Tested before it ships",
    body: "Playwright + Claude scripts validate flows and edge cases before every release.",
    span: "md:col-span-2",
    accent: "var(--color-purple)",
  },
];

export default function Bento() {
  return (
    <Section
      id="what"
      eyebrow="What I do"
      title="Six ways I make products better"
      intro="Design and engineering aren't separate steps for me — they're one continuous craft."
    >
      <StickyStack className="mx-auto max-w-3xl">
        {tiles.map((t, i) => {
          const Icon = t.icon;
          return (
            <div
              key={t.title}
              className="card group relative overflow-hidden p-8 md:p-10"
              style={{ boxShadow: "0 -8px 40px -12px rgba(20,18,28,0.12)" }}
            >
              {/* Accent edge + wash */}
              <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: t.accent }} />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(120% 80% at 0% 0%, color-mix(in oklab, ${t.accent} 10%, transparent), transparent 70%)` }}
              />
              <div className="relative flex items-start gap-5">
                <span
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
                  style={{ background: `color-mix(in oklab, ${t.accent} 14%, transparent)`, color: t.accent }}
                >
                  <Icon size={24} strokeWidth={2.2} />
                </span>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-[family-name:--font-display] text-sm font-extrabold text-[--color-ink-mute]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[family-name:--font-display] text-2xl font-bold text-[--color-ink]">
                      {t.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-xl leading-relaxed text-[--color-ink-soft]">{t.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </StickyStack>
    </Section>
  );
}

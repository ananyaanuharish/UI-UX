# Ananya A H — Portfolio

A personal portfolio for a UX Designer & Frontend Developer, built in the same
stack Ananya ships with day-to-day — so the site *is* the work sample.

**Stack:** React 19 · Vite 6 · Tailwind CSS v4 · Framer Motion · Lucide icons

## Design notes

Design language mirrors [glance.com](https://glance.com) (Glance / InMobi):

- **Bright, premium, white canvas** with soft violet/magenta gradient orbs — not dark.
- **Signature gradient** `#5a34f5 → #8725d6 → #be52c4`, pulled from Glance's own CSS,
  with playful sky / green / orange pops on the bento tiles.
- **Type:** `Manrope` (Glance's actual body font) + `Bricolage Grotesque` as a
  characterful, rounded display face (free stand-in for Glance's proprietary Baoutest Display).
- **Signature layout:** a bento feature grid and Glance's rhythmic two-verb
  headline cadence ("Glance it. Shop it." → "Design it. Ship it.").
- Motion is scroll-driven and staggered, with a pointer-tracking glow on project cards.
- Accessibility first: visible focus rings, semantic landmarks, and a full
  `prefers-reduced-motion` fallback.
- All content lives in [`src/data.js`](src/data.js) — a single source of truth
  the UI derives from. Edit copy there.

## Local development

```bash
npm install      # first time
npm run dev      # start dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

> This folder uses a local `.npmrc` pointing at the public npm registry so it
> works independently of any corporate registry config.

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com) — it auto-detects
Vite. No config needed. Update the `github` / `linkedin` URLs in `src/data.js`
before shipping.

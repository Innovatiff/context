# Honest Picture

> You see your life from the inside. We'll show you what it looks like from the outside.

A serious, data-driven, emotionally intelligent website that helps people understand
where they actually stand in life — using real research, real population data, and
honest global context. Not advice. Not therapy. **A mirror made of data.**

Built to scale into a library of up to **500 evergreen research pages** around the
most universal human question: *Am I okay?*

- **Live domain:** honestpicture.com
- **Brand shown in UI:** Honest Picture
- **Stack:** [Astro](https://astro.build) static site + content collections

---

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # static production build → dist/
npm run preview  # preview the production build
npm run check    # Astro + TypeScript diagnostics
```

The build is fully static and can be hosted on any static host (Netlify, Vercel,
Cloudflare Pages, GitHub Pages, S3, etc.).

---

## What's here

| Area | Path |
| --- | --- |
| Homepage | `src/pages/index.astro` |
| Context Assessment tool | `src/pages/assessment.astro` + `src/scripts/assessmentApp.ts` |
| Insight page template | `src/pages/insights/[slug].astro` |
| Life-area category template | `src/pages/[category].astro` |
| Index pages | `life-areas`, `research-library`, `the-data` |
| Trust / legal pages | `about`, `contact`, `privacy-policy`, `terms`, `disclaimer`, `data-sources`, `research-methodology`, `how-we-use-data` |
| Insight content | `src/content/insights/*.json` |
| Taxonomy / data | `src/data/*.ts` |
| Components | `src/components/*.astro` |
| Design system | `src/styles/global.css` |
| Site config | `src/consts.ts` |

See [`CLAUDE.md`](./CLAUDE.md) for architecture details and **how to add a new
insight page** (the core scaling workflow).

---

## Editorial principles (non-negotiable)

This site lives or dies on trust. Every page must follow these:

1. **Trust first** — no claim without a real, citable source. No invented statistics.
2. **Context, not verdicts** — show the distribution; never grade someone's place in it.
3. **Honest language** — "the data suggests", "research is mixed"; never "you're falling
   behind", "this will change your life", or "scientifically proven".
4. **Privacy by design** — the assessment runs entirely in the browser; answers are
   never stored or transmitted.
5. **Emotional intelligence without therapy-speak** — humane and accurate at once.

---

## AdSense & analytics (disabled by default)

The site is **AdSense-ready but ships with ads off**. Nothing loads and no fake ads
render until you explicitly enable it. See `src/consts.ts` (`ADSENSE`, `ANALYTICS`)
and the env vars below.

| Env var | Purpose | Default |
| --- | --- | --- |
| `PUBLIC_ADSENSE_ENABLED` | Master ad switch (set `true` after approval) | `false` |
| `PUBLIC_ADSENSE_CLIENT` | `ca-pub-XXXXXXXXXXXXXXXX` | empty |
| `PUBLIC_ADSENSE_PLACEHOLDERS` | Show reserved ad zones during review only | `false` |
| `PUBLIC_ANALYTICS_ENABLED` | Enable Firebase analytics | `false` |

**Go-live checklist for AdSense:** set the env vars above, then replace the publisher
ID placeholder in [`public/ads.txt`](./public/ads.txt). Ad slots already live only in
policy-safe zones (never inside the assessment or its results).

---

## License & content

Original writing, design, and presentation are proprietary to Honest Picture. Underlying
research and statistics belong to their cited authors and institutions.

# CLAUDE.md — Honest Picture

Guidance for working in this repository.

## What this is

A static [Astro](https://astro.build) site that places people's real-life numbers
(money, time, work, relationships, health, purpose) inside real population data and
research. Brand name in UI is **Honest Picture**; domain is **honestpicture.com**. The
library has reached its planned ~500 cited research pages.

## Commands

```bash
npm run dev        # dev server
npm run build      # static build to dist/ (validates content schema via Zod)
npm run check      # astro check (TS + template diagnostics)
```

Always run `npm run build` after content or template changes — it validates every
insight JSON file against the content schema and fails loudly on bad data.

## Architecture

- **Content collection** `insights` is defined in `src/content.config.ts` with a Zod
  schema. Each page is one JSON file in `src/content/insights/`. The glob loader picks
  them up automatically — **no page is hand-coded.**
- **Templates** read the collection:
  - `src/pages/insights/[slug].astro` — one page per insight via `getStaticPaths`.
  - `src/pages/[category].astro` — one page per category from `src/data/categories.ts`.
- **Taxonomy** lives in `src/data/`:
  - `categories.ts` — the 10 categories (top-level URLs), the 500-page plan
    (`targetPages`), category FAQs, and cross-links. **An insight's `category` field
    must match a slug here.**
  - `lifeAreas.ts` — the six homepage life-area cards.
  - `assessment.ts` — the assessment's sections/questions + per-area result copy.
  - `populationData.ts` — the population-data engine (`contextFor`) + `SOURCE_LIST`.
  - `navigation.ts` — header/footer links.
- **Assessment** is a framework-free client app (`src/scripts/assessmentApp.ts`)
  mounted by `src/pages/assessment.astro`. It imports the data modules directly and
  runs entirely in the browser. **Never** make it store or transmit answers.
- **Design system** is `src/styles/global.css` (tokens + base) plus scoped component
  styles. Palette and type are defined as CSS custom properties.
- **Site config / flags** are in `src/consts.ts` (`SITE`, `ADSENSE`, `ANALYTICS`).

## How to add a new insight page (the core scaling workflow)

1. Create `src/content/insights/<slug>.json`. The filename slug should equal the
   `slug` field.
2. Fill every required field in the schema (see `src/content.config.ts`). The six
   prose fields (`honestAnswer`, `whatDataShows`, `whyItFeelsDifferent`,
   `whatResearchSaysToDo`, `whatDoesNotHelp`, `realNumbersInContext`) may be a string
   or an **array of paragraph strings** (prefer arrays of 2–3 paragraphs).
3. Set `category` to an existing slug from `categories.ts`. Set `lifeArea` to that
   category's display name.
4. Add 4–6 `faqs`, real `dataSources` (government data / peer-reviewed / established
   surveys only), and 3–4 `relatedInsights` slugs that exist.
5. Optionally add `realNumbers` (3–4 `{value,label,source}` stats) for the visual
   stat block, and `featured: true` to surface on the homepage.
6. Run `npm run build`. The page, its sitemap entry, breadcrumbs, JSON-LD, related
   links, and category listing are generated automatically.

Use the two reference pages as the quality bar:
`why-you-feel-behind-even-when-youre-not.json` and
`what-most-people-your-age-actually-have-saved.json`.

## Editorial rules (enforce these)

- **No invented statistics or studies, ever.** Cite real sources; hedge numbers
  ("roughly", "about"); say so when research is mixed or thin.
- **Context, not verdicts.** Never tell someone they're doing well or badly.
- **Honest language only.** Avoid "falling behind", "this will change your life",
  "scientifically proven", "guaranteed results".
- `whatDoesNotHelp` is as important as `whatResearchSaysToDo` — name the things that
  research shows don't work.
- Every page needs unique `metaTitle` / `metaDescription`, a `lastReviewed` date, and
  cited sources.

## Ads & privacy

- Ads are off by default and gated behind `ADSENSE.enabled` + a client ID. The
  `AdSlot` component renders nothing pre-approval (or a labelled placeholder if
  `PUBLIC_ADSENSE_PLACEHOLDERS=true`). Never place an `AdSlot` inside the assessment
  or its results, or adjacent to a data finding.
- The assessment must remain stateless and client-only. No accounts, no storage.

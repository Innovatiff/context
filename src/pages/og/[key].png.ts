/**
 * Static OG image endpoint: one branded 1200×630 PNG per page.
 *
 * Keys:
 *   <insight-slug>      — article card (title + first real number when present)
 *   cat--<slug>         — category / life-area card
 *   page--<name>        — core pages (home, assessment, game, library, …)
 *
 * Everything renders at build time; see src/lib/og.ts for the template.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { CATEGORIES } from '../../data/categories';
import { renderOg, type OgSpec } from '../../lib/og';

const insights = await getCollection('insights');

/** Truncate on a word boundary, for keyFinding subtitles. */
function clip(text: string, max = 120): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

const specs = new Map<string, OgSpec>();

// Core pages -----------------------------------------------------------------
const statCount = insights.filter((e) => e.data.realNumbers?.length).length;
const pageSpecs: Record<string, OgSpec> = {
  default: {
    kicker: 'A mirror made of data',
    title: "You see your life from the inside. We'll show you what it looks like from the outside.",
    sub: 'Real research, population data, and honest global context.',
  },
  home: {
    kicker: 'A mirror made of data',
    title: "You see your life from the inside. We'll show you what it looks like from the outside.",
    sub: 'Real research, population data, and honest global context.',
  },
  assessment: {
    kicker: 'The Assessment',
    title: 'See where you actually stand — across the six areas that shape a life.',
    sub: 'About 20 honest questions · real population data · nothing stored, ever.',
  },
  'reality-check': {
    kicker: 'Daily Game',
    title: 'How well do you actually know normal?',
    sub: 'One real number about ordinary life, every day. Guess it, then see the honest picture.',
  },
  'research-library': {
    kicker: 'Research Library',
    title: 'Honest answers to the questions people quietly carry.',
    sub: `${insights.length} in-depth pages, each grounded in cited population data and published research.`,
  },
  'life-areas': {
    kicker: 'Life Areas',
    title: 'The areas that shape a life, in honest context.',
    sub: 'Money, time, work, relationships, health, and meaning — measured, not judged.',
  },
  'the-data': {
    kicker: 'The Data',
    title: 'Where every number on this site comes from.',
    sub: 'Government data, peer-reviewed research, and established surveys — all named, all cited.',
  },
  about: {
    kicker: 'About',
    title: 'A mirror made of data — not advice, not therapy, not judgment.',
    sub: 'Why Honest Picture exists and the editorial rules every page has to pass.',
  },
  'by-the-numbers': {
    kicker: 'By the Numbers',
    title: 'Ordinary life, by the numbers.',
    sub: `Key figures from ${statCount} cited research pages — savings, sleep, friendship, work, and more.`,
  },
  'how-to-read-statistics': {
    kicker: 'Guide',
    title: 'How to read statistics about your life.',
    sub: 'Medians, base rates, and the quiet traps that make honest numbers feel wrong.',
  },
};
for (const [name, spec] of Object.entries(pageSpecs)) {
  specs.set(`page--${name}`, spec);
}

// Category pages ---------------------------------------------------------------
for (const cat of CATEGORIES) {
  const count = insights.filter((e) => e.data.category === cat.slug).length;
  if (count === 0) continue;
  specs.set(`cat--${cat.slug}`, {
    kicker: 'Life Area',
    title: cat.title,
    sub: `${count} research-backed pages on ${cat.shortLabel.toLowerCase()}, grounded in real population data.`,
  });
}

// Insight pages ----------------------------------------------------------------
for (const e of insights) {
  const stat = e.data.realNumbers?.[0];
  specs.set(e.data.slug, {
    kicker: e.data.lifeArea,
    title: e.data.title,
    ...(stat
      ? { stat: { value: stat.value, label: clip(stat.label, 90) } }
      : { sub: clip(e.data.keyFinding, 130) }),
  });
}

export function getStaticPaths() {
  return [...specs.keys()].map((key) => ({ params: { key } }));
}

export const GET: APIRoute = async ({ params }) => {
  const spec = specs.get(params.key!);
  if (!spec) return new Response('Not found', { status: 404 });
  const png = await renderOg(spec);
  // Uint8Array is a valid body at runtime; TS dom lib is stricter than Astro.
  return new Response(png as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

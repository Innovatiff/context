import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * A prose field that may be a single paragraph or several. Authors can write
 * either a string or an array of strings; templates always render an array.
 */
const prose = z.union([z.string(), z.array(z.string())]);

const faq = z.object({
  question: z.string(),
  answer: z.string(),
});

/**
 * A structured statistic for the visual "Real numbers in context" block.
 * `value` is the headline figure (kept as a string so we can show "$65,000",
 * "1–2", "≈13%" etc.), `label` explains it, `source` attributes it.
 */
const stat = z.object({
  value: z.string(),
  label: z.string(),
  source: z.string().nullish(),
});

/** A custom titled prose section, for page-specific structure/explanation. */
const proseSection = z.object({
  heading: z.string(),
  body: prose,
  /** Optional anchor id; slugified from heading if omitted. */
  id: z.string().nullish(),
});

/** A real, sourced data table — rows/columns of figures. */
const dataTable = z.object({
  title: z.string().nullish(),
  caption: z.string().nullish(),
  columns: z.array(z.string()).min(1),
  rows: z.array(z.array(z.string())).min(1),
  /** Optional column index (0-based) to emphasise. */
  highlightColumn: z.number().optional(),
  source: z.string().nullish(),
});

/** One bar in a distribution chart. `value` drives the bar length. */
const bar = z.object({
  label: z.string(),
  value: z.number(),
  /** Display string for the value (e.g. "$135k", "≈13%"); falls back to value. */
  display: z.string().nullish(),
  /** Emphasise this bar (e.g. "you are here"). */
  highlight: z.boolean().optional(),
});

/** A simple, data-driven bar chart built from real figures. */
const distribution = z.object({
  title: z.string().nullish(),
  caption: z.string().nullish(),
  unit: z.string().nullish(),
  source: z.string().nullish(),
  bars: z.array(bar).min(2),
});

/** A concrete worked example / scenario that makes the data tangible. */
const example = z.object({
  label: z.string().nullish(),
  title: z.string(),
  body: prose,
});

/** An emphasised, sourced statement pulled out of the flow. */
const pullQuote = z.object({
  text: z.string(),
  source: z.string().nullish(),
});

/**
 * The insight collection — the heart of the site. Every research/insight page
 * is one JSON entry validated against this schema. Adding a page = adding a file.
 */
const insights = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    lifeArea: z.string(),
    /** Plain one-sentence statement of the most important finding. */
    keyFinding: z.string(),
    /** The direct, no-preamble answer shown at the very top of the page. */
    honestAnswer: prose,
    whatDataShows: prose,
    whyItFeelsDifferent: prose,
    whatResearchSaysToDo: prose,
    whatDoesNotHelp: prose,
    realNumbersInContext: prose,
    /** Optional structured figures rendered as a visual stat block. */
    realNumbers: z.array(stat).optional(),
    faqs: z.array(faq).min(1),
    dataSources: z.array(z.string()).min(1),
    relatedInsights: z.array(z.string()).default([]),
    lastReviewed: z.string(),

    /* ---- Optional rich modules (compose per page for variety & depth) ---- */
    /** Page layout variant — changes structure/emphasis. */
    layout: z.enum(['standard', 'data-forward', 'narrative']).default('standard'),
    /** Scannable bullet summary shown near the top. */
    keyTakeaways: z.array(z.string()).optional(),
    /** Real, sourced data tables. */
    tables: z.array(dataTable).optional(),
    /** Data-driven bar charts from real figures. */
    distributions: z.array(distribution).optional(),
    /** Concrete worked examples / scenarios. */
    examples: z.array(example).optional(),
    /** Page-specific titled prose sections, for unique structure. */
    extraSections: z.array(proseSection).optional(),
    /** Additional emphasised, sourced statements. */
    pullQuotes: z.array(pullQuote).optional(),

    /** Optional surfacing controls. */
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

export const collections = { insights };

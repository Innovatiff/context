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
  source: z.string().optional(),
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
    /** Optional surfacing controls. */
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

export const collections = { insights };

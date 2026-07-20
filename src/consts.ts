/**
 * Global site configuration.
 *
 * Centralised so every page, the layout, the SEO component and the build config
 * read the same values. Brand name, canonical URL, and the AdSense publisher ID
 * all live here.
 */

export const SITE = {
  /** Public brand name shown in the UI. */
  name: 'Honest Picture',
  /** Short product/working name. */
  shortName: 'Honest Picture',
  /** Canonical production URL (no trailing slash). */
  url: 'https://honestpicture.com',
  /** One-line description used as a meta fallback. */
  description:
    'See where you actually stand in life using real research, population data, and honest global context. A mirror made of data — not advice, not therapy.',
  /** The main promise, used in hero / OG copy. */
  promise:
    "You see your life from the inside. We'll show you what it looks like from the outside.",
  /** Default social/OG image (generated at build by /og/[key].png). */
  ogImage: '/og/page--default.png',
  /** Contact address. */
  email: 'hello@honestpicture.com',
  /** Locale for html lang + OG. */
  locale: 'en_US',
  lang: 'en',
} as const;

/**
 * Site author. Every article carries this byline and Person structured data.
 * To use a real photo, drop it in /public/authors/ and update `image` here.
 */
export const AUTHOR = {
  name: 'Daniel Hernandez',
  /** Optimised avatar (240px, ~6KB). Original photo: daniel-hernandez.jpg. */
  image: '/authors/daniel-hernandez-avatar.jpg',
  /** Where the byline links. */
  url: '/about',
} as const;

/**
 * AdSense configuration.
 *
 * The site is built AdSense-ready but ships with ads DISABLED. To go live after
 * approval: set `enabled: true` and add the real publisher ID (or the
 * PUBLIC_ADSENSE_CLIENT env var). Until then no ad script loads and ad slots
 * render as quiet, clearly-labelled reserved placeholders only.
 *
 * Env override (recommended): set PUBLIC_ADSENSE_CLIENT and PUBLIC_ADSENSE_ENABLED.
 */
export const ADSENSE = {
  /** Master switch. Keep false until Google AdSense approval. */
  enabled: (import.meta.env.PUBLIC_ADSENSE_ENABLED ?? 'false') === 'true',
  /** Publisher ID, e.g. "ca-pub-XXXXXXXXXXXXXXXX". */
  client: import.meta.env.PUBLIC_ADSENSE_CLIENT ?? '',
  /**
   * Whether to render reserved (empty, labelled) ad placeholders while disabled.
   * This lets us see and review ad-safe zones during development without
   * showing fake ads. Set false for a completely clean pre-approval site.
   */
  showPlaceholders: (import.meta.env.PUBLIC_ADSENSE_PLACEHOLDERS ?? 'false') === 'true',
} as const;

/**
 * Firebase web config (analytics only).
 *
 * Analytics is OFF by default and only initialises when ANALYTICS.enabled is
 * true AND the visitor has not opted out. No assessment answers are ever sent
 * to analytics — see /how-we-use-data.
 */
export const ANALYTICS = {
  enabled: (import.meta.env.PUBLIC_ANALYTICS_ENABLED ?? 'false') === 'true',
  firebase: {
    apiKey: 'AIzaSyCR9kD0kItJmfb-GyDSF1ORSgPjHs1KOBk',
    authDomain: 'context-d1cd2.firebaseapp.com',
    projectId: 'context-d1cd2',
    storageBucket: 'context-d1cd2.firebasestorage.app',
    messagingSenderId: '791575287857',
    appId: '1:791575287857:web:b4db9a9fdadf8bf2809d10',
    measurementId: 'G-GDZM10GEBL',
  },
} as const;

/** Standard disclaimer used across the site. */
export const DISCLAIMER =
  'Honest Picture presents publicly available research, government data, and peer-reviewed studies to help people understand their lives in honest context. It is not medical, psychological, financial, or legal advice. If you are experiencing a mental health crisis, please contact a qualified professional.';

/** Short disclaimer for compact spaces. */
export const DISCLAIMER_SHORT =
  'Educational and informational only. Not medical, psychological, financial, or legal advice.';

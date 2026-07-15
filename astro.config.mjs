// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { SITE } from './src/consts.js';

// https://astro.build
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'never',
  integrations: [
    sitemap({
      // Keep the assessment results out of search results — it is an interactive
      // tool, not an indexable content page, and has no stable URL state.
      filter: (page) => !page.includes('/assessment/result'),
      changefreq: 'monthly',
      priority: 0.7,
      // Emit <lastmod> so crawlers get a freshness signal — a mild but real help
      // for prioritising crawl of a new site. Uses the build/deploy date.
      lastmod: new Date(),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
    // Emit `slug.html` files instead of `slug/index.html` directories. On
    // Netlify, directory output means the page is served at `/slug/` and the
    // slash-less URL 301-redirects to it — while our canonicals, internal
    // links, and sitemap all use the slash-less form (trailingSlash: 'never').
    // Google was following sitemap URLs into 301s ("Page with redirect") whose
    // targets pointed their canonical back at the redirecting URL, stalling
    // indexing. 'file' format makes the canonical URL itself return 200.
    format: 'file',
  },
  compressHTML: true,
});

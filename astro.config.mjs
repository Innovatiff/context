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
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});

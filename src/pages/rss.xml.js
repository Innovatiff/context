import { getCollection } from 'astro:content';
import { SITE } from '../consts';

/**
 * RSS feed — hand-rolled (no extra dependency) static endpoint at /rss.xml.
 * Includes the 100 most recently reviewed insight pages so readers and
 * aggregators can follow new research pages as they're published.
 */

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

export async function GET() {
  const insights = await getCollection('insights');

  const items = insights
    .map((e) => e.data)
    .sort((a, b) =>
      b.lastReviewed === a.lastReviewed
        ? a.title.localeCompare(b.title)
        : b.lastReviewed.localeCompare(a.lastReviewed)
    )
    .slice(0, 100)
    .map((d) => {
      const url = `${SITE.url}/insights/${d.slug}`;
      const pubDate = new Date(`${d.lastReviewed}-01T00:00:00Z`).toUTCString();
      return `    <item>
      <title>${esc(d.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${esc(d.lifeArea)}</category>
      <description>${esc(d.metaDescription)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${SITE.url}</link>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${esc(SITE.description)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}

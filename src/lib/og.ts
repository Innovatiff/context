/**
 * Build-time OG image renderer.
 *
 * Renders 1200×630 social share cards with satori (JSX-free element trees)
 * and rasterises them to PNG with resvg. Used only by the /og/[key].png
 * endpoint, so all of this runs at build — nothing ships to the client.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export interface OgSpec {
  /** Small uppercase label, top right (category / section name). */
  kicker: string;
  /** Main headline. */
  title: string;
  /** Optional big statistic (shown instead of `sub` when present). */
  stat?: { value: string; label: string };
  /** Optional one-line subtitle under the title. */
  sub?: string;
}

const font = (rel: string) =>
  readFileSync(path.resolve('node_modules/@fontsource', rel));

const fonts = [
  { name: 'Inter', data: font('inter/files/inter-latin-500-normal.woff'), weight: 500 as const, style: 'normal' as const },
  { name: 'Inter', data: font('inter/files/inter-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
  { name: 'Fraunces', data: font('fraunces/files/fraunces-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
  { name: 'Fraunces', data: font('fraunces/files/fraunces-latin-700-normal.woff'), weight: 700 as const, style: 'normal' as const },
];

/** Plain-object element helper (satori accepts React-shaped trees). */
const h = (
  type: string,
  style: Record<string, unknown>,
  children?: unknown
) => ({ type, props: { style, children } });

/** Image element: src/width/height are props (not style) in satori. */
const img = (
  src: string,
  width: number,
  height: number,
  style: Record<string, unknown> = {}
) => ({ type: 'img', props: { src, width, height, style } });

/** The brand bell curve + "you are here" marker, as a data-URI background. */
const curveSvg = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 360" fill="none">` +
    `<path d="M0 330 C 330 330 430 60 600 60 C 770 60 870 330 1200 330" stroke="#0d9488" stroke-width="5" stroke-linecap="round" opacity="0.5"/>` +
    `<path d="M40 330 H 1160" stroke="#57534e" stroke-width="3" opacity="0.5"/>` +
    `<path d="M760 330 V 172" stroke="#d97706" stroke-width="4" stroke-linecap="round" opacity="0.9"/>` +
    `<circle cx="760" cy="150" r="14" fill="#d97706"/>` +
  `</svg>`
);

const markSvg = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">` +
    `<path d="M3 18C7 18 8.5 6 12 6C15.5 6 17 18 21 18" stroke="#2dd4bf" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M2.6 18H21.4" stroke="#a8a29e" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>` +
    `<path d="M15.2 18V11.7" stroke="#d97706" stroke-width="1.4" stroke-linecap="round"/>` +
    `<circle cx="15.2" cy="10.4" r="2" fill="#d97706"/>` +
  `</svg>`
);

function titleSize(title: string): number {
  if (title.length <= 44) return 66;
  if (title.length <= 70) return 56;
  if (title.length <= 95) return 48;
  return 42;
}

function tree(spec: OgSpec) {
  const bottom = spec.stat
    ? h(
        'div',
        { display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 1020 },
        [
          h(
            'div',
            {
              display: 'flex',
              fontFamily: 'Fraunces',
              fontWeight: 700,
              fontSize: 58,
              color: '#5eead4',
              lineHeight: 1,
            },
            spec.stat.value
          ),
          h(
            'div',
            {
              display: 'flex',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: 25,
              color: '#b8b1aa',
              lineHeight: 1.3,
            },
            spec.stat.label
          ),
        ]
      )
    : spec.sub
      ? h(
          'div',
          {
            display: 'flex',
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 27,
            color: '#b8b1aa',
            lineHeight: 1.45,
            maxWidth: 980,
          },
          spec.sub
        )
      : h('div', { display: 'flex' });

  return h(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '56px 64px',
      backgroundColor: '#171412',
      position: 'relative',
      fontFamily: 'Inter',
    },
    [
      // Faint brand curve behind everything
      img(`data:image/svg+xml,${curveSvg}`, 1200, 360, {
        position: 'absolute',
        left: 0,
        bottom: -40,
        opacity: 0.35,
      }),
      // Header row: brand left, kicker chip right
      h(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        },
        [
          h('div', { display: 'flex', alignItems: 'center', gap: 14 }, [
            img(`data:image/svg+xml,${markSvg}`, 44, 44),
            h(
              'div',
              {
                display: 'flex',
                fontFamily: 'Fraunces',
                fontWeight: 600,
                fontSize: 30,
                color: '#fafaf9',
              },
              'Honest Picture'
            ),
          ]),
          h(
            'div',
            {
              display: 'flex',
              fontSize: 19,
              fontWeight: 600,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: '#fbbf24',
              border: '1.5px solid #44403c',
              borderRadius: 999,
              padding: '10px 22px',
            },
            spec.kicker
          ),
        ]
      ),
      // Title
      h(
        'div',
        {
          display: 'flex',
          fontFamily: 'Fraunces',
          fontWeight: 600,
          fontSize: titleSize(spec.title),
          color: '#fafaf9',
          lineHeight: 1.14,
          maxWidth: 1040,
          letterSpacing: -0.5,
        },
        spec.title
      ),
      // Stat / subtitle + domain footer
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          width: '100%',
        },
        [
          bottom,
          h(
            'div',
            {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              borderTop: '1.5px solid #2e2a26',
              paddingTop: 24,
            },
            [
              h(
                'div',
                { display: 'flex', fontSize: 22, fontWeight: 600, color: '#948c84' },
                'honestpicture.com'
              ),
              h(
                'div',
                { display: 'flex', fontSize: 20, fontWeight: 500, color: '#78716c' },
                'Real numbers in real context'
              ),
            ]
          ),
        ]
      ),
    ]
  );
}

export async function renderOg(spec: OgSpec): Promise<Uint8Array> {
  const svg = await satori(tree(spec) as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts,
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
    .render()
    .asPng();
}

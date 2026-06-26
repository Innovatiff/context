/**
 * The six core life areas shown on the homepage and covered by the assessment.
 * Each links to its category page. Icons are inline SVG path data (currentColor).
 */

export interface LifeArea {
  title: string;
  /** Category slug it links to. */
  slug: string;
  tagline: string;
  /** Inner SVG markup (24x24 viewBox, stroke=currentColor). */
  icon: string;
}

export const LIFE_AREAS: LifeArea[] = [
  {
    title: 'Money & Financial Reality',
    slug: 'money-and-financial-reality',
    tagline: 'Income, savings, and the gap between secure and feeling secure.',
    icon: '<circle cx="12" cy="12" r="8"/><path d="M12 8v8M9.5 9.8a2 2 0 0 1 2-1.3h.8a1.7 1.7 0 0 1 .3 3.4h-1.2a1.7 1.7 0 0 0-.3 3.4h.8a2 2 0 0 0 2-1.3"/>',
  },
  {
    title: 'Time & How You Spend It',
    slug: 'time-and-how-you-use-it',
    tagline: 'Where your hours actually go versus where you think they go.',
    icon: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/>',
  },
  {
    title: 'Work & Career',
    slug: 'work-and-career',
    tagline: 'Meaning, stability, and the work you expected versus the work you do.',
    icon: '<rect x="3.5" y="7" width="17" height="12" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12h17"/>',
  },
  {
    title: 'Relationships & Connection',
    slug: 'relationships-and-connection',
    tagline: 'Close friendships, loneliness, and the strength of your support.',
    icon: '<path d="M12 20s-6.5-4.2-8.4-8.2A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8.4 4.8C18.5 15.8 12 20 12 20Z"/>',
  },
  {
    title: 'Health & Energy',
    slug: 'health-and-energy',
    tagline: 'Physical health, energy, and what limits what you want to do.',
    icon: '<path d="M3.5 12h4l2-4 3 8 2-4h6"/>',
  },
  {
    title: 'Purpose & Direction',
    slug: 'purpose-and-direction',
    tagline: 'Clarity, drift, and whether your days reflect what matters.',
    icon: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.2"/><path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3"/>',
  },
];

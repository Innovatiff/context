/** Primary navigation and footer structure. */

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Header nav. Deliberately short labels and no assessment entry — the header
 * CTA is the assessment link, so listing it twice just crowds the bar.
 */
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Reality Check', href: '/reality-check' },
  { label: 'Life Areas', href: '/life-areas' },
  { label: 'Research Library', href: '/research-library' },
  { label: 'The Data', href: '/the-data' },
  { label: 'About', href: '/about' },
];

export interface FooterColumn {
  heading: string;
  links: NavItem[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Explore',
    links: [
      { label: 'Take the Assessment', href: '/assessment' },
      { label: 'Daily Reality Check', href: '/reality-check' },
      { label: 'Life Areas', href: '/life-areas' },
      { label: 'Research Library', href: '/research-library' },
      { label: 'The Data', href: '/the-data' },
      { label: 'By the Numbers', href: '/by-the-numbers' },
      { label: 'RSS Feed', href: '/rss.xml' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Research Methodology', href: '/research-methodology' },
      { label: 'Data Sources', href: '/data-sources' },
      { label: 'How to Read Statistics', href: '/how-to-read-statistics' },
    ],
  },
  {
    heading: 'Trust & Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'How We Use Data', href: '/how-we-use-data' },
    ],
  },
];

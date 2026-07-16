/** Primary navigation and footer structure. */

export interface NavItem {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Take the Assessment', href: '/assessment' },
  { label: 'Daily Reality Check', href: '/reality-check' },
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

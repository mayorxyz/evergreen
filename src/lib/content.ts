export const NAV_LINKS = [
  { label: 'Product', path: '/product', dot: 'var(--color-green)' },
  { label: 'Pricing', path: '/pricing', dot: 'var(--color-pink)' },
  { label: 'Blog', path: '/blog', dot: 'var(--color-blue)' },
  { label: 'About', path: '/about', dot: 'var(--color-orange)' },
  { label: 'Docs', path: '/docs', dot: 'var(--color-purple)' },
];

export const STATS = [
  { value: 30, suffix: '%+', label: 'Higher CTR' },
  { value: 20, suffix: '%+', label: 'Increase in DAU' },
  { value: 30, suffix: '%+', label: 'Lift in retention' },
];

export const TRUSTED_LOGOS = [
  'Garden Lore Games',
  'rockwave',
  'PlayNorth',
  'SciArc',
  'NovaPlay',
  'ARC',
];

export const BENTO_ITEMS = [
  {
    title: 'Rewards that feel like magic',
    text: 'Personalized, in-game prizes tied to your messages. One setup powers every channel.',
  },
  {
    title: 'Instant setup, zero lag',
    text: 'Create push, email, and link campaigns in minutes—triggered by installs, purchases, or session gaps.',
  },
  {
    title: 'Segments that actually segment',
    text: 'Define audiences by play style, VIP level, recent spend, or engagement shifts. Combine them like logic blocks.',
  },
  {
    title: 'Mix, match, automate',
    text: 'From big spenders to casual players, customize offers to match. Handle it all in a single configuration.',
  },
];

export const INTEGRATE_STEPS = [
  {
    tag: '#integrate',
    keyword: 'integrate',
    text: 'Our expert engineers help integrate a single SDK that does it all.',
  },
  {
    tag: '#build',
    keyword: 'build',
    text: 'Create dedicated segments, attach rewards, and craft branded messaging that resonates.',
  },
  {
    tag: '#execute',
    keyword: 'execute',
    text: 'Send push and email campaigns that keep your players coming back for more.',
  },
];

export const FEATURE_ROWS = [
  {
    title: 'Charm players with mystery',
    text: 'Keep core players engaged with daily automated spin-it-to-win-it prizes. We\'ll handle the randomized rewards and make sure your segments are always up to date.',
    phoneType: 'mystery' as const,
    align: 'left' as const,
  },
  {
    title: 'Social clicks that pay off',
    text: 'Share links to your social pages to give your highest ranking players the best rewards. Launch your game from Facebook, Instagram, YouTube, and other social platforms.',
    phoneType: 'social' as const,
    align: 'right' as const,
  },
  {
    title: 'Catch drop-off before it becomes churn',
    text: 'Reach out to players who show signs of slowing down. Identify players by how active they are and target them with specific messaging to motivate them to stay in the game.',
    phoneType: 'churn' as const,
    align: 'left' as const,
  },
  {
    title: 'Say more with less setup',
    text: 'Optimize your incentives to meet the moment. Whether players are just starting out or starting to lapse, test different incentive strategies to keep engagement up.',
    phoneType: 'incentive' as const,
    align: 'right' as const,
  },
];

export const TESTIMONIALS = [
  {
    quote: 'Evergreen is my gold standard for mobile games CRM and I compare everything to it.',
    name: 'Sample Person',
    title: 'VP Retention Manager',
    company: 'PlayNorth',
  },
  {
    quote: 'We have seen direct improvement to revenue and retention due to our partnership with Evergreen.',
    name: 'Sample Person',
    title: 'Executive Producer',
    company: 'Rockwave',
  },
  {
    quote: "Evergreen's ability to help us manage everything from player lifecycles to marketing campaigns has freed up our team to focus on what we do best: creating great games.",
    name: 'Sample Person',
    title: 'CEO',
    company: 'Garden Lore',
  },
];

export const FOOTER_LINKS = {
  Product: [
    { label: 'Why Evergreen', path: '/product' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Schedule demo', path: '/demo' },
  ],
  Resources: [
    { label: 'Docs', path: '/docs' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact Support ↗', path: '/contact' },
  ],
  Company: [
    { label: 'About', path: '/about' },
    { label: 'Contact Sales', path: '/contact' },
  ],
  'Find us': [
    { label: 'LinkedIn ↗', path: 'https://www.linkedin.com/in/babalola-mayor-a819742a0' },
  ],
};

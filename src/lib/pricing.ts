export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: { monthly: 499, yearly: 424 },
    mau: 'Up to 100K MAU',
    features: [
      'Push + Email campaigns',
      '5 segments',
      'Basic rewards',
      'Email support',
      'Standard SDK',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    price: { monthly: 1499, yearly: 1274 },
    mau: 'Up to 1M MAU',
    features: [
      'All channels (Push, Email, Link, In-game)',
      'Unlimited segments',
      'Advanced rewards engine',
      'Slack support',
      'Priority SDK integration',
      'A/B testing',
    ],
    highlighted: true,
  },
  {
    name: 'Studio',
    price: { monthly: null, yearly: null },
    mau: '1M+ MAU',
    features: [
      'Dedicated engineer',
      'Custom SLA',
      'Custom SDK support',
      'SSO',
      'White-glove onboarding',
      'Custom integrations',
    ],
    highlighted: false,
    custom: true,
  },
];

export const PRICING_COMPARE = [
  { feature: 'Monthly Active Users', starter: 'Up to 100K', growth: 'Up to 1M', studio: '1M+' },
  { feature: 'Channels', starter: 'Push, Email', growth: 'All channels', studio: 'All + custom' },
  { feature: 'Segments', starter: '5', growth: 'Unlimited', studio: 'Unlimited' },
  { feature: 'Rewards', starter: 'Basic', growth: 'Advanced engine', studio: 'Custom' },
  { feature: 'Automations', starter: '—', growth: '✓', studio: '✓' },
  { feature: 'SDK support', starter: 'Standard', growth: 'Priority', studio: 'Custom' },
  { feature: 'Onboarding', starter: 'Self-serve', growth: 'Guided', studio: 'White-glove' },
  { feature: 'Support', starter: 'Email', growth: 'Slack', studio: 'Dedicated' },
  { feature: 'SLA', starter: '—', growth: '—', studio: 'Custom' },
  { feature: 'SSO', starter: '—', growth: '—', studio: '✓' },
];

export const PRICING_FAQ = [
  {
    q: 'Can I change plans later?',
    a: 'Yes. Upgrade or downgrade anytime. We prorate the difference.',
  },
  {
    q: 'Is there a free trial?',
    a: 'We offer a 14-day trial on Starter and Growth plans. Book a demo to get started.',
  },
  {
    q: 'What happens if I exceed my MAU limit?',
    a: 'We\'ll reach out to discuss upgrading. No surprise charges.',
  },
  {
    q: 'Do you offer discounts for startups?',
    a: 'Yes. Contact us for startup pricing and accelerator programs.',
  },
  {
    q: 'How is billing handled?',
    a: 'Monthly or yearly billing. Yearly saves 15%. Invoicing available for Studio plans.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. No long-term contracts. Cancel anytime from your dashboard.',
  },
];

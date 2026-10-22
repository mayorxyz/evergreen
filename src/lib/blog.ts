export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  content?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'day-1-retention-benchmarks',
    title: 'Day-1 retention benchmarks for F2P games',
    category: 'Retention',
    excerpt: 'What does good Day-1 retention look like in 2026? We analyzed 200+ titles to find the benchmarks that matter.',
    author: 'Sample Person',
    date: '2026-10-15',
    readTime: 7,
  },
  {
    slug: 'mystery-rewards-lift-daily-return',
    title: 'How mystery rewards lift daily return',
    category: 'Rewards',
    excerpt: 'Mystery mechanics drive curiosity and repeat visits. Here\'s how to implement them without frustrating players.',
    author: 'Sample Person',
    date: '2026-10-12',
    readTime: 6,
  },
  {
    slug: 'segmenting-by-spend',
    title: 'Segmenting by spend without overthinking',
    category: 'Retention',
    excerpt: 'Spend-based segments are powerful but easy to over-engineer. A practical framework for getting started.',
    author: 'Sample Person',
    date: '2026-10-08',
    readTime: 8,
  },
  {
    slug: 'push-notification-timing',
    title: 'Push notification timing that respects players',
    category: 'Live ops',
    excerpt: 'When you send matters as much as what you send. Data-driven insights on optimal send windows.',
    author: 'Sample Person',
    date: '2026-10-05',
    readTime: 5,
  },
  {
    slug: 'reading-signs-of-churn',
    title: 'Reading the signs of churn early',
    category: 'Retention',
    excerpt: 'Players don\'t churn overnight. Learn the behavioral signals that predict drop-off weeks in advance.',
    author: 'Sample Person',
    date: '2026-10-01',
    readTime: 7,
  },
  {
    slug: 'designing-reward-economies',
    title: 'Designing reward economies that last',
    category: 'Rewards',
    excerpt: 'A sustainable reward economy keeps players engaged for months, not days. Principles from top-grossing games.',
    author: 'Sample Person',
    date: '2026-09-28',
    readTime: 9,
  },
  {
    slug: 'social-deep-links',
    title: 'Social deep links: from Instagram to install',
    category: 'Live ops',
    excerpt: 'Turn social shares into installs with deep links that preserve context and reward the sharer.',
    author: 'Sample Person',
    date: '2026-09-25',
    readTime: 6,
  },
  {
    slug: 'sdk-integration-checklist',
    title: 'A 5-day SDK integration checklist',
    category: 'Product',
    excerpt: 'A day-by-day guide to integrating the Evergreen SDK. From setup to first campaign in under a week.',
    author: 'Sample Person',
    date: '2026-09-20',
    readTime: 5,
  },
  {
    slug: 'masterclass-in-retention',
    title: 'What a masterclass in retention covers',
    category: 'Retention',
    excerpt: 'Our retention masterclass covers the frameworks, metrics, and tactics that separate good games from great ones.',
    author: 'Sample Person',
    date: '2026-09-15',
    readTime: 4,
  },
];

export const BLOG_CATEGORIES = ['All', 'Retention', 'Rewards', 'Live ops', 'Product'];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 2): BlogPost[] {
  const post = getBlogPost(slug);
  if (!post) return [];
  return BLOG_POSTS
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, count);
}

export function generatePostContent(post: BlogPost): string {
  // Generate mock content based on post
  return `
## Introduction

${post.excerpt} This article dives into the specifics, with examples from real games and actionable takeaways you can implement today.

## The Core Challenge

Most retention strategies fail because they treat all players the same. But player behavior is nuanced. A whale who hasn't logged in for three days needs a different message than a casual player who just hit a new level.

The key is understanding the signals. Session length, purchase frequency, social shares, and feature usage all tell a story about where a player is in their journey.

## A Practical Framework

Here's a framework we've seen work across dozens of titles:

1. **Segment by behavior, not just demographics.** A player's actions matter more than their age or location.
2. **Reward engagement, not just spend.** Give players reasons to come back that aren't tied to opening their wallet.
3. **Test and iterate.** What works for one game might not work for yours. Run experiments and let data guide you.

> "The best retention strategies feel invisible to players. They don't feel marketed to; they feel cared for."

## Implementation Tips

Start small. Pick one segment, one campaign type, and one reward. Measure the impact. Then expand.

Here's a sample segment definition:

\`\`\`
Segment: "Active Spenders"
- Played in last 7 days
- Made at least 1 purchase in last 30 days
- Session length > 10 minutes average
\`\`\`

This segment targets engaged players who are already spending. They're prime candidates for upsell campaigns or loyalty rewards.

## Measuring Success

Track these metrics:

- **Day-1, Day-7, Day-30 retention** for new players
- **Return rate** for lapsed players
- **ARPU** (Average Revenue Per User) by segment
- **Campaign CTR** and conversion rates

Benchmark against industry averages, but focus on your own trends. A 5% improvement in Day-7 retention can have a massive impact on LTV over time.

## Conclusion

Retention is a marathon, not a sprint. Build systems that scale, test relentlessly, and always put the player experience first. The games that win long-term are the ones that make players feel valued, not targeted.
  `.trim();
}

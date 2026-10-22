export type DocSection = {
  slug: string;
  title: string;
  description: string;
  subsections: { title: string; content: string }[];
};

export const DOCS_SECTIONS: DocSection[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Set up your Evergreen account and integrate the SDK in under a week.',
    subsections: [
      {
        title: 'Create an account',
        content: 'Visit the Evergreen dashboard and sign up with your work email. You\'ll receive a welcome email with your App ID and API key.',
      },
      {
        title: 'Install the SDK',
        content: 'Choose your platform (Unity, Unreal, iOS, or Android) and follow the integration guide. Most studios complete setup in 2-3 days.',
      },
      {
        title: 'Initialize the SDK',
        content: 'Call the initialize method with your App ID on game launch. The SDK will handle authentication and session tracking automatically.',
      },
      {
        title: 'Test your integration',
        content: 'Use the test mode to send sample campaigns and verify rewards are fulfilling correctly. Check the dashboard for real-time logs.',
      },
    ],
  },
  {
    slug: 'unity-sdk',
    title: 'Unity SDK',
    description: 'Integrate Evergreen into your Unity game.',
    subsections: [
      {
        title: 'Installation',
        content: 'Download the Evergreen Unity package from the dashboard or install via Package Manager. Requires Unity 2020.3 or later.',
      },
      {
        title: 'Initialization',
        content: 'Call Evergreen.Initialize("YOUR_APP_ID") in your game\'s startup script. The SDK will automatically track sessions and player state.',
      },
      {
        title: 'Claiming rewards',
        content: 'Use Evergreen.Reward() to claim rewards when players tap a campaign. The callback returns success/failure and reward details.',
      },
      {
        title: 'Deep linking',
        content: 'Register a deep link handler to route players from campaigns to specific game screens. Supports custom URI schemes and universal links.',
      },
    ],
  },
  {
    slug: 'unreal-sdk',
    title: 'Unreal SDK',
    description: 'Integrate Evergreen into your Unreal Engine game.',
    subsections: [
      {
        title: 'Installation',
        content: 'Add the Evergreen plugin to your Plugins folder and enable it in Project Settings. Requires Unreal Engine 5.0 or later.',
      },
      {
        title: 'Initialization',
        content: 'Get the Evergreen subsystem and call Initialize() in your GameInstance. The subsystem handles lifecycle events automatically.',
      },
      {
        title: 'Claiming rewards',
        content: 'Call ClaimReward() with the reward ID. The callback provides success status and reward metadata for your game logic.',
      },
      {
        title: 'Blueprint support',
        content: 'All SDK methods are exposed to Blueprint. You can call them from any Blueprint class without C++ code.',
      },
    ],
  },
  {
    slug: 'ios-sdk',
    title: 'iOS SDK',
    description: 'Integrate Evergreen into your native iOS game.',
    subsections: [
      {
        title: 'Installation',
        content: 'Add Evergreen via Swift Package Manager or CocoaPods. Requires iOS 14.0 or later.',
      },
      {
        title: 'Initialization',
        content: 'Call Evergreen.sharedInstance().initialize() in your AppDelegate or SceneDelegate. The SDK tracks app lifecycle events automatically.',
      },
      {
        title: 'Claiming rewards',
        content: 'Use claimReward() with a completion handler. The callback returns success status and reward details.',
      },
      {
        title: 'Push notifications',
        content: 'Request push permission and register for remote notifications. Evergreen handles the payload parsing and routing.',
      },
    ],
  },
  {
    slug: 'android-sdk',
    title: 'Android SDK',
    description: 'Integrate Evergreen into your native Android game.',
    subsections: [
      {
        title: 'Installation',
        content: 'Add the Evergreen dependency to your build.gradle. Requires Android API 21 or later.',
      },
      {
        title: 'Initialization',
        content: 'Call Evergreen.initialize() in your Application class or main Activity. The SDK tracks app lifecycle events automatically.',
      },
      {
        title: 'Claiming rewards',
        content: 'Use claimReward() with a callback. The callback provides success status and reward metadata.',
      },
      {
        title: 'Push notifications',
        content: 'Configure Firebase Cloud Messaging and register for push tokens. Evergreen handles the payload parsing and routing.',
      },
    ],
  },
  {
    slug: 'campaigns',
    title: 'Campaigns',
    description: 'Create and manage push, email, link, and in-game campaigns.',
    subsections: [
      {
        title: 'Campaign types',
        content: 'Evergreen supports four campaign types: Push (native notifications), Email (branded messages), Link (deep links to social or web), and In-game (pop-ups and banners).',
      },
      {
        title: 'Building a campaign',
        content: 'Select an audience segment, attach a reward (optional), write your message, and choose send time. You can schedule for later or send immediately.',
      },
      {
        title: 'A/B testing',
        content: 'Test different messages, rewards, or send times. Evergreen automatically splits your audience and tracks conversion rates.',
      },
      {
        title: 'Campaign analytics',
        content: 'Track delivery rate, open rate, click-through rate, and reward claim rate. Export data to your analytics platform.',
      },
    ],
  },
  {
    slug: 'segments',
    title: 'Segments',
    description: 'Define and manage player audiences.',
    subsections: [
      {
        title: 'Creating segments',
        content: 'Use the segment builder to combine filters: play style, VIP level, spend, engagement, install date, and custom attributes.',
      },
      {
        title: 'Dynamic segments',
        content: 'Segments auto-update as players progress. A player who meets the criteria is added; when they no longer qualify, they\'re removed.',
      },
      {
        title: 'Segment logic',
        content: 'Combine filters with AND/OR logic. For example: "Played in last 7 days AND spent > $10 OR VIP level 3+".',
      },
      {
        title: 'Segment size',
        content: 'See real-time segment size as you build. Evergreen optimizes queries to handle millions of players efficiently.',
      },
    ],
  },
  {
    slug: 'rewards',
    title: 'Rewards',
    description: 'Configure in-game rewards and fulfillment.',
    subsections: [
      {
        title: 'Reward types',
        content: 'Evergreen supports currencies (gems, coins), items (weapons, skins), loot boxes (randomized rewards), and custom rewards (any game-specific logic).',
      },
      {
        title: 'Fulfillment',
        content: 'Rewards are fulfilled in real-time when players tap a campaign. The SDK calls your game code with the reward details.',
      },
      {
        title: 'Reward economy',
        content: 'Design sustainable reward economies. Avoid inflation by balancing reward value with player progression.',
      },
      {
        title: 'Testing rewards',
        content: 'Use test mode to verify rewards fulfill correctly. Check the dashboard for fulfillment logs and error tracking.',
      },
    ],
  },
  {
    slug: 'automations',
    title: 'Automations',
    description: 'Set up evergreen campaign flows.',
    subsections: [
      {
        title: 'Automation triggers',
        content: 'Trigger campaigns by events: install, first purchase, session gap, level up, or custom events from your game.',
      },
      {
        title: 'Building flows',
        content: 'Use the visual flow builder to chain campaigns. For example: "Day 1: Welcome push → Day 3: First purchase offer → Day 7: Win-back email."',
      },
      {
        title: 'Conditional logic',
        content: 'Add conditions to branches. For example: "If player spent > $10, send VIP reward; otherwise, send first-purchase offer."',
      },
      {
        title: 'Monitoring',
        content: 'Track automation performance in real-time. See how many players enter each branch and convert.',
      },
    ],
  },
  {
    slug: 'api-reference',
    title: 'API Reference',
    description: 'REST API for programmatic access.',
    subsections: [
      {
        title: 'Authentication',
        content: 'All API requests require an API key in the Authorization header. Generate keys in the dashboard under Settings > API Keys.',
      },
      {
        title: 'Endpoints',
        content: 'Base URL: https://api.evergreen.io/v1. Endpoints: /campaigns, /segments, /rewards, /players, /analytics. All requests return JSON.',
      },
      {
        title: 'Rate limits',
        content: 'Rate limit: 1000 requests per minute per API key. Exceeding the limit returns 429. Contact us for higher limits.',
      },
      {
        title: 'Webhooks',
        content: 'Configure webhooks to receive real-time notifications: campaign sent, reward claimed, player segment changed. Webhooks are signed for security.',
      },
      {
        title: 'Error handling',
        content: 'API errors return standard HTTP codes: 400 (bad request), 401 (unauthorized), 404 (not found), 429 (rate limited), 500 (server error). Error responses include a message and error code.',
      },
    ],
  },
];

export function getDocSection(slug: string): DocSection | undefined {
  return DOCS_SECTIONS.find(s => s.slug === slug);
}

export function getAdjacentSections(slug: string): { prev?: DocSection; next?: DocSection } {
  const index = DOCS_SECTIONS.findIndex(s => s.slug === slug);
  return {
    prev: index > 0 ? DOCS_SECTIONS[index - 1] : undefined,
    next: index < DOCS_SECTIONS.length - 1 ? DOCS_SECTIONS[index + 1] : undefined,
  };
}

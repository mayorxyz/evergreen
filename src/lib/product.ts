export const PRODUCT_FEATURES = {
  rewards: {
    title: 'Rewards',
    bullets: [
      'Attach in-game prizes to any campaign with one click',
      'Support for currencies, items, loot boxes, and custom rewards',
      'Real-time fulfillment with zero game lag',
    ],
  },
  campaigns: {
    title: 'Campaigns',
    bullets: [
      'Build push, email, and deep-link campaigns in minutes',
      'Schedule or trigger by player behavior',
      'A/B test messages and rewards',
    ],
  },
  segments: {
    title: 'Segments',
    bullets: [
      'Define audiences by play style, spend, engagement, and more',
      'Combine filters like logic blocks',
      'Auto-update as players progress',
    ],
  },
  automation: {
    title: 'Automation',
    bullets: [
      'Set up evergreen flows that run 24/7',
      'Trigger by installs, purchases, session gaps, or custom events',
      'No code required after initial setup',
    ],
  },
};

export const CHANNELS = [
  { name: 'Push', desc: 'Native push notifications with rich media' },
  { name: 'Email', desc: 'Branded emails with dynamic content' },
  { name: 'Link', desc: 'Deep links to social, web, or in-game' },
  { name: 'In-game', desc: 'Pop-ups and banners inside your game' },
];

export const CAMPAIGN_STEPS = [
  { step: 1, title: 'Choose audience', desc: 'Select or build a segment' },
  { step: 2, title: 'Attach reward', desc: 'Pick a prize or create a new one' },
  { step: 3, title: 'Write message', desc: 'Craft your push, email, or link' },
  { step: 4, title: 'Send or schedule', desc: 'Launch now or set a future time' },
];

export const SDK_TABS = [
  {
    name: 'Unity',
    code: `// Initialize Evergreen SDK
Evergreen.Initialize("YOUR_APP_ID");

// Send a reward
Evergreen.Reward("gem_bundle_100", (result) => {
  if (result.Success) {
    GameManager.AddGems(100);
  }
});`,
  },
  {
    name: 'Unreal',
    code: `// Initialize Evergreen SDK
UEvergreenSubsystem* Evergreen = GEngine->GetEngineSubsystem<UEvergreenSubsystem>();
Evergreen->Initialize(TEXT("YOUR_APP_ID"));

// Send a reward
Evergreen->ClaimReward(TEXT("gem_bundle_100"), [](bool bSuccess) {
  if (bSuccess) {
    UGameInstance::AddGems(100);
  }
});`,
  },
  {
    name: 'iOS',
    code: `// Initialize Evergreen SDK
Evergreen.sharedInstance().initialize(appId: "YOUR_APP_ID")

// Send a reward
Evergreen.sharedInstance().claimReward("gem_bundle_100") { success in
  if success {
    GameManager.shared.addGems(100)
  }
}`,
  },
  {
    name: 'Android',
    code: `// Initialize Evergreen SDK
Evergreen.initialize(context, "YOUR_APP_ID");

// Send a reward
Evergreen.claimReward("gem_bundle_100", new RewardCallback() {
  @Override
  public void onSuccess() {
    GameManager.addGems(100);
  }
});`,
  },
];

export const METRICS = [
  { value: '30%+', label: 'Higher CTR' },
  { value: '20%+', label: 'Increase in DAU' },
  { value: '30%+', label: 'Lift in retention' },
];

export const INTEGRATIONS = [
  'Slack', 'Segment', 'Firebase', 'AppsFlyer', 'Adjust', 'BigQuery',
  'Snowflake', 'Braze', 'Amplitude', 'Mixpanel', 'Kochava', 'Singular',
];

export const PRODUCT_FAQ = [
  {
    q: 'How long does integration take?',
    a: 'Most studios integrate in under a week. Our engineers work directly with your team to ensure a smooth setup.',
  },
  {
    q: 'Do I need to modify my game code?',
    a: 'Minimal changes. The SDK handles reward fulfillment, and campaigns are managed from the dashboard.',
  },
  {
    q: 'Can I A/B test campaigns?',
    a: 'Yes. Test different messages, rewards, and send times to optimize engagement.',
  },
  {
    q: 'What platforms do you support?',
    a: 'iOS, Android, Unity, and Unreal. We also support web games and custom engines.',
  },
  {
    q: 'How do rewards work?',
    a: 'Rewards are fulfilled in real-time when players tap a campaign. No game restart required.',
  },
  {
    q: 'Can I migrate from another CRM?',
    a: 'Yes. We help you migrate segments, campaigns, and historical data with zero downtime.',
  },
];

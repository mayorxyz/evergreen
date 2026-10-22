import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { SEO } from '../components/SEO';
import { PRODUCT_FEATURES, CHANNELS, CAMPAIGN_STEPS, SDK_TABS, METRICS, INTEGRATIONS, PRODUCT_FAQ } from '../lib/product';
import { PlayArt } from '../components/PlayArt';

export function ProductPage() {
  const [activeTab, setActiveTab] = useState('rewards');
  const [activeSdk, setActiveSdk] = useState(0);
  const [copiedSdk, setCopiedSdk] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageShell
      title="One engine for every player moment"
      description="Rewards, campaigns, segments, and automation—built for free-to-play games."
      tab="Product"
      highlight="player"
    >
      <SEO title="Product" description="Rewards, campaigns, segments, and automation—built for free-to-play games." />

      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pb-[80px] sm:pb-[100px] overflow-x-hidden">
        {/* Feature tabs */}
        <section className="mb-[60px] sm:mb-[100px]">
          <div className="flex overflow-x-auto sm:flex-wrap gap-2 mb-6 pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {Object.entries(PRODUCT_FEATURES).map(([key, feat]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === key ? 'bg-ink text-page' : 'bg-grey-light text-ink hover:bg-ink/10'
                }`}
              >
                {feat.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="card p-5 sm:p-8"
            >
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-[20px] sm:text-[24px] font-medium text-ink mb-4 break-words">
                    {PRODUCT_FEATURES[activeTab as keyof typeof PRODUCT_FEATURES].title}
                  </h3>
                  <ul className="space-y-3">
                    {PRODUCT_FEATURES[activeTab as keyof typeof PRODUCT_FEATURES].bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple mt-2 flex-shrink-0" />
                        <span className="break-words">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-page rounded-xl p-3 sm:p-4 w-full overflow-hidden flex items-center justify-center">
                  <div className="w-full aspect-[16/9] sm:aspect-auto sm:min-h-[240px]">
                    <PlayArt seed={activeTab} kind="blocks" palette="default" width={400} height={240} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Channels */}
        <section className="mb-[60px] sm:mb-[100px]">
          <h2 className="font-[family-name:var(--font-display)] text-[22px] sm:text-[28px] font-medium tracking-[-0.02em] text-ink mb-6">
            Channels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHANNELS.map((channel) => (
              <div key={channel.name} className="card p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-[16px] font-medium text-ink mb-2 break-words">{channel.name}</h3>
                  <p className="text-[13px] text-secondary leading-relaxed break-words">{channel.desc}</p>
                </div>
                <div className="mt-4 w-full overflow-hidden rounded-lg">
                  <PlayArt seed={channel.name} kind="blocks" palette="warm" width={400} height={80} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campaign workflow */}
        <section className="mb-[60px] sm:mb-[100px]">
          <span className="tab-label mb-3 inline-block text-[11px]">HOW A CAMPAIGN WORKS</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 sm:mt-6">
            {CAMPAIGN_STEPS.map((step) => (
              <div key={step.step} className="card p-5 relative flex flex-col justify-between">
                <div>
                  <div className="font-[family-name:var(--font-mono)] text-[11px] text-muted mb-2">
                    STEP {step.step}
                  </div>
                  <h3 className="text-[16px] font-medium text-ink mb-1 break-words">{step.title}</h3>
                  <p className="text-[13px] text-secondary break-words">{step.desc}</p>
                </div>
                <div className="mt-4 w-full overflow-hidden rounded-lg">
                  <PlayArt seed={`step-${step.step}`} kind="blocks" palette="cool" width={400} height={60} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SDK */}
        <section className="mb-[60px] sm:mb-[100px]">
          <h2 className="font-[family-name:var(--font-display)] text-[22px] sm:text-[28px] font-medium tracking-[-0.02em] text-ink mb-2">
            SDK Integration
          </h2>
          <p className="text-[13px] sm:text-[14px] text-secondary mb-6">Integrates in under a week.</p>

          <div className="flex overflow-x-auto sm:flex-wrap gap-2 mb-4 pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {SDK_TABS.map((sdk, i) => (
              <button
                key={sdk.name}
                onClick={() => { setActiveSdk(i); setCopiedSdk(false); }}
                className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeSdk === i ? 'bg-ink text-page' : 'bg-grey-light text-ink hover:bg-ink/10'
                }`}
              >
                {sdk.name}
              </button>
            ))}
          </div>

          <div className="card p-4 sm:p-6 relative overflow-hidden">
            <div className="flex justify-end mb-2 sm:mb-0">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(SDK_TABS[activeSdk].code);
                  setCopiedSdk(true);
                  setTimeout(() => setCopiedSdk(false), 2000);
                }}
                className="sm:absolute sm:top-4 sm:right-4 btn-learn text-[12px] px-3 py-1.5"
              >
                {copiedSdk ? '✓ Copied' : 'Copy code'}
              </button>
            </div>
            <pre className="font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] text-ink overflow-x-auto leading-relaxed max-w-full">
              {SDK_TABS[activeSdk].code}
            </pre>
          </div>
        </section>

        {/* Metrics */}
        <section className="mb-[60px] sm:mb-[100px]">
          <span className="tab-label mb-3 inline-block text-[11px]">ILLUSTRATIVE FIGURES</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 sm:mt-6">
            {METRICS.map((metric) => (
              <div key={metric.label} className="card p-5 sm:p-6 text-center">
                <div className="font-[family-name:var(--font-mono)] text-[28px] sm:text-[32px] font-medium text-ink">
                  {metric.value}
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] text-muted mt-1 break-words">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Integrations */}
        <section className="mb-[60px] sm:mb-[100px]">
          <h2 className="font-[family-name:var(--font-display)] text-[22px] sm:text-[28px] font-medium tracking-[-0.02em] text-ink mb-6">
            Integrations
          </h2>
          <div className="flex flex-wrap gap-2">
            {INTEGRATIONS.map((tool) => (
              <span key={tool} className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-grey-light rounded-full text-[12px] sm:text-[13px] text-ink">
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-[22px] sm:text-[28px] font-medium tracking-[-0.02em] text-ink mb-6">
            FAQ
          </h2>
          <div className="space-y-2.5">
            {PRODUCT_FAQ.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3"
                >
                  <span className="text-[13px] sm:text-[14px] font-medium text-ink break-words pr-2">{faq.q}</span>
                  <span className="text-ink/40 text-[18px] flex-shrink-0 leading-none">{openFaq === i ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-[13px] sm:text-[14px] text-secondary leading-relaxed break-words">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
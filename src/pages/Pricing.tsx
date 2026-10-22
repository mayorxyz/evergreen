import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { SEO } from '../components/SEO';
import { PRICING_PLANS, PRICING_COMPARE, PRICING_FAQ } from '../lib/pricing';

export function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageShell
      title="Pricing that scales with your players"
      description="Simple, transparent pricing. No hidden fees. Cancel anytime."
      tab="Pricing"
      highlight="players"
    >
      <SEO title="Pricing" description="Simple, transparent pricing for studios of every size." />

      <div className="max-w-[1120px] mx-auto px-6 pb-[100px]">
        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-[14px] ${!yearly ? 'text-ink font-medium' : 'text-muted'}`}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`w-12 h-6 rounded-full transition-colors ${yearly ? 'bg-yellow' : 'bg-grey-light'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-surface shadow transition-transform ${yearly ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
          <span className={`text-[14px] ${yearly ? 'text-ink font-medium' : 'text-muted'}`}>
            Yearly <span className="text-purple text-[12px]">Save 15%</span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-[100px]">
          {PRICING_PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              className={`card p-6 relative ${plan.highlighted ? 'border-2 border-yellow' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-6 bg-yellow text-on-yellow text-[11px] font-medium px-3 py-1 rounded-full">
                  Most popular
                </div>
              )}
              <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium text-ink mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                {plan.custom ? (
                  <span className="font-[family-name:var(--font-mono)] text-[32px] font-medium text-ink">Custom</span>
                ) : (
                  <>
                    <span className="font-[family-name:var(--font-mono)] text-[32px] font-medium text-ink">
                      ${yearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-[14px] text-muted">/mo</span>
                  </>
                )}
              </div>
              <p className="text-[13px] text-secondary mb-4">{plan.mau}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple mt-1.5 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link to="/demo" className={plan.highlighted ? 'btn-primary w-full justify-center' : 'btn-outline w-full justify-center'}>
                {plan.custom ? 'Contact sales' : 'Get started'} <span className="arrow">▸</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Compare */}
        <section className="mb-[100px]">
          <span className="tab-label mb-4 inline-block">COMPARE PLANS</span>
          <div className="card overflow-hidden mt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-border bg-page/50">
                    <th className="text-left p-4 font-medium text-ink">Feature</th>
                    <th className="text-left p-4 font-medium text-ink">Starter</th>
                    <th className="text-left p-4 font-medium text-ink">Growth</th>
                    <th className="text-left p-4 font-medium text-ink">Studio</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_COMPARE.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="p-4 text-ink font-medium">{row.feature}</td>
                      <td className="p-4 text-secondary">{row.starter}</td>
                      <td className="p-4 text-secondary">{row.growth}</td>
                      <td className="p-4 text-secondary">{row.studio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-[60px]">
          <h2 className="font-[family-name:var(--font-display)] text-[28px] font-medium tracking-[-0.02em] text-ink mb-6">
            FAQ
          </h2>
          <div className="space-y-2">
            {PRICING_FAQ.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between"
                >
                  <span className="text-[14px] font-medium text-ink">{faq.q}</span>
                  <span className="text-ink/40 text-[18px]">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-[14px] text-secondary leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted text-center">
          SAMPLE PRICING FOR DEMONSTRATION
        </p>
      </div>
    </PageShell>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { SEO } from '../components/SEO';
import { Select } from '../components/Select';
import { CONTACT_TOPICS } from '../lib/legal';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '', consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email required';
    if (!form.topic) errs.topic = 'Required';
    if (!form.message.trim()) errs.message = 'Required';
    if (!form.consent) errs.consent = 'Please accept to continue';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <PageShell
      title="Get in touch"
      description="Questions, feedback, or partnership inquiries? We'd love to hear from you."
      tab="Contact"
      highlight="touch"
    >
      <SEO title="Contact" description="Get in touch with our team." />

      <div className="max-w-[1120px] mx-auto px-6 pb-[100px]">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {submitted ? (
              <motion.div
                className="card p-8 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-mint flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-[24px] font-medium text-ink mb-2">
                  Message received
                </h3>
                <p className="text-[14px] text-secondary">
                  We reply within one business day. Check your email for confirmation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                <div>
                  <label className="text-[13px] font-medium text-ink block mb-1">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
                  />
                  {errors.name && <p className="text-[11px] text-red mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-[13px] font-medium text-ink block mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
                  />
                  {errors.email && <p className="text-[11px] text-red mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-[13px] font-medium text-ink block mb-1">Topic</label>
                  <Select
                    value={form.topic}
                    onChange={(topic) => setForm({ ...form, topic })}
                  >
                    <option value="">Select</option>
                    {CONTACT_TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </Select>
                  {errors.topic && <p className="text-[11px] text-red mt-1">{errors.topic}</p>}
                </div>
                <div>
                  <label className="text-[13px] font-medium text-ink block mb-1">
                    Message <span className="text-muted font-normal">({form.message.length}/500)</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value.slice(0, 500) })}
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-ink/20 resize-none"
                  />
                  {errors.message && <p className="text-[11px] text-red mt-1">{errors.message}</p>}
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5"
                  />
                  <span className="text-[12px] text-secondary">
                    I agree to be contacted about my inquiry. See our privacy policy.
                  </span>
                </label>
                {errors.consent && <p className="text-[11px] text-red">{errors.consent}</p>}
                <button type="submit" className="btn-primary w-full justify-center">
                  Send message <span className="arrow">▸</span>
                </button>
              </form>
            )}
          </div>

          {/* Right */}
          <div className="space-y-6">
            {/* Email cards */}
            <div className="space-y-3">
              {[
                { label: 'Sales', email: 'sales@teak.io', desc: 'Pricing, demos, and partnerships' },
                { label: 'Support', email: 'support@teak.io', desc: 'Technical help and troubleshooting' },
                { label: 'Press', email: 'press@teak.io', desc: 'Media inquiries and interviews' },
              ].map((item) => (
                <div key={item.label} className="card p-5">
                  <div className="font-[family-name:var(--font-mono)] text-[11px] text-muted uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  <a href={`mailto:${item.email}`} className="text-[14px] text-ink font-medium hover:text-purple transition-colors">
                    {item.email}
                  </a>
                  <p className="text-[12px] text-secondary mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Response time */}
            <div className="card p-5 bg-mint/30 border-mint">
              <p className="text-[13px] text-ink">
                <strong>Response time:</strong> We typically reply within one business day. Urgent support requests are prioritized.
              </p>
            </div>

            {/* FAQ preview */}
            <div>
              <h3 className="text-[16px] font-medium text-ink mb-3">Frequently asked</h3>
              <div className="space-y-2">
                {[
                  { q: 'How do I get started?', a: 'Book a demo and we\'ll walk you through the platform.' },
                  { q: 'Do you offer a free trial?', a: 'Yes, 14-day trials are available on Starter and Growth plans.' },
                  { q: 'What platforms do you support?', a: 'iOS, Android, Unity, and Unreal Engine.' },
                ].map((faq, i) => (
                  <div key={i} className="card p-4">
                    <p className="text-[13px] font-medium text-ink">{faq.q}</p>
                    <p className="text-[12px] text-secondary mt-1">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/babalola-mayor-a819742a0" className="btn-outline w-full justify-center" target="_blank" rel="noopener noreferrer">
              LinkedIn <span className="arrow">▸</span>
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

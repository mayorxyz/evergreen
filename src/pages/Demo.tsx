import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { SEO } from '../components/SEO';
import { Select } from '../components/Select';
import { DEMO_EXPECTATIONS, DEMO_TIME_SLOTS, DEMO_PLATFORMS, DEMO_MAU_RANGES } from '../lib/legal';

export function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', studio: '', game: '', platform: '', mau: '', challenge: '', consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedSlot, setSelectedSlot] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email required';
    if (!form.studio.trim()) errs.studio = 'Required';
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
      title="See Teak on your game"
      description="Book a 30-minute demo. We'll show you how Teak works for games like yours."
      tab="Book a demo"
      highlight="Teak"
    >
      <SEO title="Book a Demo" description="See Teak in action. Schedule a personalized walkthrough." />

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
                  Request received
                </h3>
                <p className="text-[14px] text-secondary">
                  We reply within one business day. Check your email for confirmation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                <div>
                  <label className="text-[13px] font-medium text-ink block mb-1">Full name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
                  />
                  {errors.name && <p className="text-[11px] text-red mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-[13px] font-medium text-ink block mb-1">Work email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
                  />
                  {errors.email && <p className="text-[11px] text-red mt-1">{errors.email}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[13px] font-medium text-ink block mb-1">Studio name</label>
                    <input
                      type="text"
                      value={form.studio}
                      onChange={(e) => setForm({ ...form, studio: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
                    />
                    {errors.studio && <p className="text-[11px] text-red mt-1">{errors.studio}</p>}
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-ink block mb-1">Game title</label>
                    <input
                      type="text"
                      value={form.game}
                      onChange={(e) => setForm({ ...form, game: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-ink/20"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[13px] font-medium text-ink block mb-1">Platform</label>
                    <Select
                      value={form.platform}
                      onChange={(platform) => setForm({ ...form, platform })}
                    >
                      <option value="">Select</option>
                      {DEMO_PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </Select>
                  </div>
                  <div>
                    <label className="text-[13px] font-medium text-ink block mb-1">Monthly active players</label>
                    <Select
                      value={form.mau}
                      onChange={(mau) => setForm({ ...form, mau })}
                    >
                      <option value="">Select</option>
                      {DEMO_MAU_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-medium text-ink block mb-1">Biggest retention challenge</label>
                  <textarea
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-ink/20 resize-none"
                  />
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5"
                  />
                  <span className="text-[12px] text-secondary">
                    I agree to be contacted about Teak. See our privacy policy.
                  </span>
                </label>
                {errors.consent && <p className="text-[11px] text-red">{errors.consent}</p>}
                <button type="submit" className="btn-primary w-full justify-center">
                  Book a demo <span className="arrow">▸</span>
                </button>
              </form>
            )}
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium text-ink mb-4">
                WHAT TO EXPECT
              </h3>
              <div className="space-y-3">
                {DEMO_EXPECTATIONS.map((item) => (
                  <div key={item.num} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-ink text-page flex items-center justify-center text-[12px] font-[family-name:var(--font-mono)] flex-shrink-0">
                      {item.num}
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-ink">{item.title}</p>
                      <p className="text-[13px] text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar mock */}
            <div className="card p-5">
              <h4 className="text-[14px] font-medium text-ink mb-3">Select a time</h4>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-2 rounded-lg text-[12px] font-[family-name:var(--font-mono)] transition-colors ${
                      selectedSlot === slot ? 'bg-yellow text-on-yellow' : 'bg-page text-ink hover:bg-grey-light'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="card p-5">
              <span className="font-[family-name:var(--font-mono)] text-[9px] text-muted uppercase tracking-wider">
                SAMPLE TESTIMONIAL
              </span>
              <blockquote className="font-[family-name:var(--font-display)] text-[16px] text-ink mt-2 leading-relaxed">
                "The demo was incredibly thorough. We had Teak integrated and running campaigns within a week."
              </blockquote>
              <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted mt-3">
                Sample Person, VP Retention, PlayNorth
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

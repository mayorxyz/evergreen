import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { INTEGRATE_STEPS } from '../lib/content';

function ScrambleText({ text, keyword, inView }: { text: string; keyword: string; inView: boolean }) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  useEffect(() => {
    if (!inView) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) => {
          if (i < iteration) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
    return () => clearInterval(interval);
  }, [inView, text]);

  const parts = display.split(new RegExp(`(${keyword})`, 'i'));
  return (
    <span className="font-[family-name:var(--font-pixel)] text-[14px] md:text-[16px] text-ink">
      {parts.map((part, i) =>
        part.toLowerCase() === keyword ? (
          <span key={i} className="relative">
            <span className="relative z-10">{part}</span>
            <span className="absolute inset-0 bg-yellow -rotate-1 -left-1 -right-1 top-0 bottom-0 rounded-sm" />
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

export function IntegrateSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="max-w-[1120px] mx-auto px-6 pb-[140px]" ref={ref}>
      <span className="tab-label mb-6 inline-block">Integrate in under a week</span>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-6">
        {/* Left */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-[36px] md:text-[44px] font-medium tracking-[-0.03em] leading-[1.1] text-ink">
            From setup to launch in 7, 6, 5…
          </h2>
          <p className="text-[14px] text-secondary mt-4 leading-relaxed max-w-[400px]">
            Evergreen integrates in under a week, so your retention strategy isn't stuck in dev for months.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/demo" className="btn-primary">
              Book a demo <span className="arrow">▸</span>
            </Link>
            <Link to="/docs" className="btn-learn">
              Learn more <span className="arrow">▸</span>
            </Link>
          </div>
        </motion.div>

        {/* Right - Steps */}
        <div className="flex-1 space-y-0">
          {INTEGRATE_STEPS.map((step, i) => (
            <motion.div
              key={step.tag}
              className="border border-border rounded-xl p-5 bg-surface"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-md bg-ink flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="var(--color-page)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <ScrambleText text={step.tag} keyword={step.keyword} inView={inView} />
                  <p className="text-[12px] text-secondary mt-2 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

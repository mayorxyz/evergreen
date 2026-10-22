import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TESTIMONIALS } from '../lib/content';

function SampleLogo({ name }: { name: string }) {
  return (
    <div className="font-[family-name:var(--font-display)] text-[16px] text-ink/30 font-medium tracking-[-0.01em]">
      {name}
    </div>
  );
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="max-w-[1120px] mx-auto px-6 pb-[140px]" ref={ref}>
      <motion.h2
        className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] font-medium tracking-[-0.03em] text-ink text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        A few words from our biggest fans
      </motion.h2>

      <div className="mt-16 space-y-16">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            {/* Logo on opposite side */}
            <div className="flex-shrink-0 w-[120px]">
              <SampleLogo name={t.company} />
              <span className="font-[family-name:var(--font-mono)] text-[9px] text-muted uppercase tracking-wider mt-2 block">
                SAMPLE TESTIMONIAL
              </span>
            </div>

            {/* Quote */}
            <div className="flex-1">
              <blockquote className="font-[family-name:var(--font-display)] text-[20px] md:text-[24px] font-medium tracking-[-0.02em] text-ink leading-[1.3]">
                "{t.quote}"
              </blockquote>
              <div className="mt-4">
                <p className="font-[family-name:var(--font-mono)] text-[11px] text-ink">
                  {t.name}
                </p>
                <p className="font-[family-name:var(--font-mono)] text-[11px] text-muted">
                  {t.title}, {t.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PhoneMock } from './PhoneMock';
import { FEATURE_ROWS } from '../lib/content';

function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-10 right-[20%] w-2 h-2 rounded-full bg-yellow"
        animate={{ y: [0, 20, 0], x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-20 left-[15%] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-pink"
        animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-[30%] w-1.5 h-1.5 rounded-full bg-yellow/60"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export function GoodTimes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="max-w-[1120px] mx-auto px-6 pb-[140px] relative" ref={ref}>
      <Confetti />

      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[40px] font-medium tracking-[-0.03em] text-ink">
          Good times can last forever
        </h2>
        <p className="text-[14px] text-secondary mt-3 max-w-[480px] mx-auto">
          We make it easier to surprise, delight, and win over your players again and again.
        </p>
      </motion.div>

      <div className="space-y-[80px] md:space-y-[120px]">
        {FEATURE_ROWS.map((row, i) => (
          <motion.div
            key={row.title}
            className={`flex flex-col ${row.align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            {/* Text */}
            <div className="flex-1 max-w-[400px]">
              <h3 className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] font-medium tracking-[-0.03em] text-ink leading-[1.1]">
                {row.title}
              </h3>
              <p className="text-[13px] text-secondary mt-4 leading-relaxed">
                {row.text}
              </p>
            </div>

            {/* Phone */}
            <div className="flex-shrink-0">
              <PhoneMock type={row.phoneType} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export function CrmIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="max-w-[1120px] mx-auto px-6 pb-[140px]" ref={ref}>
      <motion.div
        className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1">
          <h2 className="font-[family-name:var(--font-display)] text-[36px] md:text-[44px] font-medium tracking-[-0.03em] leading-[1.1] text-ink">
            CRM that's all about free-to-play
          </h2>
        </div>
        <div className="flex-1 max-w-[480px]">
          <p className="text-[14px] text-secondary leading-relaxed">
            Let's face it, most retention engines aren't built for mobile games. Evergreen handles real-time triggers, personalized rewards, and daily sends, without breaking your game loop (or your team).
          </p>
          <div className="mt-6">
            <Link to="/product" className="btn-learn">
              Learn more <span className="arrow">▸</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

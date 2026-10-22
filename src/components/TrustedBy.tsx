import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

// Placeholder wordmarks - text/SVG based, no external images
const logos = [
  { text: 'Garden Lore', style: 'serif' },
  { text: '⛊', style: 'icon', isIcon: true },
  { text: 'rockwave', style: 'lowercase' },
  { text: 'PlayNorth', style: 'bold' },
  { text: '✦', style: 'icon', isIcon: true },
  { text: 'ARC', style: 'spaced' },
];

export function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="max-w-[1120px] mx-auto px-6 pb-[140px]" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="tab-label">Trusted by top studios</span>

        {/* Logo row */}
        <div className="mt-8 border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-border">
            {logos.map((logo, i) => (
              <div key={i} className="h-[72px] flex items-center justify-center px-4">
                {logo.isIcon ? (
                  <span className="text-[28px] text-ink/30">{logo.text}</span>
                ) : (
                  <span className={`text-[14px] text-ink/40 font-medium ${
                    logo.style === 'serif' ? 'font-serif italic' :
                    logo.style === 'spaced' ? 'tracking-[0.2em] text-[13px]' :
                    logo.style === 'bold' ? 'font-bold text-[15px]' :
                    'font-light text-[15px]'
                  }`}>
                    {logo.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Masterclass callout */}
        <div className="mt-8 bg-mint border border-border rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          {/* Decorative dots */}
          <div className="absolute top-3 right-4 w-2 h-2 rounded-full bg-red opacity-60" />
          <div className="absolute bottom-4 right-8 w-1.5 h-1.5 rounded-full bg-purple opacity-60" />
          <div className="absolute top-6 right-12 w-1 h-1 rounded-full bg-red opacity-40" />

          <div className="max-w-[480px]">
            <h3 className="font-[family-name:var(--font-display)] text-[22px] md:text-[24px] font-medium tracking-[-0.02em] text-ink">
              A masterclass in retention
            </h3>
            <p className="text-[14px] text-secondary mt-2 leading-relaxed">
              Discover how to build a smarter strategy for every stage of the player lifecycle.
            </p>
          </div>
          <Link to="/blog" className="btn-learn flex-shrink-0">
            Learn more <span className="arrow">▸</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CampaignCard } from './CampaignCard';
import { STATS } from '../lib/content';

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Hero() {
  return (
    <section className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-6 sm:pt-[80px] pb-12 sm:pb-[140px] md:pb-[160px] overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-8 sm:gap-12 lg:gap-16 items-start">
        {/* Left content */}
        <div className="flex-1 w-full max-w-[560px]">
          <motion.h1
            className="font-[family-name:var(--font-display)] text-[32px] sm:text-[44px] md:text-[56px] lg:text-[60px] font-medium tracking-[-0.03em] leading-[1.1] text-ink break-words"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The retention engine behind{' '}
            <span className="marker-highlight font-semibold inline-block">irresistible</span>{' '}
            games
          </motion.h1>

          <motion.p
            className="text-[13px] sm:text-[14px] text-secondary mt-4 sm:mt-6 leading-relaxed max-w-[480px] break-words"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Top-grossing studios use Evergreen to turn real-time player behavior into personalized, reward-driven messages that boost daily return and lifetime value.
          </motion.p>

          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/demo" className="btn-primary text-[13px] sm:text-[14px] inline-flex w-full sm:w-auto justify-center">
              Book a demo <span className="arrow">▸</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-6 sm:gap-8 mt-8 sm:mt-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="min-w-0 sm:min-w-[100px]">
                <div className="font-[family-name:var(--font-mono)] text-[20px] sm:text-[24px] font-medium text-ink">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] sm:text-[11px] text-muted mt-0.5 sm:mt-1 break-words">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right - Campaign Card (visible and scalable on mobile) */}
        <div className="w-full md:w-[min(38vw,360px)] flex-shrink-0 mt-4 lg:mt-8">
          <div className="w-full max-w-[420px] mx-auto md:max-w-none">
            <CampaignCard />
          </div>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnnouncementBar } from './AnnouncementBar';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { SITE_NAME } from '../lib/site';

type PageShellProps = {
  title: string;
  description: string;
  tab?: string;
  highlight?: string;
  children: React.ReactNode;
  showCta?: boolean;
};

export function PageShell({ title, description, tab, highlight, children, showCta = true }: PageShellProps) {
  const location = useLocation();
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => h1Ref.current?.focus(), 250);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen grid-bg overflow-x-hidden">
      <AnnouncementBar />
      <Nav />
      <main className="w-full">
        {/* Header */}
        <section className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-8 sm:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {tab && <span className="tab-label mb-3 sm:mb-4 inline-block text-[11px]">{tab}</span>}
            <h1
              ref={h1Ref}
              tabIndex={-1}
              className="font-[family-name:var(--font-display)] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] font-medium tracking-[-0.03em] leading-[1.12] text-ink outline-none focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4 rounded break-words"
            >
              {highlight ? (
                <>
                  {title.split(highlight)[0]}
                  <span className="marker-highlight inline-block">{highlight}</span>
                  {title.split(highlight)[1]}
                </>
              ) : title}
            </h1>
            <p className="text-[13px] sm:text-[14px] text-secondary mt-3 sm:mt-4 leading-relaxed max-w-[560px] break-words">
              {description}
            </p>
          </motion.div>
        </section>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full"
        >
          {children}
        </motion.div>

        {/* CTA */}
        {showCta && (
          <section className="max-w-[1120px] mx-auto px-4 sm:px-6 py-12 sm:py-[100px]">
            <div className="card p-6 sm:p-8 md:p-12 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-[24px] sm:text-[28px] md:text-[36px] font-medium tracking-[-0.03em] text-ink break-words">
                Ready to level up?
              </h2>
              <p className="text-[13px] sm:text-[14px] text-secondary mt-3 max-w-[400px] mx-auto break-words">
                See how {SITE_NAME} can boost retention for your game.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mt-6">
                <Link to="/demo" className="btn-primary text-[13px] sm:text-[14px] w-full sm:w-auto">
                  Book a demo <span className="arrow">▸</span>
                </Link>
                <Link to="/pricing" className="btn-outline text-[13px] sm:text-[14px] w-full sm:w-auto">
                  See pricing <span className="arrow">▸</span>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_NAME } from '../lib/site';
import { NAV_LINKS } from '../lib/content';
import { ThemeToggle, ThemeSegmented } from './ThemeToggle';

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close menu automatically on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-page/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 rounded-md">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C6 2 3 5 3 9c0 3 2 5 4 6.5C8.5 16.5 10 18 10 18s1.5-1.5 3-2.5c2-1.5 4-3.5 4-6.5 0-4-3-7-7-7z" fill="currentColor"/>
              <path d="M10 6c-1 0-2 1-2 2.5S9 11 10 11s2-1 2-2.5S11 6 10 6z" fill="var(--color-mint)"/>
            </svg>
            <span className="font-[family-name:var(--font-display)] text-[20px] sm:text-[22px] font-semibold text-ink tracking-[-0.02em]">
              {SITE_NAME.toLowerCase()}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-1.5 text-[14px] text-ink hover:text-secondary transition-colors"
              >
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: link.dot }} />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link to="/demo" className="btn-dark text-[13px] px-4 py-2">
              Book a demo <span className="arrow">▸</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`w-5 h-0.5 bg-ink transition-transform duration-200 origin-center ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`w-5 h-0.5 bg-ink transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-ink transition-transform duration-200 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col">
            {/* Backdrop: Clicking ANYWHERE outside or on the overlay closes menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Mobile Sheet Window */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full bg-page border-b border-border shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
              onClick={(e) => {
                // If clicking directly on padding/empty background within sheet, close menu
                if (e.target === e.currentTarget) setMobileOpen(false);
              }}
            >
              {/* Header inside sheet */}
              <div className="flex items-center justify-between px-4 sm:px-6 h-[60px] border-b border-border flex-shrink-0">
                <Link
                  to="/"
                  className="font-[family-name:var(--font-display)] text-[20px] font-semibold text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  {SITE_NAME.toLowerCase()}
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[18px] text-ink hover:text-secondary rounded-lg"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col gap-2 p-5 sm:p-6" onClick={() => setMobileOpen(false)}>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center gap-3 py-2 text-[16px] font-medium text-ink hover:text-secondary transition-colors"
                  >
                    <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: link.dot }} />
                    {link.label}
                  </Link>
                ))}

                <div className="pt-2">
                  <Link to="/demo" className="btn-dark text-[14px] w-full text-center py-3 justify-center">
                    Book a demo <span className="arrow">▸</span>
                  </Link>
                </div>

                {/* Mobile theme control */}
                <div className="mt-4 pt-5 border-t border-border flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[13px] font-medium text-secondary">Theme</span>
                  <ThemeSegmented />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
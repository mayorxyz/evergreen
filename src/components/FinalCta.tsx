import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DashboardMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [dau, setDau] = useState(0);
  const [active, setActive] = useState(0);
  const [rev, setRev] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const targets = { dau: 325780, active: 5805, rev: 2449041 };
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDau(Math.floor(p * targets.dau));
      setActive(Math.floor(p * targets.active));
      setRev(Math.floor(p * targets.rev));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView]);

  return (
    <div ref={ref} className="card overflow-hidden w-full max-w-full">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-page/50">
        <div className="w-2.5 h-2.5 rounded-full bg-red/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-mint" />
        <span className="text-[10px] text-muted ml-2 font-[family-name:var(--font-mono)] truncate">dashboard.evergreen.io</span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[90px] sm:w-[100px] border-r border-border p-2.5 sm:p-3 hidden sm:block flex-shrink-0">
          <div className="font-[family-name:var(--font-display)] text-[12px] font-semibold text-ink mb-4 truncate">evergreen</div>
          <div className="text-[10px] text-muted mb-3 px-2 py-1 rounded bg-grey-light truncate">Your app ▾</div>
          <nav className="space-y-1">
            <div className="text-[10px] text-ink px-2 py-1.5 rounded bg-yellow/20 font-medium flex items-center gap-1.5 truncate">
              <div className="w-1 h-3 rounded-full bg-yellow flex-shrink-0" />
              <span className="truncate">Dashboard</span>
            </div>
            <div className="text-[10px] text-muted px-2 py-1.5 truncate">Campaigns</div>
            <div className="text-[10px] text-muted px-2 py-1.5 truncate">Audience</div>
            <div className="text-[10px] text-muted px-2 py-1.5 truncate">Rewards</div>
          </nav>
        </div>

        {/* Main */}
        <div className="flex-1 p-3 sm:p-4 min-w-0">
          <div className="text-[12px] font-medium text-ink mb-2">Dashboard</div>
          {/* Tabs */}
          <div className="flex gap-1.5 sm:gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
            {['Overview', 'Platform', 'Revenue', 'Retention'].map((tab, i) => (
              <span key={tab} className={`text-[9px] px-2 py-1 rounded whitespace-nowrap ${i === 0 ? 'bg-ink text-page' : 'text-muted bg-grey-light sm:bg-transparent'}`}>
                {tab}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4">
            <div className="bg-page rounded-lg p-2 min-w-0">
              <div className="text-[11px] sm:text-[14px] font-[family-name:var(--font-mono)] font-medium text-ink truncate">{dau.toLocaleString()}</div>
              <div className="text-[7px] sm:text-[8px] text-muted mt-0.5 truncate">avg daily active</div>
            </div>
            <div className="bg-page rounded-lg p-2 min-w-0">
              <div className="text-[11px] sm:text-[14px] font-[family-name:var(--font-mono)] font-medium text-ink truncate">{active.toLocaleString()}</div>
              <div className="text-[7px] sm:text-[8px] text-muted mt-0.5 truncate">5-min active</div>
            </div>
            <div className="bg-page rounded-lg p-2 min-w-0">
              <div className="text-[11px] sm:text-[14px] font-[family-name:var(--font-mono)] font-medium text-ink truncate">${(rev / 1000000).toFixed(1)}M</div>
              <div className="text-[7px] sm:text-[8px] text-muted mt-0.5 truncate">gross revenue</div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[70px] sm:h-[80px] relative w-full overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 300 80" preserveAspectRatio="none" className="overflow-visible">
              {/* Grid lines */}
              {[0, 20, 40, 60].map(y => (
                <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="var(--color-ink)" strokeWidth="0.3" strokeDasharray="4 4" opacity="0.2" />
              ))}
              {/* Line */}
              <motion.path
                d="M0 60 Q30 55 60 50 T120 35 T180 40 T240 25 T300 20"
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              {/* Dots */}
              <motion.circle cx="120" cy="35" r="3" fill="var(--color-pink)"
                initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1 }} />
              <motion.circle cx="240" cy="25" r="3" fill="var(--color-orange)"
                initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.2 }} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-yellow rounded-xl p-5 sm:p-6 w-full max-w-full">
        <p className="font-[family-name:var(--font-display)] text-[18px] sm:text-[20px] font-medium text-on-yellow">You're in.</p>
        <p className="text-[13px] text-on-yellow/70 mt-2">Welcome to the retention club.</p>
      </div>
    );
  }

  return (
    <div className="bg-yellow rounded-xl p-5 sm:p-6 w-full max-w-full">
      <h3 className="font-[family-name:var(--font-display)] text-[18px] sm:text-[20px] font-medium text-on-yellow tracking-[-0.02em] break-words">
        Retention wisdom straight to your inbox
      </h3>
      <p className="text-[13px] text-on-yellow/70 mt-2">Get the latest news, retention tips, and more.</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full flex-1 px-4 py-2.5 rounded-full bg-surface/80 border border-ink/10 text-[13px] text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink/20"
        />
        <button type="submit" className="btn-dark text-[13px] px-5 py-2.5 w-full sm:w-auto">
          Subscribe
        </button>
      </form>
      {error && <p className="text-[11px] text-red mt-2">{error}</p>}
    </div>
  );
}

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="max-w-[1120px] mx-auto px-4 sm:px-6 pb-[100px] sm:pb-[140px] overflow-x-hidden" ref={ref}>
      <span className="tab-label mb-6 inline-block text-[11px]">Get a tour of Evergreen today</span>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-6 items-start">
        {/* Left */}
        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-[32px] sm:text-[40px] md:text-[48px] font-medium tracking-[-0.03em] text-ink leading-[1.05] break-words">
            Ready to level up?
          </h2>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to="/demo" className="btn-primary text-[13px] sm:text-[14px]">
              Book a demo <span className="arrow">▸</span>
            </Link>
            <Link to="/pricing" className="btn-outline text-[13px] sm:text-[14px]">
              See pricing <span className="arrow">▸</span>
            </Link>
          </div>

          {/* Decorative pixel character */}
          <div className="mt-8 sm:mt-12 overflow-x-auto">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="max-w-full">
              {/* Pixel art character glyph */}
              <rect x="40" y="10" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="50" y="10" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="60" y="10" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="70" y="10" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="30" y="20" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="40" y="20" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="50" y="20" width="10" height="10" fill="var(--color-yellow)"/>
              <rect x="60" y="20" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="70" y="20" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="80" y="20" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="30" y="30" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="40" y="30" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="50" y="30" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="60" y="30" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="70" y="30" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="80" y="30" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="40" y="40" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="50" y="40" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="60" y="40" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="70" y="40" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="30" y="50" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="40" y="50" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="50" y="50" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="60" y="50" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="70" y="50" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="80" y="50" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="20" y="60" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="30" y="60" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="80" y="60" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="90" y="60" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="40" y="60" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="50" y="60" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="60" y="60" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="70" y="60" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="40" y="70" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="50" y="70" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="60" y="70" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="70" y="70" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="40" y="80" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="50" y="80" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="60" y="80" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="70" y="80" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="30" y="90" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="40" y="90" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="70" y="90" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="80" y="90" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="30" y="100" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="40" y="100" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="70" y="100" width="10" height="10" fill="var(--color-ink)"/>
              <rect x="80" y="100" width="10" height="10" fill="var(--color-ink)"/>
            </svg>
          </div>
        </motion.div>

        {/* Right - Dashboard + Newsletter */}
        <motion.div
          className="flex-1 w-full space-y-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DashboardMock />
          <NewsletterCard />
        </motion.div>
      </div>
    </section>
  );
}
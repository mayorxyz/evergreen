import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

function BentoCell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative p-6 md:p-8 border-b md:border-b-0 md:border-r border-border last:border-r-0 last:border-b-0 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none"
        />
      )}
    </div>
  );
}

function Chip({ children, color = 'grey' }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    grey: 'bg-grey-light text-ink',
    pink: 'bg-pink/15 text-pink',
    purple: 'bg-purple/15 text-purple',
    yellow: 'bg-yellow text-on-yellow',
    green: 'bg-mint text-ink',
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors[color] || colors.grey}`}>
      {children}
    </span>
  );
}

export function BentoGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="max-w-[1120px] mx-auto px-6 pb-[140px]" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="tab-label mb-6 inline-block">Features</span>

        <div className="border border-border rounded-xl overflow-hidden relative">
          {/* Corner crosshairs */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-ink/20" />
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-ink/20" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-ink/20" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-ink/20" />

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
            <BentoCell>
              <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium text-ink tracking-[-0.02em]">
                Rewards that feel like magic
              </h3>
              <p className="text-[13px] text-secondary mt-2 leading-relaxed">
                Personalized, in-game prizes tied to your messages. One setup powers every channel.
              </p>
              {/* Mock card */}
              <div className="mt-6 card p-4 max-w-[320px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple/10 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="3" y="3" width="12" height="12" rx="2" fill="var(--color-purple)" opacity="0.7"/>
                      <rect x="6" y="6" width="6" height="6" rx="1" fill="var(--color-surface)"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-ink">Gem Bundle</div>
                    <div className="text-[10px] text-muted">Rewards</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Chip color="pink">VIP Players</Chip>
                  <span className="text-[11px] font-[family-name:var(--font-mono)] text-ink">3M</span>
                  <span className="text-[11px] text-muted">Gems</span>
                  <span className="text-[9px] text-muted">▾</span>
                </div>
                <div className="text-[10px] text-muted mb-1">Message</div>
                <div className="bg-page rounded-md p-2 text-[11px] text-ink leading-relaxed">
                  Hey <span className="bg-mint px-1 rounded text-ink font-medium">First Name</span>, play now and claim your Gem Bundle Reward!
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-3 h-3 rounded border border-ink/20 bg-purple/20" />
                  <span className="text-[10px] text-secondary">Push Notification</span>
                </div>
              </div>
            </BentoCell>

            <BentoCell>
              <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium text-ink tracking-[-0.02em]">
                Mix, match, automate
              </h3>
              <p className="text-[13px] text-secondary mt-2 leading-relaxed">
                From big spenders to casual players, customize offers to match. Handle it all in a single configuration.
              </p>
              {/* Mock card */}
              <div className="mt-6 card p-4 max-w-[320px]">
                <div className="text-[12px] font-medium text-ink mb-1">Daily Tiered Bundle</div>
                <div className="text-[10px] text-muted mb-3">Rewards by audience</div>
                <div className="flex items-center gap-2 mb-2">
                  <Chip color="pink">VIP Players</Chip>
                  <span className="text-[11px] font-[family-name:var(--font-mono)] text-ink">300,000</span>
                  <span className="text-[11px] text-muted">Gems</span>
                  <span className="text-[9px] text-muted">▾</span>
                </div>
                <div className="flex items-center gap-2 opacity-40">
                  <Chip color="grey">All Players</Chip>
                  <span className="text-[11px] font-[family-name:var(--font-mono)] text-ink">50,000</span>
                  <span className="text-[11px] text-muted">Gems</span>
                </div>
              </div>
            </BentoCell>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border">
            <BentoCell>
              <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium text-ink tracking-[-0.02em]">
                Instant setup, zero lag
              </h3>
              <p className="text-[13px] text-secondary mt-2 leading-relaxed">
                Create push, email, and link campaigns in minutes—triggered by installs, purchases, or session gaps.
              </p>
              {/* Campaign list mock */}
              <div className="mt-6 relative overflow-hidden h-[100px]">
                <div className="space-y-2">
                  {['Welcome Back Push', 'VIP Reward Email', 'Daily Spin Link', 'Win-Back Campaign'].map((name, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-page rounded-md" style={{ opacity: 1 - i * 0.2 }}>
                      <div className="w-2 h-2 rounded-full bg-purple" />
                      <span className="text-[11px] text-ink">{name}</span>
                      <span className="text-[9px] text-muted ml-auto font-[family-name:var(--font-mono)]">active</span>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-surface to-transparent" />
              </div>
            </BentoCell>

            <BentoCell>
              <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium text-ink tracking-[-0.02em]">
                Segments that actually segment
              </h3>
              <p className="text-[13px] text-secondary mt-2 leading-relaxed">
                Define audiences by play style, VIP level, recent spend, or engagement shifts. Combine them like logic blocks.
              </p>
              {/* Logic block mock */}
              <div className="mt-6 space-y-2 max-w-[300px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <Chip color="grey">Activity</Chip>
                  <span className="text-[11px] text-muted">+</span>
                  <Chip color="yellow">Audience</Chip>
                </div>
                <div className="ml-4 border-l border-border pl-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] text-muted">+</span>
                    <Chip color="yellow">Spend</Chip>
                    <span className="text-[11px] text-muted">+</span>
                    <Chip color="grey">VIP Status</Chip>
                  </div>
                </div>
                <div className="ml-8 border-l border-border pl-3">
                  <Chip color="grey" >Install Date</Chip>
                </div>
              </div>
            </BentoCell>
          </div>

          {/* Row 3 - pattern cell */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-8 border-r border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow/30 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[13px] text-secondary">And much more to explore</span>
              </div>
            </div>
            <div className="p-6 md:p-8 relative overflow-hidden">
              {/* Dotted pattern */}
              <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
                <pattern id="dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="var(--color-ink)"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots)"/>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

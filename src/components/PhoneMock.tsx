import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type PhoneType = 'mystery' | 'social' | 'churn' | 'incentive';

export function PhoneMock({ type }: { type: PhoneType }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
    >
      {/* Phone frame */}
      <div className="w-[220px] h-[420px] bg-surface rounded-[28px] border-[3px] border-ink/10 shadow-lg relative overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-ink/10 rounded-b-xl" />
        
        {/* Status bar */}
        <div className="pt-8 px-4 flex justify-between items-center">
          <span className="text-[10px] font-[family-name:var(--font-mono)] text-muted">12:51</span>
          <div className="flex gap-1">
            <div className="w-3 h-2 rounded-sm bg-ink/20" />
            <div className="w-3 h-2 rounded-sm bg-ink/20" />
          </div>
        </div>

        {/* Lock screen clock */}
        <div className="text-center mt-4">
          <span className="text-[48px] font-light text-ink/10 font-[family-name:var(--font-display)]">12:51</span>
        </div>

        {/* Notification content based on type */}
        <div className="px-3 mt-4">
          {type === 'mystery' && <MysteryNotification />}
          {type === 'social' && <SocialNotification />}
          {type === 'churn' && <ChurnNotification />}
          {type === 'incentive' && <IncentiveNotification />}
        </div>
      </div>
    </motion.div>
  );
}

function MysteryNotification() {
  return (
    <motion.div
      className="bg-ink/90 rounded-xl p-3 text-page"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring' }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-page/60">MYSTERY REWARD</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="var(--color-page)" strokeWidth="1" opacity="0.5"/>
          <path d="M6 3v3l2 1" stroke="var(--color-page)" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      </div>
      <p className="text-[11px] leading-snug">Feeling lucky? Tap to win a prize.</p>
      <div className="mt-3 flex items-center gap-2">
        {/* Pie chart */}
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="var(--color-page)" strokeWidth="1" opacity="0.3"/>
          <path d="M12 2 A10 10 0 0 1 22 12 L12 12 Z" fill="var(--color-purple)"/>
          <path d="M22 12 A10 10 0 0 1 12 22 L12 12 Z" fill="var(--color-yellow)"/>
          <path d="M12 22 A10 10 0 0 1 2 12 L12 12 Z" fill="var(--color-pink)"/>
        </svg>
        <span className="text-[9px] text-page/60">Spin to win</span>
      </div>
    </motion.div>
  );
}

function SocialNotification() {
  return (
    <motion.div
      className="bg-surface rounded-xl border border-border p-3 shadow-sm"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring' }}
    >
      {/* Game screenshot mock */}
      <div className="w-full h-[80px] rounded-lg overflow-hidden mb-2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red via-orange to-green opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-0.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: ['var(--color-red)', 'var(--color-orange)', 'var(--color-green)', 'var(--color-yellow)'][i % 4], opacity: 0.7 + Math.random() * 0.3 }} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-[11px] text-ink font-medium">Play now for +10XP</p>
      <div className="flex items-center gap-1 mt-1">
        <div className="w-3 h-3 rounded-full bg-orange" />
        <span className="text-[9px] text-muted">Nearby reward</span>
      </div>
    </motion.div>
  );
}

function ChurnNotification() {
  return (
    <motion.div
      className="bg-ink/90 rounded-xl p-3 text-page"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring' }}
    >
      <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-page/60">WIN-BACK</span>
      <p className="text-[11px] leading-snug mt-2">You're so close! Level up with this freebie</p>
      <div className="mt-3 flex items-center gap-1">
        {/* Pixel blocks assembling */}
        <motion.div
          className="flex gap-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="w-4 h-4 bg-pink rounded-sm" />
          <div className="w-4 h-4 bg-yellow rounded-sm" />
          <div className="w-4 h-4 bg-pink/60 rounded-sm" />
          <div className="w-4 h-4 bg-yellow/60 rounded-sm" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function IncentiveNotification() {
  return (
    <motion.div
      className="space-y-2"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring' }}
    >
      <div className="bg-ink/90 rounded-xl p-3 text-page">
        <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-page/60">DAILY OFFER</span>
        <p className="text-[11px] leading-snug mt-1">Play now and get double the points</p>
      </div>
      <div className="bg-grey-light rounded-xl p-3">
        <p className="text-[11px] text-ink leading-snug">Tap now and get 25K bonus points</p>
        <div className="flex items-center gap-1 mt-2">
          <div className="w-3 h-3 rounded-full bg-orange" />
          <span className="text-[9px] text-muted">Limited time</span>
        </div>
      </div>
    </motion.div>
  );
}

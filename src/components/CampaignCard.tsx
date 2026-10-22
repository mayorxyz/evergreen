import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function CampaignCard() {
  const [sent, setSent] = useState(false);
  const [clicking, setClicking] = useState(false);

  const triggerSend = useCallback(() => {
    setClicking(true);
    setTimeout(() => {
      setSent(true);
      setClicking(false);
    }, 300);
    setTimeout(() => {
      setSent(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const interval = setInterval(triggerSend, 6000);
    return () => clearInterval(interval);
  }, [triggerSend]);

  return (
    <motion.div
      className="card p-5 w-full relative"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-purple/10 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1l1.5 3.5L12 5.5l-2.5 2.5L10 12 7 10l-3 2 .5-4L2 5.5l3.5-1L7 1z" fill="var(--color-purple)"/>
          </svg>
        </div>
        <span className="text-[13px] font-medium text-ink">Mystery Campaign</span>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted font-[family-name:var(--font-mono)]">Audience:</span>
          <span className="text-[11px] bg-grey-light px-2 py-0.5 rounded text-ink">Daily Players</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted font-[family-name:var(--font-mono)]">Reward:</span>
          <span className="text-[11px] bg-purple/10 text-purple px-2 py-0.5 rounded">Mystery Spin</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-muted font-[family-name:var(--font-mono)]">Platforms:</span>
          <span className="text-[11px] bg-grey-light px-2 py-0.5 rounded text-ink">iOS</span>
          <span className="text-[11px] bg-grey-light px-2 py-0.5 rounded text-ink">Android</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          className={`text-[11px] font-medium px-3 py-1.5 rounded-full transition-colors ${
            sent ? 'bg-mint text-ink' : clicking ? 'bg-yellow text-on-yellow' : 'bg-ink text-page'
          }`}
        >
          {sent ? '✓ Sent' : 'Send Now'}
        </button>
        {sent && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] text-muted font-[family-name:var(--font-mono)]"
          >
            delivered
          </motion.span>
        )}
      </div>

      {/* Animated cursor */}
      <motion.div
        className="absolute bottom-6 right-6"
        animate={clicking ? { scale: [1, 0.8, 1], y: [0, 2, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 1l4 14 2-5 5-2L2 1z" fill="var(--color-ink)" stroke="var(--color-surface)" strokeWidth="0.5"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('evergreen-bar-dismissed');
    if (stored === 'true') setDismissed(true);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem('evergreen-bar-dismissed', 'true');
  };

  if (dismissed) return null;

  return (
    <div className="w-full bg-mint h-[40px] flex items-center justify-center relative z-50">
      <div className="flex items-center gap-3 text-[13px]">
        {/* Generated avatar - CSS-only circle with initials */}
        <div className="w-6 h-6 rounded-full bg-purple flex items-center justify-center text-on-accent text-[10px] font-bold">
          T
        </div>
        <span className="text-ink">Join me for a masterclass in F2P games retention.</span>
        <Link to="/blog/masterclass-in-retention" className="bg-purple text-on-accent text-[11px] font-medium px-3 py-1 rounded-full hover:opacity-90 transition-opacity">
          Learn more ▸
        </Link>
      </div>
      <button
        onClick={dismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink text-[16px] leading-none"
        aria-label="Dismiss announcement"
      >
        ✕
      </button>
    </div>
  );
}

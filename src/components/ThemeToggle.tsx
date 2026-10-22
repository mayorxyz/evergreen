import { useState } from 'react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const nextTheme = resolvedTheme === 'light' ? 'dark' : 'light';
  const label = `Switch to ${nextTheme} theme`;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-9 h-9 rounded-full border border-border bg-surface flex items-center justify-center hover:bg-raised transition-colors"
        aria-label={label}
        title={label}
      >
        {resolvedTheme === 'light' ? (
          // Moon icon
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-ink transition-colors">
            <path d="M14 9.5A6.5 6.5 0 016.5 2 5.5 5.5 0 1014 9.5z" fill="currentColor"/>
          </svg>
        ) : (
          // Sun icon
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-ink transition-colors">
            <circle cx="8" cy="8" r="3" fill="currentColor"/>
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
      </button>
      
      {showTooltip && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-ink text-page text-[11px] rounded whitespace-nowrap pointer-events-none z-50">
          {label}
          <span className="block text-[9px] opacity-60 mt-0.5">Press "t" to toggle</span>
        </div>
      )}
    </div>
  );
}

export function ThemeSegmented({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`inline-flex rounded-lg border border-border bg-surface overflow-hidden ${className}`}>
      {(['light', 'dark', 'system'] as const).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-3 py-1.5 text-[11px] font-[family-name:var(--font-mono)] capitalize transition-colors ${
            theme === t ? 'bg-ink text-page' : 'text-secondary hover:text-ink'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

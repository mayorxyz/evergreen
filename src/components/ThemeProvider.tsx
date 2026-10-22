import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'evergreen-theme';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY) as Theme | null;
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? getSystemTheme() : theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return getStoredTheme() || 'system';
  });

  const resolvedTheme = resolveTheme(theme);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', resolvedTheme);
    root.style.colorScheme = resolvedTheme;
    
    // Update meta theme-color
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    const pageColor = getComputedStyle(root).getPropertyValue('--color-page').trim();
    if (pageColor) meta.setAttribute('content', pageColor);
  }, [resolvedTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      // Force re-render by updating state
      setThemeState('system');
    };
    
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [theme]);

  // Keyboard shortcut "t" to toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't toggle if typing in an input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        toggleTheme();
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

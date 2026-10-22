import { Link } from 'react-router-dom';
import { SITE_NAME } from '../lib/site';
import { FOOTER_LINKS } from '../lib/content';
import { ThemeSegmented } from './ThemeToggle';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1120px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-muted mb-4">
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-[14px] text-ink hover:text-secondary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-16 pt-8 border-t border-border gap-4">
          <p className="font-[family-name:var(--font-mono)] text-[12px] text-muted">
            © 2026 {SITE_NAME}
          </p>
          <div className="flex items-center gap-6">
            <ThemeSegmented />
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-[13px] text-secondary hover:text-ink transition-colors">
              Privacy policy
            </Link>
            <Link to="/terms" className="text-[13px] text-secondary hover:text-ink transition-colors">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

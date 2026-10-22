import { useEffect, useState, useRef } from 'react';
import { PageShell } from '../components/PageShell';
import { SEO } from '../components/SEO';
import { TERMS_SECTIONS } from '../lib/legal';

export function TermsPage() {
  const [activeHeading, setActiveHeading] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const headings = contentRef.current?.querySelectorAll('h2');
      headings?.forEach((h) => {
        const rect = h.getBoundingClientRect();
        if (rect.top < 200 && rect.bottom > 0) {
          setActiveHeading(h.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageShell
      title="Terms of Service"
      description="The terms and conditions for using the Teak service."
      tab="Terms"
    >
      <SEO title="Terms of Service" description="Our terms and conditions." />

      <div className="max-w-[1120px] mx-auto px-6 pb-[100px]">
        <div className="grid lg:grid-cols-[1fr_220px] gap-12">
          <div ref={contentRef} className="max-w-[680px]">
            <div className="font-[family-name:var(--font-mono)] text-[11px] text-muted mb-6">
              LAST UPDATED OCTOBER 19, 2026
            </div>
            

            {TERMS_SECTIONS.map((section, i) => (
              <div key={i} className="mb-8">
                <h2
                  id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  className="font-[family-name:var(--font-display)] text-[22px] font-medium text-ink tracking-[-0.02em] mb-3"
                >
                  {section.title}
                </h2>
                <p className="text-[14px] text-secondary leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h4 className="font-[family-name:var(--font-mono)] text-[11px] text-muted uppercase tracking-wider mb-3">
                On this page
              </h4>
              <nav className="space-y-2">
                {TERMS_SECTIONS.map((section, i) => {
                  const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <a
                      key={i}
                      href={`#${id}`}
                      className={`block text-[12px] transition-colors ${
                        activeHeading === id ? 'text-ink font-medium' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {section.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}

import { useEffect, useState, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { DOCS_SECTIONS, getDocSection, getAdjacentSections } from '../lib/docs';

export function DocsSectionPage() {
  const { section: slug } = useParams<{ section: string }>();
  const section = slug ? getDocSection(slug) : undefined;
  const [search, setSearch] = useState('');
  const [activeHeading, setActiveHeading] = useState('');
  const [copied, setCopied] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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
  }, [slug]);

  if (!section) return <Navigate to="/docs" replace />;

  const { prev, next } = getAdjacentSections(section.slug);

  const filteredSections = search
    ? DOCS_SECTIONS.filter(s =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.subsections.some(sub => sub.title.toLowerCase().includes(search.toLowerCase()))
      )
    : DOCS_SECTIONS;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen grid-bg">
      <SEO title={section.title} description={section.description} />
      <AnnouncementBar />
      <Nav />

      <main className="max-w-[1120px] mx-auto px-6 pt-8 pb-[100px]">
        <div className="grid lg:grid-cols-[220px_1fr_200px] gap-8">
          {/* Left nav */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search docs..."
                className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-[12px] text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink/20 mb-4"
              />
              <nav className="space-y-1">
                {filteredSections.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/docs/${s.slug}`}
                    className={`block px-3 py-2 rounded-lg text-[12px] transition-colors ${
                      s.slug === section.slug ? 'bg-ink/5 text-ink font-medium' : 'text-muted hover:text-ink hover:bg-page'
                    }`}
                  >
                    {s.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div ref={contentRef} className="max-w-[720px]">
            <h1 className="font-[family-name:var(--font-display)] text-[32px] md:text-[40px] font-medium tracking-[-0.03em] text-ink leading-[1.1]">
              {section.title}
            </h1>
            <p className="text-[14px] text-secondary mt-3 mb-8">{section.description}</p>

            {section.subsections.map((sub, i) => (
              <div key={i} className="mb-8">
                <h2
                  id={sub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  className="font-[family-name:var(--font-display)] text-[24px] font-medium text-ink tracking-[-0.02em] mb-3"
                >
                  {sub.title}
                </h2>
                <p className="text-[14px] text-secondary leading-relaxed mb-4">{sub.content}</p>

                {/* Code block */}
                {sub.content.includes('Teak') && (
                  <div className="relative">
                    <pre className="bg-page rounded-lg p-4 overflow-x-auto font-[family-name:var(--font-mono)] text-[12px] text-ink">
                      <code>{`// Example from ${sub.title}\nimport { Teak } from '@teak/sdk';\n\nTeak.initialize("YOUR_APP_ID");`}</code>
                    </pre>
                    <button
                      onClick={() => handleCopy(`Teak.initialize("YOUR_APP_ID");`, sub.title)}
                      className="absolute top-2 right-2 btn-learn text-[10px]"
                    >
                      {copied === sub.title ? '✓' : 'Copy'}
                    </button>
                  </div>
                )}

                {/* Note callout */}
                {i === 0 && (
                  <div className="bg-mint/30 border border-mint rounded-lg p-4 mt-4">
                    <p className="text-[13px] text-ink">
                      <strong>Note:</strong> Make sure you have your App ID ready before starting the integration.
                    </p>
                  </div>
                )}

                
              </div>
            ))}

            {/* Prev/Next */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
              {prev ? (
                <Link to={`/docs/${prev.slug}`} className="text-[13px] text-ink hover:text-secondary transition-colors">
                  ← {prev.title}
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/docs/${next.slug}`} className="text-[13px] text-ink hover:text-secondary transition-colors">
                  {next.title} →
                </Link>
              ) : <div />}
            </div>
          </div>

          {/* Right TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h4 className="font-[family-name:var(--font-mono)] text-[11px] text-muted uppercase tracking-wider mb-3">
                On this page
              </h4>
              <nav className="space-y-2">
                {section.subsections.map((sub, i) => {
                  const id = sub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <a
                      key={i}
                      href={`#${id}`}
                      className={`block text-[12px] transition-colors ${
                        activeHeading === id ? 'text-ink font-medium' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {sub.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

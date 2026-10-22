import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { SEO } from '../components/SEO';
import { DOCS_SECTIONS } from '../lib/docs';

export function DocsPage() {
  return (
    <PageShell
      title="Documentation"
      description="Integration guides, API reference, and SDK documentation."
      tab="Docs"
    >
      <SEO title="Docs" description="Integration guides, API reference, and SDK documentation." />

      <div className="max-w-[1120px] mx-auto px-6 pb-[100px]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOCS_SECTIONS.map((section, i) => (
            <motion.div
              key={section.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link to={`/docs/${section.slug}`} className="card p-6 h-full hover:shadow-md transition-shadow block">
                <h3 className="font-[family-name:var(--font-display)] text-[18px] font-medium text-ink mb-2">
                  {section.title}
                </h3>
                <p className="text-[13px] text-secondary leading-relaxed">{section.description}</p>
                <div className="mt-4 font-[family-name:var(--font-mono)] text-[11px] text-muted">
                  {section.subsections.length} sections
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

import { useEffect, useState, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { PlayArt } from '../components/PlayArt';
import { getBlogPost, getRelatedPosts, generatePostContent, BLOG_POSTS } from '../lib/blog';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      // Scroll spy
      const headings = contentRef.current?.querySelectorAll('h2');
      headings?.forEach((h) => {
        const rect = h.getBoundingClientRect();
        if (rect.top < 200 && rect.bottom > 0) {
          setActiveSection(h.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  const content = generatePostContent(post);
  const related = getRelatedPosts(post.slug);

  // Parse content into sections
  const sections = content.split('\n## ').filter(Boolean).map((s) => {
    const [title, ...rest] = s.split('\n');
    return { title, content: rest.join('\n').trim() };
  });

  const tocItems = sections.map((s) => ({
    id: s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: s.title,
  }));

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen grid-bg overflow-x-hidden">
      <SEO title={post.title} description={post.excerpt} />
      
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-transparent z-50">
        <div className="h-full bg-yellow transition-all" style={{ width: `${progress}%` }} />
      </div>

      <AnnouncementBar />
      <Nav />

      <main className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-[80px] sm:pb-[100px]">
        <div className="grid lg:grid-cols-[1fr_200px] gap-8 lg:gap-12">
          {/* Main content */}
          <div className="w-full max-w-[720px] mx-auto lg:mx-0">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-purple uppercase tracking-wider">
                {post.category}
              </span>
              <h1 className="font-[family-name:var(--font-display)] text-[28px] sm:text-[34px] md:text-[40px] font-medium tracking-[-0.03em] text-ink leading-[1.15] mt-2 break-words">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 font-[family-name:var(--font-mono)] text-[11px] text-muted">
                <span>{post.author}</span>
                <span>·</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime} min read</span>
              </div>
            </motion.div>

            {/* Cover Art */}
            <div className="mt-6 sm:mt-8 rounded-xl overflow-hidden bg-page w-full min-h-[200px] sm:min-h-[260px]">
              <PlayArt seed={post.slug} kind="blocks" palette="warm" width={720} height={300} />
            </div>

            {/* Mobile Table of Contents */}
            {tocItems.length > 0 && (
              <details className="mt-6 p-4 rounded-lg bg-surface border border-border lg:hidden">
                <summary className="font-[family-name:var(--font-mono)] text-[12px] text-muted uppercase tracking-wider cursor-pointer font-medium">
                  On this page ({tocItems.length} sections)
                </summary>
                <nav className="mt-3 space-y-2 pt-2 border-t border-border/50">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-[13px] transition-colors ${
                        activeSection === item.id ? 'text-ink font-medium' : 'text-secondary hover:text-ink'
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </details>
            )}

            {/* Article Content */}
            <div ref={contentRef} className="mt-8 prose-content max-w-full">
              {sections.map((section, i) => (
                <div key={i} className="mb-8">
                  <h2
                    id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                    className="font-[family-name:var(--font-display)] text-[20px] sm:text-[24px] font-medium text-ink tracking-[-0.02em] mb-3 break-words"
                  >
                    {section.title}
                  </h2>
                  {section.content.split('\n\n').map((para, j) => {
                    if (para.startsWith('>')) {
                      return (
                        <blockquote key={j} className="border-l-2 border-yellow pl-4 my-4 font-[family-name:var(--font-display)] text-[16px] sm:text-[18px] text-ink italic break-words">
                          {para.replace(/^>\s*/, '')}
                        </blockquote>
                      );
                    }
                    if (para.startsWith('```')) {
                      const code = para.replace(/```\w*\n?/, '').replace(/```$/, '');
                      return (
                        <pre key={j} className="bg-page rounded-lg p-3 sm:p-4 my-4 overflow-x-auto max-w-full font-[family-name:var(--font-mono)] text-[11px] sm:text-[12px] text-ink">
                          {code}
                        </pre>
                      );
                    }
                    if (para.startsWith('- ') || para.startsWith('1. ')) {
                      const items = para.split('\n').map(line => line.replace(/^[-\d.]\s*/, ''));
                      return (
                        <ul key={j} className="space-y-2 my-4">
                          {items.map((item, k) => (
                            <li key={k} className="flex items-start gap-2 text-[13px] sm:text-[14px] text-secondary">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple mt-2 flex-shrink-0" />
                              <span className="break-words">{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={j} className="text-[13px] sm:text-[14px] text-secondary leading-relaxed my-3 break-words">
                        {para}
                      </p>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 py-6 border-t border-border mt-8">
              <button onClick={handleCopyLink} className="btn-learn text-[13px] px-4 py-2">
                {copied ? '✓ Copied' : 'Copy link'}
              </button>
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="mt-8">
                <h3 className="font-[family-name:var(--font-display)] text-[18px] sm:text-[20px] font-medium text-ink mb-4">
                  Related posts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((r) => (
                    <Link key={r.slug} to={`/blog/${r.slug}`} className="card p-4 hover:shadow-md transition-shadow">
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-purple uppercase tracking-wider">
                        {r.category}
                      </span>
                      <h4 className="text-[15px] sm:text-[16px] font-medium text-ink mt-1 leading-snug">{r.title}</h4>
                      <p className="text-[12px] text-muted mt-1">{r.readTime} min read</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h4 className="font-[family-name:var(--font-mono)] text-[11px] text-muted uppercase tracking-wider mb-3">
                On this page
              </h4>
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-[12px] transition-colors ${
                      activeSection === item.id ? 'text-ink font-medium' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
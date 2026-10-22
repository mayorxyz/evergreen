import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageShell } from '../components/PageShell';
import { SEO } from '../components/SEO';
import { PlayArt } from '../components/PlayArt';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../lib/blog';

export function BlogPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === filter);
  const featured = BLOG_POSTS[0];

  return (
    <PageShell
      title="Retention wisdom, shipped weekly"
      description="Frameworks, tactics, and case studies from the front lines of F2P retention."
      tab="Blog"
      highlight="weekly"
    >
      <SEO title="Blog" description="Retention wisdom, case studies, and F2P insights." />

      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pb-[100px]">
        {/* Featured */}
        <motion.div
          className="card overflow-hidden mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2">
            <div className="bg-page w-full overflow-hidden flex items-center justify-center">
              <div className="w-full h-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px]">
                <PlayArt seed={featured.slug} kind="blocks" palette="warm" width={600} height={300} />
              </div>
            </div>
            <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-center">
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-purple uppercase tracking-wider mb-2">
                {featured.category}
              </span>
              <Link to={`/blog/${featured.slug}`}>
                <h2 className="font-[family-name:var(--font-display)] text-[22px] sm:text-[24px] md:text-[28px] font-medium text-ink tracking-[-0.02em] leading-tight hover:text-secondary transition-colors">
                  {featured.title}
                </h2>
              </Link>
              <p className="text-[14px] text-secondary mt-3 leading-relaxed">{featured.excerpt}</p>
              <div className="flex flex-wrap items-center gap-2 mt-4 font-[family-name:var(--font-mono)] text-[11px] text-muted">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime} min read</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                filter === cat ? 'bg-ink text-page' : 'bg-grey-light text-ink hover:bg-ink/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              className="card overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="bg-page w-full overflow-hidden">
                <div className="w-full h-[160px]">
                  <PlayArt seed={post.slug} kind="confetti" palette="cool" width={400} height={160} />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-purple uppercase tracking-wider">
                    {post.category}
                  </span>
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="font-[family-name:var(--font-display)] text-[18px] font-medium text-ink mt-1 leading-snug hover:text-secondary transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-[13px] text-secondary mt-2 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-2 mt-4 font-[family-name:var(--font-mono)] text-[10px] text-muted">
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.readTime} min</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-yellow rounded-xl p-6 md:p-8 max-w-full sm:max-w-[500px]">
          <h3 className="font-[family-name:var(--font-display)] text-[18px] sm:text-[20px] font-medium text-on-yellow">
            Retention wisdom straight to your inbox
          </h3>
          <p className="text-[13px] text-on-yellow/70 mt-2">Get the latest posts, tips, and more.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full flex-1 px-4 py-2.5 rounded-full bg-surface/80 border border-ink/10 text-[13px] text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ink/20"
            />
            <button type="submit" className="btn-dark text-[13px] px-5 py-2.5 w-full sm:w-auto">Subscribe</button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
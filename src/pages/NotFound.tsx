import { Link } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export function NotFoundPage() {
  return (
    <div className="min-h-screen grid-bg">
      <SEO title="Page not found" description="This page doesn't exist." />
      <Nav />
      <main className="max-w-[1120px] mx-auto px-6 pt-40 pb-32 flex flex-col items-center justify-center text-center">
        <h1
          className="font-[family-name:var(--font-display)] text-[120px] md:text-[200px] font-medium tracking-[-0.03em] text-transparent leading-none"
          style={{ WebkitTextStroke: '2px var(--color-ink)' }}
        >
          404
        </h1>
        <p className="text-[14px] text-secondary mt-4">Page not found</p>
        <Link to="/" className="btn-dark mt-8">
          Go home <span className="arrow">▸</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}

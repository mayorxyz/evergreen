import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { ProductPage } from './pages/Product';
import { PricingPage } from './pages/Pricing';
import { DemoPage } from './pages/Demo';
import { BlogPage } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { AboutPage } from './pages/About';
import { DocsPage } from './pages/Docs';
import { DocsSectionPage } from './pages/DocsSection';
import { ContactPage } from './pages/Contact';
import { PrivacyPage } from './pages/Privacy';
import { TermsPage } from './pages/Terms';
import { NotFoundPage } from './pages/NotFound';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/:section" element={<DocsSectionPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

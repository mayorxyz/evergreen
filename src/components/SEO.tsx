import { useEffect } from 'react';
import { SITE_NAME, SITE_URL } from '../lib/site';

type SEOProps = {
  title: string;
  description: string;
  image?: string;
};

export function SEO({ title, description, image }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = typeof window !== 'undefined' ? window.location.href : SITE_URL;
  const ogImage = image || `${SITE_URL}/og-default.png`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:url', url, true);
    setMeta('og:type', 'website', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [fullTitle, description, ogImage, url]);

  return null;
}

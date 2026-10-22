import { AnnouncementBar } from '../components/AnnouncementBar';
import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { TrustedBy } from '../components/TrustedBy';
import { CrmIntro } from '../components/CrmIntro';
import { BentoGrid } from '../components/BentoGrid';
import { IntegrateSteps } from '../components/IntegrateSteps';
import { GoodTimes } from '../components/GoodTimes';
import { Testimonials } from '../components/Testimonials';
import { FinalCta } from '../components/FinalCta';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen grid-bg">
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <CrmIntro />
        <BentoGrid />
        <IntegrateSteps />
        <GoodTimes />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
